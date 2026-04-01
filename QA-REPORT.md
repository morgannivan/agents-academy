# QA Report — agents.academy

**Date:** 2026-04-01
**Branch:** `feat/qa-tests`
**Commit base:** `main`

---

## Build Status

| Check | Command | Result |
|-------|---------|--------|
| Build | `pnpm build` | ✅ Pass |
| Lint | `pnpm lint` | ✅ Pass |
| Type Check | `npx tsc --noEmit` | ✅ Pass |

**Build output:** Next.js 16.2.2 (Turbopack) — compiled successfully, 11 routes generated.

---

## Pages Found (8)

All pages export a valid default React component.

| Route | File | Default Export |
|-------|------|---------------|
| `/` | `src/app/page.tsx` | `Home` ✅ |
| `/auth/signin` | `src/app/auth/signin/page.tsx` | `SignInPage` ✅ |
| `/build` | `src/app/build/page.tsx` | `BuildPage` ✅ |
| `/certify` | `src/app/certify/page.tsx` | `CertifyPage` ✅ |
| `/courses` | `src/app/courses/page.tsx` | `CoursesPage` ✅ |
| `/marketplace` | `src/app/marketplace/page.tsx` | `MarketplacePage` ✅ |
| `/profile` | `src/app/profile/page.tsx` | `ProfilePage` ✅ |
| `/train` | `src/app/train/page.tsx` | `TrainPage` ✅ |

---

## Components Found (8)

| Component | File | Type |
|-----------|------|------|
| `AuthProvider` | `src/components/auth/AuthProvider.tsx` | Client ("use client") |
| `SignInButton` | `src/components/auth/SignInButton.tsx` | Client ("use client") |
| `ChatInput` | `src/components/chat/ChatInput.tsx` | Client ("use client") |
| `ChatMessage` | `src/components/chat/ChatMessage.tsx` | Client ("use client") |
| `HeroInput` | `src/components/hero-input.tsx` | Client ("use client") |
| `AgentCard` | `src/components/ui/AgentCard.tsx` | Server |
| `Badge` | `src/components/ui/Badge.tsx` | Server |
| `DomainBadge` | `src/components/ui/DomainBadge.tsx` | Server |

---

## Library Modules

| Module | File | Exports |
|--------|------|---------|
| Auth | `src/lib/auth.ts` | `handlers`, `auth`, `signIn`, `signOut` |
| Templates | `src/lib/templates.ts` | `AgentTemplate` (type), `templates` (array of 10) |

---

## API Routes

| Route | File |
|-------|------|
| `/api/auth/[...nextauth]` | `src/app/api/auth/[...nextauth]/route.ts` — exports `GET`, `POST` |

---

## Import Resolution

All imports resolve correctly. No missing modules or broken imports detected.

---

## Issues Discovered

**None.** The codebase is clean:
- Zero build errors
- Zero lint warnings/errors
- Zero TypeScript type errors
- All page default exports are valid
- All imports resolve

---

## Test Results

**Framework:** Vitest 4.1.2
**Command:** `pnpm test`

| Test File | Tests | Status |
|-----------|-------|--------|
| `src/__tests__/smoke.test.ts` | 8 | ✅ All pass |
| `src/__tests__/templates.test.ts` | 13 | ✅ All pass |
| `src/__tests__/models.test.ts` | 1 | ✅ Pass (file does not exist — documented) |

**Total: 22 tests passed, 0 failed.**

### Smoke Tests (8)
- Each of the 8 page modules imports without error
- Each exports a `default` function (React component)

### Templates Tests (13)
- `templates` exports an array of exactly 10 items
- Each template has required fields: `id`, `name`, `emoji`, `description`, `domain`, `defaultConfig`
- All template IDs are unique
- Each `defaultConfig` contains `systemPrompt`, `tools`, `channel`, `standards`
- 10 individual field-validation tests (one per template)

### Models Tests (1)
- `src/lib/models/tiers.ts` does not exist — confirmed and documented
- `getAvailableModels` / `isModelAllowed` tests not applicable

---

## Notes

- `src/lib/models/tiers.ts` was not found. If this module is added in the future, the models test file (`src/__tests__/models.test.ts`) should be updated to test `getAvailableModels` and `isModelAllowed`.
- Vitest was added as a dev dependency with a `vitest.config.ts` at the project root.
- A `test` script (`vitest run`) was added to `package.json`.
