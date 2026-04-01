# Technical Architecture — agents.academy

> System architecture, service inventory, tech stack, data flows, and infrastructure design for the agents.academy platform and AATS backend.

---

## 1. System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     agents.academy (Frontend)                       │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Build    │  │  Train   │  │ Certify  │  │ Market   │           │
│  │  Studio   │  │  Arena   │  │  Portal  │  │  place   │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │              │              │              │                 │
│  ┌────┴──────────────┴──────────────┴──────────────┴─────┐         │
│  │              Next.js App Router (API Routes)           │         │
│  └────────────────────────┬──────────────────────────────┘         │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   AATS (Agent Academy Training System)               │
│                                                                     │
│  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Agent  │  │Training │  │  Cert    │  │ Deploy   │  │ Market │ │
│  │ Mgmt   │  │ Engine  │  │ Pipeline │  │ Channels │  │ Engine │ │
│  └────────┘  └─────────┘  └──────────┘  └──────────┘  └────────┘ │
│  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Import │  │Standards│  │Provenance│  │  MCP     │  │  Auth  │ │
│  │Pipeline│  │ Library │  │  Chain   │  │ Registry │  │Service │ │
│  └────────┘  └─────────┘  └──────────┘  └──────────┘  └────────┘ │
│  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ Model  │  │  Skill  │  │ Analytics│  │ Webhook  │  │ Search │ │
│  │ Tiers  │  │ Library │  │ Engine   │  │ Service  │  │  Index │ │
│  └────────┘  └─────────┘  └──────────┘  └──────────┘  └────────┘ │
│  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ User   │  │ Billing │  │ Notif    │  │  A2A     │  │ Audit  │ │
│  │ Mgmt   │  │ Service │  │ Service  │  │ Gateway  │  │  Log   │ │
│  └────────┘  └─────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Layer                                    │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │PostgreSQL│  │   Redis    │  │    S3    │  │  Vector Store    │  │
│  │(Primary) │  │  (Cache)   │  │(Artifacts│  │  (Embeddings)    │  │
│  └──────────┘  └───────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

The system is a **two-tier architecture**:
- **agents.academy Frontend** — Next.js application providing the user-facing UI and API routes
- **AATS Backend** — Agent Academy Training System providing core business logic, training orchestration, and certification pipelines

---

## 2. Service Inventory — 20 AATS Services

### Core Agent Services

| # | Service | Purpose | Current Implementation |
|---|---------|---------|----------------------|
| 1 | **Agent Management** | CRUD operations on agent definitions, metadata, and specifications | `src/app/api/agents/` routes, `src/lib/agents/types.ts` |
| 2 | **Import Pipeline** | Ingest agents from external frameworks (CrewAI, LangChain, OpenClaw) | `src/lib/import/` (crewai.ts, langchain.ts, openclaw.ts) |
| 3 | **Skill Library** | Manage composable agent skills, versioning, and dependencies | `src/lib/templates.ts`, skill type definitions |
| 4 | **Model Tier Gating** | Control model access by subscription tier (Free/Pro/Enterprise) | `src/lib/models/tiers.ts`, `src/lib/models/providers.ts` |

### Training & Certification Services

| # | Service | Purpose | Current Implementation |
|---|---------|---------|----------------------|
| 5 | **Training Engine** | Execute training curricula, manage sessions, score performance | `src/app/api/agents/[agentId]/train/route.ts`, `src/lib/training/` |
| 6 | **Certification Pipeline** | Run certification assessments, issue certificates, manage tiers | `src/app/api/agents/[agentId]/certify/route.ts`, `src/lib/certification/` |
| 7 | **Standards Library** | Maintain industry standards (DevOps, Finance, Healthcare, Legal, Real Estate) | `src/lib/standards/` (domain-specific modules) |
| 8 | **Provenance Chain** | Cryptographic audit trail for agent lifecycle events | Planned — schema defined in `src/lib/db/schema.ts` |

### Deployment & Marketplace Services

| # | Service | Purpose | Current Implementation |
|---|---------|---------|----------------------|
| 9 | **Deploy Channels** | Manage deployment targets (API, Widget, Marketplace) | `src/lib/deploy/` (channels.ts, api-deploy.ts, widget-deploy.ts) |
| 10 | **Marketplace Engine** | Listing management, search, discovery, purchase flow | `src/app/api/marketplace/`, `src/lib/marketplace/` |
| 11 | **Search Index** | Full-text and semantic search across agents and skills | Planned — will use vector store + PostgreSQL FTS |

### Integration Services

| # | Service | Purpose | Current Implementation |
|---|---------|---------|----------------------|
| 12 | **MCP Registry** | Manage MCP tool registrations and server connections | `src/lib/mcp/client.ts`, `src/lib/mcp/registry.ts` |
| 13 | **A2A Gateway** | Agent-to-agent protocol support for inter-agent communication | Planned |
| 14 | **Framework Integrations** | Mappers for CrewAI, LangChain, OpenClaw agent formats | `src/lib/integrations/` (crewai-mapper.ts, langchain-mapper.ts, openclaw-mapper.ts) |
| 15 | **Webhook Service** | Event-driven notifications for agent lifecycle events | Planned |

### Platform Services

| # | Service | Purpose | Current Implementation |
|---|---------|---------|----------------------|
| 16 | **Auth Service** | Authentication via NextAuth.js, session management, RBAC | `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts` |
| 17 | **User Management** | User profiles, subscription tracking, agent ownership | `src/app/api/user/profile/route.ts` |
| 18 | **Billing Service** | Subscription management, certification payments, marketplace transactions | Planned — Stripe integration |
| 19 | **Analytics Engine** | Training metrics, marketplace analytics, platform usage | Planned |
| 20 | **Audit Log** | Immutable event log for compliance and debugging | Planned — will feed into provenance chain |

---

## 3. Tech Stack

### Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | Server-rendered React with API routes |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS + PostCSS | Utility-first CSS framework |
| **Components** | Custom component library | `src/components/` — domain-specific UI components |
| **Auth** | NextAuth.js | Authentication and session management |
| **State** | React Server Components + Client hooks | Server-first rendering with client interactivity |

### Backend (AATS)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **API** | Next.js Route Handlers | RESTful API endpoints in `src/app/api/` |
| **Validation** | Zod (planned) | Runtime type validation for API inputs |
| **ORM** | Drizzle (planned) | Type-safe database access |
| **Queue** | Bull/BullMQ (planned) | Background job processing for training runs |
| **Cache** | Redis (planned) | Session cache, rate limiting, training state |

### Infrastructure

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Hosting** | Vercel | Frontend deployment, serverless functions, edge network |
| **Database** | PostgreSQL (Vercel Postgres / Neon) | Primary data store |
| **Object Storage** | AWS S3 | Training artifacts, agent packages, certificates |
| **Vector Store** | Pinecone / pgvector | Semantic search embeddings |
| **CDN** | Vercel Edge Network | Static assets, global distribution |
| **DNS** | Managed DNS | agents.academy + subsidiary domains |
| **Monitoring** | Vercel Analytics + custom | Performance, errors, usage tracking |

### Development

| Tool | Purpose |
|------|---------|
| **Testing** | Vitest | Unit and integration testing |
| **Linting** | ESLint | Code quality enforcement |
| **Package Manager** | pnpm | Fast, disk-efficient package management |
| **CI/CD** | Vercel Git Integration | Automatic deployments on push |
| **Version Control** | Git / GitHub | Source control and collaboration |

---

## 4. Data Flow

### 4.1 Agent Creation Flow

```
User Input (Describe)
    │
    ▼
┌──────────────────┐
│  Build Studio UI │ ← Template selection, MCP tool picker, model selector
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  POST /api/agents│ ← Agent specification validation
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Agent Mgmt Svc  │ ← Persist agent definition, assign ID
└────────┬─────────┘
         │
         ├──► Skill Library (resolve skill dependencies)
         ├──► MCP Registry (validate tool connections)
         └──► Model Tiers (validate model access by user tier)
```

### 4.2 Training Flow

```
Agent Created
    │
    ▼
┌──────────────────┐
│POST /api/agents/ │
│ [id]/train       │ ← Select training curriculum
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Training Engine  │ ← Initialize training session
└────────┬─────────┘
         │
         ├──► Standards Library (load applicable standards)
         ├──► Execute training scenarios
         ├──► Score performance (security, reliability, domain)
         ├──► Generate training report
         └──► Store results (DB + S3)
```

### 4.3 Certification Flow

```
Training Complete
    │
    ▼
┌──────────────────┐
│POST /api/agents/ │
│ [id]/certify     │ ← Select certification tier
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Cert Pipeline   │ ← Run certification assessments
└────────┬─────────┘
         │
         ├──► Security scan (prompt injection, tool abuse, permissions)
         ├──► Behavioral boundary verification
         ├──► MCP/A2A compliance check (Silver+)
         ├──► Performance benchmarking
         ├──► Generate provenance chain entry
         └──► Issue certificate with badge
```

### 4.4 Marketplace Flow

```
Agent Certified
    │
    ▼
┌──────────────────┐
│POST /api/        │
│ marketplace      │ ← Create listing with pricing
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Marketplace Eng  │ ← Listing validation, search indexing
└────────┬─────────┘
         │
         ├──► Search Index (index for discovery)
         ├──► Cert verification (validate active certification)
         └──► Deploy Channels (prepare deployment packages)

         Buyer Discovery
              │
              ▼
         ┌──────────────────┐
         │GET /api/         │
         │ marketplace      │ ← Search, filter, browse
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ Purchase Flow    │ ← Billing, license issuance, deployment
         └──────────────────┘
```

---

## 5. MCP / A2A Integration Points

### 5.1 MCP Integration

```
┌─────────────────────────────────────────────────────┐
│              agents.academy Platform                 │
│                                                     │
│  ┌─────────────┐     ┌──────────────┐              │
│  │ MCP Client  │◄───►│ MCP Registry │              │
│  │ (lib/mcp/   │     │ (tool        │              │
│  │  client.ts) │     │  catalog)    │              │
│  └──────┬──────┘     └──────────────┘              │
│         │                                           │
└─────────┼───────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  MCP Server A    │  │  MCP Server B    │  │  MCP Server C    │
│  (Database tool) │  │  (API tool)      │  │  (File tool)     │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**MCP Integration Points:**
- **Build Studio** — MCPToolPicker component for selecting and configuring MCP tools during agent creation
- **Training Engine** — Validates MCP tool usage patterns during training scenarios
- **Certification Pipeline** — Tests MCP permission boundaries and tool access compliance
- **Deploy Channels** — Packages MCP server configurations with deployed agents

### 5.2 A2A Integration (Planned)

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│   Agent A    │────────►│  A2A Gateway     │────────►│   Agent B    │
│  (Certified) │  Task   │  (agents.academy)│  Delegate│  (Certified) │
└──────────────┘  Request└────────┬─────────┘         └──────────────┘
                          │
                          ├──► Verify certifications
                          ├──► Log provenance chain
                          ├──► Manage task lifecycle
                          └──► Route billing
```

**A2A Integration Points:**
- **Agent Cards** — Auto-generated from certification data for capability advertisement
- **Task Routing** — A2A Gateway matches tasks to certified agents by capability
- **Trust Verification** — Provenance chain consulted before allowing A2A interactions
- **Billing** — A2A transactions settled through marketplace billing

---

## 6. Model Tier Gating

### Architecture

```
User Request → Model Selector → Tier Check → Provider Router → AI Model
                                    │
                                    ▼
                            ┌───────────────┐
                            │ Tier Config   │
                            │ (tiers.ts)    │
                            ├───────────────┤
                            │ Free:         │
                            │  - GPT-4o-mini│
                            │  - Claude Haiku│
                            │ Pro:          │
                            │  - GPT-4o     │
                            │  - Claude     │
                            │    Sonnet     │
                            │ Enterprise:   │
                            │  - GPT-4      │
                            │  - Claude Opus│
                            │  - Custom     │
                            └───────────────┘
```

Model access is gated by subscription tier. The `providers.ts` module routes requests to the appropriate AI model provider based on the user's tier and the selected model.

---

## 7. Import Pipeline Architecture

### Multi-Framework Agent Import

```
External Agent
    │
    ├──► CrewAI YAML ──► crewai.ts ──► crewai-mapper.ts ──►┐
    │                                                        │
    ├──► LangChain    ──► langchain.ts ──► langchain-       ──►├──► Unified
    │    JSON/Python                   mapper.ts             │   Agent Spec
    │                                                        │
    └──► OpenClaw     ──► openclaw.ts ──► openclaw-         ──►┘
         Manifest                     mapper.ts

                                                              │
                                                              ▼
                                                    ┌──────────────┐
                                                    │ Agent Mgmt   │
                                                    │ Service      │
                                                    └──────────────┘
```

**Supported Import Sources:**
- **CrewAI** — Parse crew YAML definitions, map roles/tools/tasks to agent spec
- **LangChain** — Parse chain definitions, map tools/memory/callbacks to agent spec
- **OpenClaw** — Parse OpenClaw manifests, map capabilities/permissions to agent spec

Each importer produces a **Unified Agent Specification** that the platform processes uniformly regardless of source framework.

---

## 8. Deploy Channel Architecture

### Multi-Channel Deployment

```
Certified Agent
    │
    ▼
┌──────────────────┐
│ Deploy Service   │
│ (channels.ts)    │
└────────┬─────────┘
         │
         ├──► API Deploy (api-deploy.ts)
         │    └──► REST endpoint + API key + rate limiting
         │
         ├──► Widget Deploy (widget-deploy.ts)
         │    └──► Embeddable JS widget + iframe + configuration
         │
         ├──► Marketplace Deploy
         │    └──► Listed on agents.academy marketplace
         │
         └──► Direct Deploy (planned)
              └──► Push to customer infrastructure (Docker / serverless)
```

---

## 9. Database Schema Overview

### Core Entities

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│   Users     │     │    Agents       │     │   Skills     │
├─────────────┤     ├─────────────────┤     ├──────────────┤
│ id          │────►│ id              │────►│ id           │
│ email       │     │ owner_id        │     │ agent_id     │
│ name        │     │ name            │     │ name         │
│ tier        │     │ description     │     │ version      │
│ created_at  │     │ specification   │     │ definition   │
└─────────────┘     │ framework_src   │     │ dependencies │
                    │ model_tier      │     └──────────────┘
                    │ status          │
                    │ created_at      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Training     │  │Certifications│  │  Listings    │
│ Sessions     │  ├──────────────┤  ├──────────────┤
├──────────────┤  │ id           │  │ id           │
│ id           │  │ agent_id     │  │ agent_id     │
│ agent_id     │  │ tier         │  │ cert_id      │
│ curriculum   │  │ issued_at    │  │ price        │
│ scores       │  │ expires_at   │  │ status       │
│ status       │  │ provenance   │  │ created_at   │
│ started_at   │  │ standards    │  └──────────────┘
│ completed_at │  └──────────────┘
└──────────────┘

┌──────────────┐  ┌──────────────┐
│  Deployments │  │  Provenance  │
├──────────────┤  │  Events      │
│ id           │  ├──────────────┤
│ agent_id     │  │ id           │
│ channel      │  │ agent_id     │
│ config       │  │ event_type   │
│ status       │  │ hash         │
│ endpoint     │  │ parent_hash  │
│ created_at   │  │ payload      │
└──────────────┘  │ timestamp    │
                  └──────────────┘
```

### Schema Design Principles
- **Provenance as Linked List** — Each provenance event references its parent hash, creating a tamper-evident chain
- **Certification Expiry** — Certifications have TTLs (Bronze: 1yr, Silver: 6mo, Gold: continuous)
- **Multi-tenancy** — All data scoped to user/organization via `owner_id`
- **Soft Deletes** — Agents and listings are never hard-deleted; status transitions track lifecycle

---

## 10. Security Model

### Authentication & Authorization

```
Request → NextAuth.js → Session Token → RBAC Middleware → Route Handler
                                              │
                                              ▼
                                      ┌───────────────┐
                                      │ Role Matrix    │
                                      ├───────────────┤
                                      │ Builder:       │
                                      │  - Create/edit │
                                      │    own agents  │
                                      │  - Train/cert  │
                                      │  - List on mkt │
                                      │ Buyer:         │
                                      │  - Browse mkt  │
                                      │  - Purchase    │
                                      │  - Deploy      │
                                      │ Admin:         │
                                      │  - All ops     │
                                      │  - Standards   │
                                      │  - Moderation  │
                                      └───────────────┘
```

### Security Layers

| Layer | Implementation | Purpose |
|-------|---------------|---------|
| **Transport** | TLS 1.3 (Vercel managed) | Encrypt all data in transit |
| **Authentication** | NextAuth.js + OAuth providers | Identity verification |
| **Authorization** | Role-based access control | Permission enforcement |
| **Input Validation** | Zod schemas on all API routes | Prevent injection attacks |
| **Rate Limiting** | Redis-backed per-user limits | Prevent abuse |
| **Secrets** | Environment variables (Vercel) | No plaintext secrets in code |
| **Agent Sandboxing** | Isolated execution environments | Prevent agent cross-contamination |
| **Provenance Integrity** | Hash chains with signatures | Tamper-evident audit trail |
| **Dependency Scanning** | Automated supply chain checks | Prevent vulnerable dependencies |

---

## 11. Scalability Approach

### Current Phase (MVP)

- **Serverless-first** — Vercel serverless functions handle API requests with auto-scaling
- **Edge caching** — Static assets and public marketplace pages served from edge
- **Connection pooling** — Database connections pooled via Vercel Postgres / Neon

### Growth Phase (Post-MVP)

| Concern | Solution |
|---------|---------|
| **Training at scale** | Dedicated compute (AWS Lambda / ECS) for training runs |
| **Search performance** | Vector store (Pinecone) for semantic search, PostgreSQL FTS for keyword |
| **Real-time features** | WebSocket connections for training progress, A2A messaging |
| **Global latency** | Multi-region database replicas, edge API routes |
| **Background jobs** | BullMQ workers for training, certification, and deployment pipelines |
| **Storage scaling** | S3 for training artifacts, agent packages, and certificates |

### Architecture Evolution Path

```
Phase 1 (MVP):          Phase 2 (Growth):         Phase 3 (Scale):
Vercel Serverless  ──►  Vercel + AWS Workers  ──►  Microservices on K8s
PostgreSQL         ──►  PostgreSQL + Redis    ──►  PostgreSQL + Redis + Vector
Single Region      ──►  Multi-region Edge     ──►  Global Multi-region
Sync Processing    ──►  Async Job Queues      ──►  Event-driven Architecture
```

---

## 12. File Structure Reference

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (AATS endpoints)
│   │   ├── agents/               # Agent CRUD + train + certify + deploy
│   │   ├── auth/                 # NextAuth.js authentication
│   │   ├── import/               # Agent import pipeline
│   │   ├── marketplace/          # Marketplace listings
│   │   ├── standards/            # Standards library API
│   │   └── user/                 # User profile management
│   ├── auth/                     # Auth pages
│   ├── build/                    # Build Studio pages (import, training, deploy)
│   ├── certify/                  # Certification portal pages
│   ├── courses/                  # Academy course pages
│   ├── integrations/             # Framework integration pages
│   ├── marketplace/              # Marketplace browse/detail pages
│   ├── pricing/                  # Pricing page
│   ├── profile/                  # User/agent profile pages
│   ├── standards/                # Standards browser page
│   └── train/                    # Training arena page
├── components/                   # React components
│   ├── agents/                   # Agent display components
│   ├── auth/                     # Auth UI components
│   ├── build/                    # Build Studio components (MCPToolPicker, ModelSelector)
│   ├── certification/            # Cert badge, timeline, guarantee card
│   ├── chat/                     # Chat interface components
│   ├── deploy/                   # Deploy channel picker, status
│   ├── training/                 # Training dashboard, score gauge, skill bar
│   └── ui/                       # Shared UI components (AgentCard, Badge, DomainBadge)
└── lib/                          # Core business logic
    ├── agents/                   # Agent types and mock data
    ├── api/                      # API type definitions
    ├── certification/            # Certification types and mock data
    ├── db/                       # Database schema and seed data
    ├── deploy/                   # Deploy channel logic
    ├── import/                   # Multi-framework import pipeline
    ├── integrations/             # Framework-specific mappers
    ├── marketplace/              # Marketplace types and mock data
    ├── mcp/                      # MCP client and registry
    ├── models/                   # Model providers and tier gating
    ├── standards/                # Industry standards (DevOps, Finance, Healthcare, Legal, Real Estate)
    └── training/                 # Training session types and mock data
```

---

*This architecture supports the agents.academy vision of an end-to-end platform for the AI agent economy: from building and training, through certification, to marketplace deployment.*
