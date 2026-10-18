# PLAN.md

## Section Map (from SPEC.md)

Ordered list of sections to build. Base layout first, then components, then supporting layers.

| # | Section | Purpose | Files to Touch | Acceptance Criteria (Visual) | Edge Cases | Security Notes |
|---|---------|---------|----------------|------------------------------|------------|----------------|
| 1 | **Scaffold & Tooling** | Vite+React+TS, ESLint, Prettier, @/ alias, .gitignore, .env.example, import rule | package.json, vite.config.ts, tsconfig.json, .eslintrc.cjs, .prettierrc, .gitignore, .env.example, src/main.tsx, src/app.tsx, src/vite-env.d.ts | `npm run dev` works, `npm run lint` passes, `npm run build` passes, forbidden import fails lint | Empty project, no src folders yet | No secrets in config; .env in gitignore |
| 2 | **Layout Components** | Navbar, Footer, base layout wrapper | src/components/layout/Navbar.tsx, src/components/layout/Footer.tsx, src/components/layout/index.ts | Navbar renders with links, Footer renders, responsive at 360/768/1280 | Long nav text, mobile menu (placeholder), RTL not needed | External links need rel="noopener noreferrer" |
| 3 | **UI Components** | Reusable primitives: Button, Input | src/components/ui/Button.tsx, src/components/ui/Input.tsx, src/components/ui/index.ts | Button variants render, Input with label/error states, focus visible | Disabled states, long text, error messages | No dangerouslySetInnerHTML, sanitize props |
| 4 | **Providers** | App-level context providers | src/components/providers/AppProvider.tsx, src/components/providers/ThemeProvider.tsx (optional), src/components/providers/index.ts | Provider wraps app, context accessible | Nested providers, missing context | No secrets in context |
| 5 | **Skeleton Components** | Loading placeholders | src/components/skeleton/LoadingSkeleton.tsx, src/components/skeleton/index.ts | Skeleton animation shows, matches content shape | Long content, multiple lines | None |
| 6 | **Common Components** | Shared utility components | src/components/common/EmptyState.tsx, src/components/common/index.ts | EmptyState renders with icon/text/action | Long text, no action provided | Sanitize user content in props |
| 7 | **Hooks** | Custom hooks | src/hooks/useDebounce.ts, src/hooks/index.ts | useDebounce delays callback, cleanup on unmount | Rapid calls, zero delay, cleanup | None |
| 8 | **API Layer** | HTTP client + endpoint examples | src/api/axios.ts, src/api/users.api.ts, src/api/index.ts | Axios instance with baseURL, interceptors, users.api exports functions | Network error, timeout, 401/403/500 | BaseURL from env, no secrets in code, strip CR/LF |
| 9 | **Types** | TypeScript definitions | src/types/user.types.ts, src/types/api.types.ts, src/types/index.ts | Types compile, exported correctly | Circular refs, unknown fields | None |
| 10 | **Store** | State management (Zustand/Context) | src/store/auth.store.ts, src/store/index.ts | Store exports state/actions, persists if needed | Hydration, SSR (not used) | No secrets in store |
| 11 | **Pages** | Page components + routing | src/pages/Home.tsx, src/pages/About.tsx, src/pages/index.ts, src/app.tsx (add routes) | Home renders hero+sections, About renders content, routing works | 404 page, direct URL access | Sanitize any user content |
| 12 | **Constants** | App constants | src/constants/routes.ts, src/constants/app.ts, src/constants/index.ts | Routes map matches pages, constants typed | Missing route keys | None |
| 13 | **i18n** | Internationalization setup | src/i18n/config.ts, src/i18n/en.json, src/i18n/index.ts | Config loads locale, t() function works | Missing keys, fallback locale | None |
| 14 | **Assets** | Static assets organization | src/assets/images/, src/assets/icons/, src/assets/fonts/, placeholder files | Folders exist, placeholder SVG in icons | Missing files, large files | No executable files |
| 15 | **Schemas** | Validation schemas (Zod) | src/schemas/user.schema.ts, src/schemas/index.ts | Schema validates, infers types | Invalid data, optional fields | Strip control chars |
| 16 | **Utils** | Utility functions | src/utils/formatDate.ts, src/utils/cn.ts (clsx), src/utils/index.ts | formatDate works for locales, cn merges classes | Invalid dates, empty inputs | Sanitize output |

---

## Status Table

| # | Section | Status | Lint+Build | Manual Check | Regression | Commit |
|---|---------|--------|------------|--------------|------------|--------|
| 1 | Scaffold & Tooling | todo | | | | |
| 2 | Layout Components | todo | | | | |
| 3 | UI Components | todo | | | | |
| 4 | Providers | todo | | | | |
| 5 | Skeleton Components | todo | | | | |
| 6 | Common Components | todo | | | | |
| 7 | Hooks | todo | | | | |
| 8 | API Layer | todo | | | | |
| 9 | Types | todo | | | | |
| 10 | Store | todo | | | | |
| 11 | Pages | todo | | | | |
| 12 | Constants | todo | | | | |
| 13 | i18n | todo | | | | |
| 14 | Assets | todo | | | | |
| 15 | Schemas | todo | | | | |
| 16 | Utils | todo | | | | |

---

## Notes
- **MVP Scope**: Sections 1-11 are "must" (structure + examples). Sections 12-16 are supporting but required by assignment.
- **Import Direction Rule**: `shared (components/ui, hooks, api, types, store, constants, i18n, assets, schemas, utils) -> features (pages, components/layout, components/providers, components/skeleton, components/common) -> app`
- **No feature-to-feature imports**: e.g., `components/ui` cannot import from `components/layout`
- **Each section**: One commit, lint+build must pass, manual check at 360/768/1280px