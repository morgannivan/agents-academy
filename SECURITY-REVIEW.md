# Security Review — agents.academy

**Date:** 2026-04-01
**Reviewer:** Oz (automated security audit)
**Scope:** Full codebase audit — API routes, auth config, client components, dependencies, headers, secrets, data handling

---

## Overall Security Posture

**Rating: MODERATE**

The application is an early-stage Next.js 16 project with a small attack surface. There are no custom data-mutating API routes beyond the NextAuth handler, no database, and no user-generated content rendering via `dangerouslySetInnerHTML`. The primary concerns are missing defense-in-depth headers and incomplete auth configuration hardening. No hardcoded secrets or known dependency vulnerabilities were found.

---

## Findings

### HIGH

#### H-1: Missing Security Headers
**Location:** `next.config.ts`
**Description:** The application does not set any HTTP security headers. Missing headers include:
- `Content-Security-Policy` (CSP)
- `X-Frame-Options` (clickjacking protection)
- `X-Content-Type-Options` (MIME sniffing prevention)
- `Referrer-Policy`
- `Permissions-Policy`
- `Strict-Transport-Security` (HSTS)

Without these headers, the application is more susceptible to clickjacking, XSS via MIME sniffing, and information leakage through referrer headers.

**Remediation:** Added comprehensive security headers to `next.config.ts`. ✅ FIXED

#### H-2: Missing `images.remotePatterns` Configuration
**Location:** `next.config.ts`, `src/components/auth/SignInButton.tsx`
**Description:** The `SignInButton` component renders OAuth provider avatars using `next/image` with `session.user.image` as the `src`. Without explicit `remotePatterns` in `next.config.ts`, this will either fail at runtime or — if wildcards are used as a workaround — could allow loading images from arbitrary domains, enabling potential SSRF or content injection.

**Remediation:** Added scoped `remotePatterns` for GitHub (`avatars.githubusercontent.com`) and Google (`lh3.googleusercontent.com`) avatar domains. ✅ FIXED

---

### MEDIUM

#### M-1: No Auth Middleware for Protected Routes
**Location:** Project root (no `middleware.ts` exists)
**Description:** Routes like `/profile` and `/build` do not enforce server-side authentication. Currently these pages display static/mock data, but as real user data is introduced, unauthenticated access will become a vulnerability.

**Remediation:** Create a `src/middleware.ts` file that uses NextAuth's `auth` export to protect routes requiring authentication. Example matcher: `/profile`, `/build`.

#### M-2: NextAuth Session Configuration Not Hardened
**Location:** `src/lib/auth.ts`
**Description:** The NextAuth configuration does not explicitly set `session.strategy`, `session.maxAge`, or `session.updateAge`. While defaults (`jwt` strategy, 30-day maxAge) are reasonable, explicit values are preferred for production deployments to ensure intent is clear and auditable.

**Remediation:** Add explicit session configuration:
```
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60,   // 24 hours
}
```

#### M-3: Beta Dependency — `next-auth@5.0.0-beta.30`
**Location:** `package.json`
**Description:** NextAuth v5 is still in beta. Beta packages may contain undiscovered security issues and are not recommended for production without careful evaluation. API surface may change between beta releases.

**Remediation:** Monitor the NextAuth v5 release timeline. Pin the exact version (already done) and review changelogs before upgrading. Consider whether the stable v4 branch is preferable for production until v5 reaches GA.

#### M-4: No Rate Limiting on Auth Endpoints
**Location:** `src/app/api/auth/[...nextauth]/route.ts`
**Description:** The NextAuth API route has no rate limiting. An attacker could brute-force authentication flows or trigger excessive OAuth redirects. While OAuth providers have their own rate limits, the application should also enforce limits to prevent abuse.

**Remediation:** Implement rate limiting via middleware, edge functions, or an upstream reverse proxy / WAF. Consider packages like `next-rate-limit` or platform-level solutions (Vercel WAF, Cloudflare).

#### M-5: Missing Explicit Redirect Callback Validation
**Location:** `src/lib/auth.ts`
**Description:** The NextAuth configuration does not define a `redirect` callback. NextAuth v5 defaults to allowing only same-origin redirects, which is safe, but an explicit callback is preferable for defense-in-depth and to prevent regressions if the default behavior changes.

**Remediation:** Add a `callbacks.redirect` that explicitly validates the `url` against `baseUrl`:
```
callbacks: {
  redirect({ url, baseUrl }) {
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
}
```

---

### LOW

#### L-1: No `robots.txt` or `security.txt`
**Location:** `public/` (absent)
**Description:** The application does not serve a `robots.txt` (to guide crawlers away from auth/API routes) or a `security.txt` (RFC 9116) to provide vulnerability disclosure contact info.

**Remediation:** Add `public/robots.txt` disallowing `/api/` and auth paths. Add `public/.well-known/security.txt` with a contact email and disclosure policy.

#### L-2: No CORS Configuration
**Location:** `next.config.ts`
**Description:** No explicit CORS headers are configured. This is currently acceptable because the only API route is the NextAuth handler (which manages its own CORS). If custom API routes are added in the future, explicit CORS policies should be defined.

**Remediation:** When adding custom API routes, configure CORS headers either in `next.config.ts` or per-route using `NextResponse` headers.

#### L-3: Client-Side Template Matching in Build Page
**Location:** `src/app/build/page.tsx` (lines 50-55)
**Description:** The build page matches user input against templates using a simple `toLowerCase().includes()` check. This is client-side only and currently has no security impact (no server actions, no data mutation). However, if this logic is ever moved server-side, it should be validated and sanitized.

**Remediation:** No action needed currently. When adding server-side agent building, ensure all user input is validated and sanitized before processing.

---

## Summary

| Severity | Count | Fixed |
|----------|-------|-------|
| CRITICAL | 0     | —     |
| HIGH     | 2     | 2     |
| MEDIUM   | 5     | 0     |
| LOW      | 3     | 0     |

**Key positives:**
- No hardcoded secrets or credentials found
- `.env.example` contains only placeholder values
- No `dangerouslySetInnerHTML` or raw HTML injection vectors
- No database or server-side data mutation (minimal attack surface)
- `pnpm audit` reports zero known vulnerabilities
- NextAuth CSRF protection is active by default
- OAuth secrets are properly sourced from environment variables
