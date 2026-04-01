// ---------------------------------------------------------------------------
// Seed Data Generator
// ---------------------------------------------------------------------------

import type {
  DatabaseSchema,
  User,
  Agent,
  Certification,
  TrainingSession,
  MarketplaceListing,
  Deployment,
  Standard,
} from "./schema";

// ---- Helpers ---------------------------------------------------------------

let _counter = 0;
function uid(prefix: string): string {
  _counter += 1;
  return `${prefix}_${String(_counter).padStart(4, "0")}`;
}

function iso(daysAgo: number): string {
  const d = new Date("2026-03-15T00:00:00Z");
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

// ---- Users -----------------------------------------------------------------

const users: User[] = [
  {
    id: uid("usr"),
    email: "nivan@agents.academy",
    name: "Nivan Morgan",
    image: "https://avatars.githubusercontent.com/u/1001",
    modelTier: "enterprise",
    createdAt: iso(120),
  },
  {
    id: uid("usr"),
    email: "alex@healthco.io",
    name: "Alex Chen",
    image: "https://avatars.githubusercontent.com/u/1002",
    modelTier: "pro",
    createdAt: iso(90),
  },
  {
    id: uid("usr"),
    email: "sara@legaledge.com",
    name: "Sara Patel",
    image: null,
    modelTier: "pro",
    createdAt: iso(60),
  },
  {
    id: uid("usr"),
    email: "james@finsolve.co",
    name: "James Wright",
    image: "https://avatars.githubusercontent.com/u/1004",
    modelTier: "free",
    createdAt: iso(30),
  },
];

// ---- Standards -------------------------------------------------------------

const standards: Standard[] = [
  {
    id: uid("std"),
    version: "1.0.0",
    domain: "healthcare",
    name: "HIPAA Compliance",
    description: "Ensures agent handles PHI correctly per HIPAA regulations.",
    requirements: [
      "No PHI in logs",
      "Encryption at rest",
      "Access audit trail",
      "Minimum necessary disclosure",
    ],
    scoring: { accuracy: 40, safety: 35, compliance: 25 },
  },
  {
    id: uid("std"),
    version: "1.0.0",
    domain: "finance",
    name: "SEC/FINRA Advisory",
    description:
      "Validates agent advisory output against SEC & FINRA disclosure rules.",
    requirements: [
      "Suitability disclosure",
      "Risk factor presentation",
      "No forward-looking guarantees",
      "Fee transparency",
    ],
    scoring: { accuracy: 35, safety: 30, compliance: 35 },
  },
  {
    id: uid("std"),
    version: "1.0.0",
    domain: "legal",
    name: "Contract Review Accuracy",
    description:
      "Measures precision and recall of clause identification and risk flagging.",
    requirements: [
      "Clause extraction",
      "Risk classification",
      "Redline suggestions",
      "Citation accuracy",
    ],
    scoring: { accuracy: 50, safety: 20, compliance: 30 },
  },
  {
    id: uid("std"),
    version: "1.0.0",
    domain: "real_estate",
    name: "MLS Data Integrity",
    description:
      "Ensures agent presents property data accurately from MLS feeds.",
    requirements: [
      "Price accuracy",
      "Listing status sync",
      "Photo attribution",
      "Fair housing compliance",
    ],
    scoring: { accuracy: 45, safety: 15, compliance: 40 },
  },
  {
    id: uid("std"),
    version: "1.0.0",
    domain: "devops",
    name: "IaC Safety",
    description:
      "Validates infrastructure-as-code output for security and best practices.",
    requirements: [
      "No hardcoded secrets",
      "Least-privilege IAM",
      "Encryption enabled",
      "Drift detection",
    ],
    scoring: { accuracy: 30, safety: 45, compliance: 25 },
  },
];

// ---- Agents ----------------------------------------------------------------

const agents: Agent[] = [
  {
    id: uid("agt"),
    name: "MedScribe Pro",
    description:
      "HIPAA-compliant clinical documentation agent that transcribes and codes patient encounters.",
    domain: "healthcare",
    model: "gpt-4o",
    systemPrompt:
      "You are a medical scribe. Transcribe the encounter accurately and assign ICD-10 codes.",
    tools: ["transcription", "icd10-lookup", "ehr-write"],
    config: { temperature: 0.2, maxTokens: 4096 },
    creatorId: users[1].id,
    createdAt: iso(80),
    updatedAt: iso(5),
  },
  {
    id: uid("agt"),
    name: "FinGuard Advisor",
    description:
      "SEC-compliant financial advisory agent providing portfolio recommendations with full disclosure.",
    domain: "finance",
    model: "claude-3.5-sonnet",
    systemPrompt:
      "You are a licensed financial advisor. Provide recommendations with required disclosures.",
    tools: ["portfolio-analysis", "risk-calculator", "sec-filing-search"],
    config: { temperature: 0.3, maxTokens: 8192 },
    creatorId: users[3].id,
    createdAt: iso(50),
    updatedAt: iso(3),
  },
  {
    id: uid("agt"),
    name: "LexReview",
    description:
      "AI-powered contract review agent that identifies risks, suggests redlines, and checks compliance.",
    domain: "legal",
    model: "gpt-4o",
    systemPrompt:
      "You are a contract review specialist. Identify risky clauses and suggest amendments.",
    tools: ["clause-extractor", "precedent-search", "redline-generator"],
    config: { temperature: 0.1, maxTokens: 16384 },
    creatorId: users[2].id,
    createdAt: iso(45),
    updatedAt: iso(1),
  },
  {
    id: uid("agt"),
    name: "PropertyPilot",
    description:
      "MLS-integrated real estate agent that generates CMAs and qualifies leads.",
    domain: "real_estate",
    model: "gemini-2.0-flash",
    systemPrompt:
      "You are a real estate assistant. Help users find properties and generate market analyses.",
    tools: ["mls-search", "cma-generator", "lead-scorer"],
    config: { temperature: 0.4, maxTokens: 4096 },
    creatorId: users[0].id,
    createdAt: iso(35),
    updatedAt: iso(7),
  },
  {
    id: uid("agt"),
    name: "InfraBot",
    description:
      "DevOps agent that generates Terraform modules, reviews PRs, and runs incident playbooks.",
    domain: "devops",
    model: "claude-3.5-sonnet",
    systemPrompt:
      "You are a senior DevOps engineer. Generate secure IaC and respond to incidents.",
    tools: ["terraform-gen", "pr-reviewer", "runbook-executor"],
    config: { temperature: 0.2, maxTokens: 8192 },
    creatorId: users[0].id,
    createdAt: iso(20),
    updatedAt: iso(2),
  },
];

// ---- Certifications --------------------------------------------------------

const certifications: Certification[] = [
  {
    id: uid("cert"),
    agentId: agents[0].id,
    tier: "gold",
    score: 92,
    standardsPassed: ["No PHI in logs", "Encryption at rest", "Access audit trail"],
    standardsFailed: ["Minimum necessary disclosure"],
    outcomeGuarantee: "95% coding accuracy on ICD-10 within 30 days",
    issuedAt: iso(10),
    expiresAt: iso(-355),
  },
  {
    id: uid("cert"),
    agentId: agents[1].id,
    tier: "silver",
    score: 84,
    standardsPassed: ["Suitability disclosure", "Fee transparency"],
    standardsFailed: ["Risk factor presentation", "No forward-looking guarantees"],
    outcomeGuarantee: null,
    issuedAt: iso(8),
    expiresAt: iso(-357),
  },
  {
    id: uid("cert"),
    agentId: agents[2].id,
    tier: "platinum",
    score: 97,
    standardsPassed: [
      "Clause extraction",
      "Risk classification",
      "Redline suggestions",
      "Citation accuracy",
    ],
    standardsFailed: [],
    outcomeGuarantee: "99% clause identification recall",
    issuedAt: iso(5),
    expiresAt: iso(-360),
  },
  {
    id: uid("cert"),
    agentId: agents[3].id,
    tier: "bronze",
    score: 71,
    standardsPassed: ["Price accuracy", "Listing status sync"],
    standardsFailed: ["Photo attribution", "Fair housing compliance"],
    outcomeGuarantee: null,
    issuedAt: iso(12),
    expiresAt: iso(-353),
  },
  {
    id: uid("cert"),
    agentId: agents[4].id,
    tier: "gold",
    score: 90,
    standardsPassed: ["No hardcoded secrets", "Least-privilege IAM", "Encryption enabled"],
    standardsFailed: ["Drift detection"],
    outcomeGuarantee: "Zero critical security findings in generated IaC",
    issuedAt: iso(4),
    expiresAt: iso(-361),
  },
];

// ---- Training Sessions -----------------------------------------------------

const trainingSessions: TrainingSession[] = [
  {
    id: uid("trn"),
    agentId: agents[0].id,
    domain: "healthcare",
    status: "complete",
    katasCompleted: 50,
    katasTotal: 50,
    currentScore: 92,
    startedAt: iso(15),
    completedAt: iso(11),
  },
  {
    id: uid("trn"),
    agentId: agents[1].id,
    domain: "finance",
    status: "complete",
    katasCompleted: 40,
    katasTotal: 40,
    currentScore: 84,
    startedAt: iso(14),
    completedAt: iso(9),
  },
  {
    id: uid("trn"),
    agentId: agents[2].id,
    domain: "legal",
    status: "complete",
    katasCompleted: 60,
    katasTotal: 60,
    currentScore: 97,
    startedAt: iso(10),
    completedAt: iso(6),
  },
  {
    id: uid("trn"),
    agentId: agents[3].id,
    domain: "real_estate",
    status: "running",
    katasCompleted: 22,
    katasTotal: 35,
    currentScore: 71,
    startedAt: iso(3),
    completedAt: null,
  },
  {
    id: uid("trn"),
    agentId: agents[4].id,
    domain: "devops",
    status: "complete",
    katasCompleted: 45,
    katasTotal: 45,
    currentScore: 90,
    startedAt: iso(8),
    completedAt: iso(5),
  },
  {
    id: uid("trn"),
    agentId: agents[1].id,
    domain: "finance",
    status: "failed",
    katasCompleted: 12,
    katasTotal: 40,
    currentScore: 38,
    startedAt: iso(25),
    completedAt: iso(24),
  },
];

// ---- Marketplace Listings --------------------------------------------------

const marketplaceListings: MarketplaceListing[] = [
  {
    id: uid("mkt"),
    agentId: agents[0].id,
    price: 299,
    currency: "USD",
    period: "monthly",
    featured: true,
    downloads: 1_240,
    rating: 4.8,
    tags: ["healthcare", "hipaa", "clinical", "documentation"],
    createdAt: iso(9),
  },
  {
    id: uid("mkt"),
    agentId: agents[2].id,
    price: 499,
    currency: "USD",
    period: "monthly",
    featured: true,
    downloads: 870,
    rating: 4.9,
    tags: ["legal", "contracts", "compliance", "redline"],
    createdAt: iso(4),
  },
  {
    id: uid("mkt"),
    agentId: agents[4].id,
    price: 199,
    currency: "USD",
    period: "monthly",
    featured: false,
    downloads: 2_310,
    rating: 4.7,
    tags: ["devops", "terraform", "infrastructure", "incident-response"],
    createdAt: iso(3),
  },
  {
    id: uid("mkt"),
    agentId: agents[1].id,
    price: 79,
    currency: "USD",
    period: "per_task",
    featured: false,
    downloads: 560,
    rating: 4.3,
    tags: ["finance", "advisory", "sec", "portfolio"],
    createdAt: iso(7),
  },
  {
    id: uid("mkt"),
    agentId: agents[3].id,
    price: 149,
    currency: "USD",
    period: "monthly",
    featured: false,
    downloads: 340,
    rating: 3.9,
    tags: ["real-estate", "mls", "cma", "leads"],
    createdAt: iso(11),
  },
];

// ---- Deployments -----------------------------------------------------------

const deployments: Deployment[] = [
  {
    id: uid("dep"),
    agentId: agents[0].id,
    channel: "api",
    status: "live",
    url: "https://api.agents.academy/v1/agents/medscribe-pro",
    config: { rateLimit: 100, authType: "api_key" },
    createdAt: iso(8),
  },
  {
    id: uid("dep"),
    agentId: agents[0].id,
    channel: "web_widget",
    status: "live",
    url: "https://widget.agents.academy/medscribe-pro",
    config: { primaryColor: "#4F46E5", position: "bottom-right" },
    createdAt: iso(7),
  },
  {
    id: uid("dep"),
    agentId: agents[2].id,
    channel: "slack",
    status: "live",
    url: "https://slack.agents.academy/lexreview",
    config: { workspaceId: "T04ABCDEF" },
    createdAt: iso(3),
  },
  {
    id: uid("dep"),
    agentId: agents[4].id,
    channel: "mcp_server",
    status: "live",
    url: "https://mcp.agents.academy/infrabot",
    config: { transport: "sse", port: 8080 },
    createdAt: iso(2),
  },
  {
    id: uid("dep"),
    agentId: agents[3].id,
    channel: "api",
    status: "deploying",
    url: "",
    config: { rateLimit: 50, authType: "oauth2" },
    createdAt: iso(1),
  },
  {
    id: uid("dep"),
    agentId: agents[1].id,
    channel: "telegram",
    status: "failed",
    url: "",
    config: {},
    createdAt: iso(6),
  },
];

// ---- Export ----------------------------------------------------------------

/**
 * Generates a complete set of realistic seed data for all database tables.
 */
export function generateSeedData(): DatabaseSchema {
  // Reset counter so IDs are deterministic across calls
  _counter = 0;

  return {
    users,
    agents,
    certifications,
    trainingSessions,
    marketplaceListings,
    deployments,
    standards,
  };
}
