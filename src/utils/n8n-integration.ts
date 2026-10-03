import type { ContactFormData } from '@/types'

/**
 * Contact form transport.
 *
 * SECURITY — why there is no N8n URL here anymore:
 * the previous implementation read `import.meta.env.VITE_N8N_WEBHOOK_URL`.
 * Vite inlines every `VITE_*` value into the client bundle at build time, so the
 * webhook URL shipped to every visitor and could be read from DevTools. That
 * turned the N8n workflow into a public, unauthenticated, unrate-limited
 * endpoint that anyone could POST to from anywhere (spam relay, quota burn).
 *
 * Requests now go to our own first-party endpoint, which keeps the webhook URL
 * in a server-side env var, rate-limits callers, and re-validates every field.
 *
 * This client still validates defensively (defense in depth), but the server is
 * the actual trust boundary — never rely on these checks alone.
 */

const CONTACT_ENDPOINT = '/api/contact'
const TIMEOUT_MS = 10_000
const MAX_RETRIES = 2

/** Mirrors api/contact.ts. Duplicated on purpose: both sides must enforce it. */
const LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5_000,
} as const

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/

export interface ContactPayload extends ContactFormData {
  /** Honeypot. Must stay empty — bots fill every field they can find. */
  website: string
}

export type SendErrorCode = 'invalid' | 'rate_limited' | 'network' | 'server'

export interface SendResult {
  success: boolean
  /** Branch on this. Never surface raw upstream text in the UI. */
  code?: SendErrorCode
}

const isValid = (data: ContactPayload): boolean => {
  const { name, email, subject, message } = data

  return (
    name.trim().length >= 2 &&
    name.length <= LIMITS.name &&
    email.length <= LIMITS.email &&
    EMAIL_PATTERN.test(email) &&
    subject.trim().length >= 3 &&
    subject.length <= LIMITS.subject &&
    message.trim().length >= 10 &&
    message.length <= LIMITS.message
  )
}

/**
 * Only transient failures are worth retrying. Retrying a 4xx re-sends a request
 * that is already known to be rejected — it multiplied spam threefold and
 * burned N8n executions for nothing.
 */
const isRetryableStatus = (status: number): boolean =>
  status === 408 || status === 429 || status >= 500

const postOnce = async (payload: ContactPayload): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    return await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } finally {
    // Previous version leaked the timer on every non-ok response.
    clearTimeout(timeoutId)
  }
}

export const sendToN8n = async (data: ContactPayload): Promise<SendResult> => {
  if (!isValid(data)) {
    return { success: false, code: 'invalid' }
  }

  // Honeypot filled — report success so the bot does not learn it was filtered.
  // Nothing is forwarded.
  if (data.website) {
    return { success: true }
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await postOnce(data)

      if (response.ok) return { success: true }

      if (!isRetryableStatus(response.status)) {
        return {
          success: false,
          code: response.status === 429 ? 'rate_limited' : 'invalid',
        }
      }
    } catch {
      // Network error or timeout — fall through to the backoff.
    }

    if (attempt === MAX_RETRIES) break

    // Exponential backoff with jitter.
    const delay = 500 * 2 ** attempt + Math.random() * 250
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  return { success: false, code: 'server' }
}