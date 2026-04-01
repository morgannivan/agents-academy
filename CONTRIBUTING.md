# Contributing to agents.academy

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** 22+
- **pnpm** 9+
- **Git**

### Getting Started

```bash
# Clone the repo
git clone https://github.com/morgannivan/agents-academy.git
cd agents-academy

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
pnpm dev
```

Open <http://localhost:3000> to view the app.

### Useful Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |
| `pnpm test` | Run tests via Vitest |

## Project Structure

```
agents-academy/
├── .github/workflows/  # CI pipeline
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   │   ├── api/        # API route handlers
│   │   ├── build/      # Agent builder pages
│   │   ├── certify/    # Certification portal
│   │   ├── courses/    # Training curriculum
│   │   ├── marketplace/# Marketplace pages
│   │   ├── pricing/    # Pricing page
│   │   ├── profile/    # User/agent profiles
│   │   └── train/      # Training studio
│   ├── components/     # React components
│   │   ├── agents/     # Agent card & stats components
│   │   ├── auth/       # Auth provider & sign-in
│   │   ├── build/      # Builder UI (MCP picker, model selector)
│   │   ├── certification/ # Cert badges & timelines
│   │   ├── chat/       # Chat input & messages
│   │   ├── deploy/     # Deploy channel picker & status
│   │   ├── training/   # Score gauges & dashboards
│   │   └── ui/         # Shared UI primitives
│   └── lib/            # Core logic & types
│       ├── agents/     # Agent types & mock data
│       ├── certification/ # Cert types & mocks
│       ├── db/         # Database schema & seed data
│       ├── deploy/     # Deployment logic & channel configs
│       ├── import/     # Agent import adapters
│       ├── marketplace/# Marketplace types & mocks
│       ├── mcp/        # MCP client & registry
│       ├── models/     # LLM provider config & tiers
│       └── training/   # Training types & mocks
├── vercel.json         # Vercel deployment config
├── package.json
└── tsconfig.json
```

## Branch Naming

Use the following prefixes:

- `feat/` — New features (e.g. `feat/agent-builder`)
- `fix/` — Bug fixes (e.g. `fix/cert-score-rounding`)
- `docs/` — Documentation changes (e.g. `docs/api-reference`)

## Pull Request Process

1. Create a branch from `main` using the naming convention above.
2. Make your changes in small, focused commits.
3. Ensure CI passes (`lint`, `typecheck`, `test`, `build`).
4. Open a Pull Request against `main`.
5. Fill in the PR template — describe **what** changed and **why**.
6. Request a review from at least one maintainer.
7. Squash-merge once approved.

## Code Style

- **TypeScript** — Strict mode enabled. No `any` unless truly unavoidable.
- **Tailwind CSS** — Utility-first; avoid custom CSS where possible.
- **Dark theme** — The app uses a dark theme by default. Always test both light and dark if adding UI changes.
- **Imports** — Use the `@/` path alias (e.g. `import { Agent } from "@/lib/db/schema"`).
- **Formatting** — The project uses ESLint for linting. Run `pnpm lint` before pushing.

## Reporting Issues

Open an issue at <https://github.com/morgannivan/agents-academy/issues> with:

- A clear title and description
- Steps to reproduce (if it's a bug)
- Expected vs. actual behavior
- Screenshots or logs if applicable
