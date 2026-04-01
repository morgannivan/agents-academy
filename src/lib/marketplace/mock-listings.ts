import type { MarketplaceListing } from "./types";

// ---------------------------------------------------------------------------
// Mock Marketplace Listings
// ---------------------------------------------------------------------------

export const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: "lst-001",
    agentId: "medassist-pro",
    name: "MedAssist Pro",
    description:
      "HIPAA-compliant patient intake and triage agent. Handles symptom assessment, appointment scheduling, medication reminders, and care plan coordination. Integrates with Epic and Cerner EHR systems. Trained on 50k+ clinical encounters with 99.2% accuracy on triage categorization.",
    domain: "Healthcare",
    creator: "HealthTech Labs",
    price: { amount: 49, currency: "USD", period: "monthly" },
    rating: 4.8,
    reviews: 312,
    downloads: 4820,
    certificationTier: "certified",
    tags: ["HIPAA", "EHR", "triage", "patient-intake"],
    featured: true,
    createdAt: "2025-11-15",
  },
  {
    id: "lst-002",
    agentId: "finbot-elite",
    name: "FinBot Elite",
    description:
      "Enterprise-grade financial compliance and reporting agent. Automates SOX audit workflows, generates regulatory filings, monitors transaction anomalies in real-time, and produces board-ready financial summaries. Supports SEC, FINRA, and MiFID II standards.",
    domain: "Finance",
    creator: "Meridian AI",
    price: { amount: 199, currency: "USD", period: "monthly" },
    rating: 4.6,
    reviews: 187,
    downloads: 2340,
    certificationTier: "enterprise",
    tags: ["SOX", "compliance", "reporting", "audit"],
    featured: true,
    createdAt: "2025-10-02",
  },
  {
    id: "lst-003",
    agentId: "legal-eagle",
    name: "LegalEagle",
    description:
      "Contract review and due diligence agent that reads, summarizes, and flags risks in legal documents. Supports NDAs, MSAs, SaaS agreements, and M&A data rooms. Reduces review time by 80% with clause-level risk scoring.",
    domain: "Legal",
    creator: "JurisAI",
    price: { amount: 79, currency: "USD", period: "monthly" },
    rating: 4.5,
    reviews: 221,
    downloads: 3150,
    certificationTier: "verified",
    tags: ["contracts", "due-diligence", "risk-analysis", "NDA"],
    featured: false,
    createdAt: "2025-12-08",
  },
  {
    id: "lst-004",
    agentId: "deploy-master",
    name: "DeployMaster",
    description:
      "Incident response and deployment automation agent for DevOps teams. Triages PagerDuty alerts, executes runbooks, manages rollbacks, and posts status updates to Slack. Cuts mean-time-to-resolution by 60%.",
    domain: "DevOps",
    creator: "ShipFast.io",
    price: { amount: 59, currency: "USD", period: "monthly" },
    rating: 4.9,
    reviews: 456,
    downloads: 7200,
    certificationTier: "certified",
    tags: ["incident-response", "CI/CD", "runbooks", "Kubernetes"],
    featured: true,
    createdAt: "2025-09-20",
  },
  {
    id: "lst-005",
    agentId: "secureguard",
    name: "SecureGuard",
    description:
      "SOC analyst agent that monitors security events, triages vulnerabilities, generates threat intelligence reports, and automates compliance checks against CIS benchmarks. Integrates with Splunk, Sentinel, and CrowdStrike.",
    domain: "Security",
    creator: "CyberShield AI",
    price: { amount: 149, currency: "USD", period: "monthly" },
    rating: 4.7,
    reviews: 134,
    downloads: 1890,
    certificationTier: "certified",
    tags: ["SOC", "vulnerability", "threat-intel", "SIEM"],
    featured: false,
    createdAt: "2026-01-10",
  },
  {
    id: "lst-006",
    agentId: "datasage",
    name: "DataSage",
    description:
      "Data analysis and visualization agent that connects to your warehouse, writes SQL queries from natural language, produces charts, and identifies trends. Supports Snowflake, BigQuery, Redshift, and Postgres.",
    domain: "Data Science",
    creator: "Insight Works",
    price: { amount: 34, currency: "USD", period: "monthly" },
    rating: 4.4,
    reviews: 198,
    downloads: 3600,
    certificationTier: "verified",
    tags: ["SQL", "visualization", "analytics", "Snowflake"],
    featured: false,
    createdAt: "2025-11-28",
  },
  {
    id: "lst-007",
    agentId: "edu-tutor",
    name: "EduTutor AI",
    description:
      "Adaptive learning tutor that generates personalized lesson plans, quizzes, and explanations. Covers K-12 math, science, and language arts. Tracks student progress and adjusts difficulty in real-time.",
    domain: "Education",
    creator: "LearnLoop",
    price: { amount: 5, currency: "USD", period: "one_time" },
    rating: 4.3,
    reviews: 89,
    downloads: 12400,
    certificationTier: "community",
    tags: ["tutoring", "adaptive-learning", "K-12", "quizzes"],
    featured: false,
    createdAt: "2026-02-14",
  },
  {
    id: "lst-008",
    agentId: "sales-pilot",
    name: "SalesPilot",
    description:
      "Prospecting and qualification agent that researches leads, drafts personalized outreach sequences, updates CRM records, and prepares meeting briefs. Integrates with Salesforce, HubSpot, and Apollo.",
    domain: "Sales",
    creator: "RevenueAI",
    price: { amount: 39, currency: "USD", period: "monthly" },
    rating: 4.6,
    reviews: 276,
    downloads: 5100,
    certificationTier: "verified",
    tags: ["prospecting", "CRM", "outreach", "lead-scoring"],
    featured: true,
    createdAt: "2025-12-22",
  },
  {
    id: "lst-009",
    agentId: "support-hero",
    name: "SupportHero",
    description:
      "Multi-channel customer support agent handling email, chat, and voice. Resolves L1 tickets autonomously, escalates complex issues with full context, and generates knowledge base articles from resolved cases.",
    domain: "Customer Support",
    creator: "HelpStack",
    price: { amount: 29, currency: "USD", period: "monthly" },
    rating: 4.5,
    reviews: 410,
    downloads: 8900,
    certificationTier: "verified",
    tags: ["ticketing", "multi-channel", "knowledge-base", "L1-automation"],
    featured: false,
    createdAt: "2025-10-30",
  },
  {
    id: "lst-010",
    agentId: "realty-match",
    name: "RealtyMatch",
    description:
      "Real estate agent assistant that qualifies leads, matches buyer preferences to listings, generates property descriptions, schedules showings, and automates follow-up sequences for brokerages.",
    domain: "Real Estate",
    creator: "PropTech AI",
    price: { amount: 15, currency: "USD", period: "per_task" },
    rating: 3.9,
    reviews: 67,
    downloads: 920,
    certificationTier: "community",
    tags: ["lead-qualification", "listings", "scheduling", "CRM"],
    featured: false,
    createdAt: "2026-01-25",
  },
  {
    id: "lst-011",
    agentId: "research-synth",
    name: "ResearchSynth",
    description:
      "Academic research agent that performs literature reviews, extracts key findings from papers, generates citation-backed summaries, and identifies research gaps. Supports PubMed, Semantic Scholar, and arXiv.",
    domain: "Research",
    creator: "Academ.ai",
    price: { amount: 19, currency: "USD", period: "monthly" },
    rating: 4.2,
    reviews: 143,
    downloads: 2100,
    certificationTier: "community",
    tags: ["literature-review", "synthesis", "citations", "PubMed"],
    featured: false,
    createdAt: "2026-03-01",
  },
  {
    id: "lst-012",
    agentId: "content-craft",
    name: "ContentCraft",
    description:
      "Content strategy and creation agent that generates editorial calendars, writes SEO-optimized blog posts, creates social media copy, and ensures brand voice consistency across channels.",
    domain: "Content",
    creator: "WriteFlow",
    price: { amount: 24, currency: "USD", period: "monthly" },
    rating: 3.5,
    reviews: 58,
    downloads: 1450,
    certificationTier: "community",
    tags: ["SEO", "editorial", "social-media", "brand-voice"],
    featured: false,
    createdAt: "2026-02-28",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getListingByAgentId(
  agentId: string,
): MarketplaceListing | undefined {
  return MOCK_LISTINGS.find((l) => l.agentId === agentId);
}

export function getFeaturedListings(): MarketplaceListing[] {
  return MOCK_LISTINGS.filter((l) => l.featured);
}

export function getRelatedListings(
  agentId: string,
  limit = 3,
): MarketplaceListing[] {
  const listing = getListingByAgentId(agentId);
  if (!listing) return MOCK_LISTINGS.slice(0, limit);
  return MOCK_LISTINGS.filter(
    (l) => l.agentId !== agentId && l.domain === listing.domain,
  ).slice(0, limit);
}

export const ALL_DOMAINS = [
  "All",
  ...Array.from(new Set(MOCK_LISTINGS.map((l) => l.domain))),
];
