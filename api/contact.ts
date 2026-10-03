/**
 * POST /api/contact — server-side proxy for the contact form.
 *
 * The N8n webhook URL lives ONLY here (process.env, never a `VITE_` variable),
 * so it is never inlined into the client bundle. This handler is the trust
 * boundary: it re-validates every field, bounds the body, rate-limits per IP,
 * checks the Origin, and returns generic errors so nothing about the upstream
 * leaks to the caller.
 *
 * Deploy: any serverless host (Vercel, Netlify Functions, Cloudflare Workers
 * with nodejs_compat). A static-only host (GitHub Pages, plain S3) cannot run
 * this — see README notes.
 */

const WEBHOOK_URL = readEnv('N8N_WEBHOOK_URL') ?? ''
/** Optional shared secret; set the same value on the N8n Webhook node's header auth. */
const WEBHOOK_SECRET = readEnv('N8N_WEBHOOK_SECRET') ?? ''
const ALLOWED_ORIGINS = (readEnv('ALLOWED_ORIGINS') ?? '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const TIMEOUT_MS = 8_000
const MAX_BODY_BYTES = 16 * 1024

/** Mirrors src/utils/n8n-integration.ts. The server is authoritative. */
const LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5_000,
} as const

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/

/**
 * Reads env without depending on @types/node, and stays compatible with hosts
 * that do not expose a global `process`.
 */
function readEnv(key: string): string | undefined {
  const scope = globalThis as {
    process?: { env?: Record<string, string | undefined> }
  }
  return scope.process?.env?.[key]
}

interface ContactPayload {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  website?: unknown
}

/** Minimal structural types so this compiles without framework typings. */
interface ApiRequest {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}

interface ApiResponse {
  status: (code: number) => ApiResponse
  setHeader: (name: string, value: string) => void
  json: (payload: unknown) => void
}

const header = (req: ApiRequest, name: string): string => {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()]
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

/**
 * In-memory rate limiter. Correct per warm serverless instance only — swap for
 * a shared store (Redis / Upstash / KV) if you run more than one instance.
 */
const hits = new Map<string, { count: number; resetAt: number }>()

/** Without a hard cap, rotating source IPs (trivial over IPv6) grow this forever. */
const MAX_TRACKED_CLIENTS = 10_000

let lastSweep = 0

const sweep = (now: number): void => {
  if (now - lastSweep < RATE_LIMIT_WINDOW_MS) return
  lastSweep = now

  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key)
  }

  if (hits.size > MAX_TRACKED_CLIENTS) {
    const overflow = hits.size - MAX_TRACKED_CLIENTS
    let removed = 0
    for (const key of hits.keys()) {
      hits.delete(key)
      if (++removed >= overflow) break
    }
  }
}

/**
 * Identify the caller.
 *
 * `x-forwarded-for` is client-supplied and therefore fully attacker
 * controlled. Only the RIGHT-most entry is trustworthy: every proxy appends the
 * address it observed, so your own edge writes the last value. Reading the
 * left-most entry (the naive default) lets an attacker forge an arbitrary IP
 * per request and walk straight through the rate limit.
 */
const clientKey = (req: ApiRequest): string => {
  const forwarded = header(req, 'x-forwarded-for')
  const chain = forwarded.split(',').map((value) => value.trim()).filter(Boolean)
  const candidate = chain.length > 0 ? chain[chain.length - 1] : ''
  return candidate || header(req, 'x-real-ip') || 'unknown'
}

const isRateLimited = (key: string): boolean => {
  const now = Date.now()
  sweep(now)

  const entry = hits.get(key)

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

const readBody = (body: unknown): ContactPayload => {
  if (typeof body === 'string') {
    return JSON.parse(body) as ContactPayload
  }
  return (body ?? {}) as ContactPayload
}

const str = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

/** JSON.parse throws on malformed input; an attacker sends that on purpose. */
const parseBody = (body: unknown): ContactPayload | null => {
  try {
    return readBody(body)
  } catch {
    return null
  }
}

const validate = (data: ContactPayload) => {
  const name = str(data.name, LIMITS.name)
  const email = str(data.email, LIMITS.email).toLowerCase()
  const subject = str(data.subject, LIMITS.subject)
  const message = str(data.message, LIMITS.message)

  if (name.length < 2 || !EMAIL_PATTERN.test(email)) return null
  if (subject.length < 3 || message.length < 10) return null

  return { name, email, subject, message }
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, code: 'method' })
    return
  }

  // Weak CSRF gate: a browser form post from another origin sends no matching
  // Origin header, and JSON content-types cannot be produced by a cross-origin
  // <form> without a CORS preflight.
  if (ALLOWED_ORIGINS.length > 0) {
    const origin = header(req, 'origin')
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      res.status(403).json({ ok: false, code: 'forbidden' })
      return
    }
  }

  if (isRateLimited(clientKey(req))) {
    res.setHeader('Retry-After', String(RATE_LIMIT_WINDOW_MS / 1000))
    res.status(429).json({ ok: false, code: 'rate_limited' })
    return
  }

  const declaredLength = Number(header(req, 'content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, code: 'too_large' })
    return
  }

  const payload = parseBody(req.body)
  if (!payload) {
    res.status(400).json({ ok: false, code: 'invalid' })
    return
  }

  // Chunked requests carry no content-length, so re-check the parsed size.
  if (typeof req.body === 'string' && req.body.length > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, code: 'too_large' })
    return
  }

  // Honeypot: accept silently, forward nothing.
  if (typeof payload.website === 'string' && payload.website.length > 0) {
    res.status(200).json({ ok: true })
    return
  }

  const message = validate(payload)
  if (!message) {
    res.status(400).json({ ok: false, code: 'invalid' })
    return
  }

  if (!WEBHOOK_URL) {
    res.status(503).json({ ok: false, code: 'unavailable' })
    return
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(WEBHOOK_SECRET ? { 'x-webhook-secret': WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ ...message, timestamp: new Date().toISOString() }),
      signal: controller.signal,
    })

    if (!upstream.ok) {
      // Log server-side only; never return upstream text to the client.
      console.error(`[contact] upstream rejected submission: ${upstream.status}`)
      res.status(502).json({ ok: false, code: 'upstream' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('[contact] upstream unreachable', error)
    res.status(502).json({ ok: false, code: 'upstream' })
  } finally {
    clearTimeout(timeoutId)
  }
}