## PRD: Standardize error handling across components

### Overview
- **Problem**: Error handling is inconsistent across the app (console.error, ad-hoc toasts, mixed types), which complicates debugging and creates uneven UX.
- **Goal**: Establish a unified, typed, and reusable error handling framework covering types, UI feedback, logging, and global handling, and refactor key flows to adopt it.
- **Issue**: [Standardize error handling across components](https://github.com/Tree-Byte-org/Tree-Byte-Frontend/issues/62)

### Scope
- In scope:
  - Standard error model and enums (`@/types/error.ts`).
  - Error boundary and fallback UI (`@/components/error-boundary.tsx`, `@/components/error-fallback.tsx`).
  - Central error handler hook (`@/hooks/use-error-handler.ts`).
  - Consistent error toast component (`@/components/ui/error-toast.tsx`).
  - Client-side logger (`@/utils/error-logger.ts`) with optional backend reporting.
  - Global error handler setup in `app/layout.tsx`.
  - Refactors: `@/hooks/auth/use-register-form.ts`, `@/hooks/auth/use-recovery.ts`, `@/hooks/projects/use-projects.ts`.
- Out of scope:
  - Server-side logging backend implementation (provide interface, not infra).
  - Rewrites beyond listed files.

### Non-Goals
- Adding new authentication or recovery features beyond error handling.
- Modifying blockchain logic or on-chain flows.

### Current State (as-is)
- Hooks catch with `any` and set local error strings.
- Components mix `console.error` and basic toasts; no normalization of error shape.
- No error boundary; unhandled render errors crash silently or bubble to console.
- No shared logger; no user/context enrichment or deduplication.

### Acceptance Criteria (must-have)
1) Error types and interfaces
   - Create `@/types/error.ts` with:
     - `ErrorSeverity` enum: `info | warning | error | critical`.
     - `ErrorCategory` enum: `network | validation | auth | stellar | unknown`.
     - `AppError` interface: `{ code, message, category, severity, context?, timestamp }`.
     - Narrow types: `NetworkError`, `ValidationError`, `AuthError` (extends `AppError`).
     - Utilities: `isAppError`, `normalizeError(unknown, context?)`.

2) Error boundary components
   - `@/components/error-boundary.tsx` (class or functional boundary with `react-error-boundary`-like behavior):
     - Catches JS/rendering errors below its tree, logs via logger, and renders fallback.
     - Accepts `onReset` for retry.
   - `@/components/error-fallback.tsx`:
     - Reusable UI displaying message by `ErrorCategory`/`ErrorSeverity` and CTA(s): Retry, Go back, Contact support.

3) Error handling hook
   - `@/hooks/use-error-handler.ts`:
     - `handleError(error: unknown, options?: { context?: Record<string, unknown>; toast?: boolean })`.
     - Normalizes error → `AppError`, logs it, and optionally shows standardized toast.
     - Category detection heuristics (status codes, validation shape, auth codes, Stellar errors).

4) Update existing components with errors
   - `@/hooks/auth/use-register-form.ts`:
     - Replace `catch (err: any)` with `handleError(err, { context: { feature: 'register' }, toast: true })`.
     - Use typed paths for registration failures (e.g., `AUTH/REGISTER_FAILED`).
   - `@/hooks/auth/use-recovery.ts`:
     - Use `handleError` with `feature: 'recovery'`; add friendly recovery messages by category.
   - `@/hooks/projects/use-projects.ts`:
     - Use `handleError` with `feature: 'projects'` and implement simple retry (1-2 retries with backoff) for network failures.

5) Error display and notifications
   - `@/components/ui/error-toast.tsx`:
     - A single exported helper to show toasts (integrates with existing shadcn/sonner setup) with severity-based styling and auto-dismiss.
   - Replace direct toasts with this helper in refactored hooks/components only (wider migration can follow incrementally).

6) Error logging system
   - `@/utils/error-logger.ts`:
     - `logError(error: AppError)` with:
       - Deduplication key (e.g., `code|message|stack|contextSignature`).
       - User context (wallet `address` if available from Zustand, route, UA, timestamp).
       - Optional `POST` to `${process.env.NEXT_PUBLIC_API_URL}/logs/client` if env flag enabled.

7) Global error handler setup
   - `app/layout.tsx`:
     - Wrap application in `ErrorBoundary` with `ErrorFallback`.
     - Add `window.onerror` and `window.onunhandledrejection` handlers to funnel into `handleError`.

### Functional Requirements
- Normalization: Any thrown value (`Error`, `Response`, string, object) is converted to `AppError` with:
  - `code`: string key (e.g., `NETWORK/REQUEST_FAILED`, `VALIDATION/SCHEMA`, `AUTH/REGISTER_FAILED`, `STELLAR/CONNECTION`).
  - `message`: human-friendly.
  - `category` and `severity` mapped by rule.
  - `context`: includes feature, endpoint, payload hints (no secrets), status, stack, etc.
  - `timestamp`: ISO string.
- Toasts: Severity-based color and icon; default auto-dismiss; manual dismiss.
- Boundaries: Provide Reset action to re-render subtree; surfaces dev-friendly detail in dev mode.
- Logger: No PII; omit secrets, passphrases; small payloads; network-safe.

### Non-Functional Requirements
- **DX**: Small, ergonomic API (`handleError` single entrypoint).
- **Type-safety**: No `any` in new error code; enums and discriminated unions where possible.
- **Performance**: Logging is non-blocking; toast rendering lightweight.
- **Security/Privacy**: Never log secrets/keys; scrub context; only send to backend if explicitly enabled.
- **Accessibility**: Toasts announced via ARIA live regions; fallback UI keyboard-friendly.

### Design

1) Error model (types)
```ts
// @/types/error.ts
export enum ErrorSeverity { info = 'info', warning = 'warning', error = 'error', critical = 'critical' }
export enum ErrorCategory { network = 'network', validation = 'validation', auth = 'auth', stellar = 'stellar', unknown = 'unknown' }

export interface AppError {
  code: string;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  timestamp: string; // ISO
}

export type NetworkError = AppError & { category: ErrorCategory.network; status?: number };
export type ValidationError = AppError & { category: ErrorCategory.validation; fieldErrors?: Record<string, string> };
export type AuthError = AppError & { category: ErrorCategory.auth };

export function isAppError(value: unknown): value is AppError { /* impl */ }
export function normalizeError(value: unknown, context?: Record<string, unknown>): AppError { /* impl */ }
```

2) Hook API
```ts
// @/hooks/use-error-handler.ts
export function useErrorHandler() {
  const handleError = (error: unknown, options?: { context?: Record<string, unknown>; toast?: boolean }) => {
    const appError = normalizeError(error, options?.context);
    logError(appError);
    if (options?.toast !== false) showErrorToast(appError);
    return appError;
  };
  return { handleError };
}
```

3) Error boundary and fallback
```tsx
// @/components/error-boundary.tsx
// Renders <ErrorFallback /> on error and exposes reset

// @/components/error-fallback.tsx
// Displays message by severity/category and CTA(s)
```

4) Error toast
```ts
// @/components/ui/error-toast.tsx
export function showErrorToast(error: AppError) { /* maps severity → style; uses shadcn/sonner */ }
```

5) Logger
```ts
// @/utils/error-logger.ts
export function logError(error: AppError) { /* attach context, dedupe, optionally POST */ }
```

### Migration Plan
1) Foundation (types, hook, toast, logger, boundary + fallback).
2) Wire boundary in `app/layout.tsx`; add global handlers.
3) Refactor hooks:
   - `@/hooks/auth/use-register-form.ts`: use `handleError` and typed codes.
   - `@/hooks/auth/use-recovery.ts`: use `handleError`; better messages.
   - `@/hooks/projects/use-projects.ts`: use `handleError`; add 1-2 retries with backoff.
4) Replace toasts in these areas with `showErrorToast`.
5) Document patterns in this PRD and leave TODO markers for broader adoption.

### Testing Strategy
- Unit tests (where possible) for `normalizeError`, logger deduplication, and toast mapping.
- Manual QA scenarios:
  - Network 500/404 on projects fetch → categorized as `network/error` with retry and toast.
  - Validation failures on register → `validation/error` with field messages.
  - Auth failures → `auth/error`.
  - Unhandled render error → boundary fallback shows Retry and logs.
  - Stellar SDK thrown errors → `stellar/error` categorized properly.

### Telemetry/Observability
- Console-safe logging in dev; optional remote reporting when `NEXT_PUBLIC_CLIENT_ERROR_REPORTING=true` and `NEXT_PUBLIC_API_URL` present.
- Include route, wallet address (from Zustand `address`), and browser info as context when available.

### Risks & Mitigations
- Over-notifying users with toasts → severity-aware rules and rate-limiting.
- Sensitive data leak → strict context scrubber; never include secrets or passphrases.
- Type friction → provide helpers and examples; keep hook API minimal.

### Accessibility
- Toasts use ARIA live regions; fallback uses proper headings and focus management.

### Performance
- Logger work done off main render path; network reporting is fire-and-forget.

### File and Naming Conventions
- Use kebab-case for files/folders.
- Use alias imports `@/` only; avoid relative deep paths.
- Place files exactly at:
  - `@/types/error.ts`
  - `@/components/error-boundary.tsx`
  - `@/components/error-fallback.tsx`
  - `@/components/ui/error-toast.tsx`
  - `@/hooks/use-error-handler.ts`
  - `@/utils/error-logger.ts`

### Timeline & Milestones
- M1 (Day 1-2): Types, hook, toast, logger.
- M2 (Day 3): Boundary + fallback + layout wiring + global handlers.
- M3 (Day 4): Refactor target hooks and verify with backend.
- M4 (Day 5): QA, polish, docs, and roll-up PR.

### Success Metrics
- 100% of targeted hooks/components use `useErrorHandler`.
- Zero `any` in error handling paths introduced by this work.
- Error toasts are uniform across refactored flows.
- Global boundary catches and reports unhandled errors.

### Rollout
- Single PR gated behind manual QA; feature-flag remote reporting.

### References
- Issue: [Standardize error handling across components](https://github.com/Tree-Byte-org/Tree-Byte-Frontend/issues/62)


