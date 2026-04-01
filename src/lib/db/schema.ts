// ---------------------------------------------------------------------------
// Database Schema – Drizzle-style type definitions
// ---------------------------------------------------------------------------

/** Model tier determines which LLM providers a user can access. */
export type ModelTier = "free" | "pro" | "enterprise";

/** Certification quality tiers. */
export type CertTier = "bronze" | "silver" | "gold" | "platinum";

/** Training session lifecycle status. */
export type TrainingStatus = "pending" | "running" | "complete" | "failed";

/** Deployment lifecycle status. */
export type DeploymentStatus = "idle" | "deploying" | "live" | "failed";

/** Deployment channel identifiers. */
export type DeployChannel =
  | "api"
  | "web_widget"
  | "slack"
  | "telegram"
  | "discord"
  | "sms"
  | "whatsapp"
  | "mcp_server";

/** Marketplace pricing period. */
export type PricePeriod = "monthly" | "yearly" | "one_time" | "per_task";

/** ISO-4217 currency code. */
export type Currency = "USD" | "EUR" | "GBP";

// ---------------------------------------------------------------------------
// Table Interfaces
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  name: string;
  image: string | null;
  modelTier: ModelTier;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  domain: string;
  model: string;
  systemPrompt: string;
  tools: string[];
  config: Record<string, unknown>;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  agentId: string;
  tier: CertTier;
  score: number;
  standardsPassed: string[];
  standardsFailed: string[];
  outcomeGuarantee: string | null;
  issuedAt: string;
  expiresAt: string;
}

export interface TrainingSession {
  id: string;
  agentId: string;
  domain: string;
  status: TrainingStatus;
  katasCompleted: number;
  katasTotal: number;
  currentScore: number;
  startedAt: string;
  completedAt: string | null;
}

export interface MarketplaceListing {
  id: string;
  agentId: string;
  price: number;
  currency: Currency;
  period: PricePeriod;
  featured: boolean;
  downloads: number;
  rating: number;
  tags: string[];
  createdAt: string;
}

export interface Deployment {
  id: string;
  agentId: string;
  channel: DeployChannel;
  status: DeploymentStatus;
  url: string;
  config: Record<string, unknown>;
  createdAt: string;
}

export interface Standard {
  id: string;
  version: string;
  domain: string;
  name: string;
  description: string;
  requirements: string[];
  scoring: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Aggregate – useful for seed data and API responses
// ---------------------------------------------------------------------------

export interface DatabaseSchema {
  users: User[];
  agents: Agent[];
  certifications: Certification[];
  trainingSessions: TrainingSession[];
  marketplaceListings: MarketplaceListing[];
  deployments: Deployment[];
  standards: Standard[];
}
