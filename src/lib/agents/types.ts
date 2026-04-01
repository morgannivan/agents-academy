/* ------------------------------------------------------------------
 *  Agent Profile & A2A Agent Card types
 * ------------------------------------------------------------------ */

export interface CertificationSummary {
  tier: "bronze" | "silver" | "gold" | "platinum";
  domain: string;
  score: number;
  issuedAt: string;
}

export interface DeploymentSummary {
  channel: string;
  status: "live" | "deploying" | "offline" | "failed";
  url: string;
}

export interface AgentStats {
  totalTrainingRuns: number;
  katasCompleted: number;
  averageScore: number;
  rankInDomain: number;
  createdAt: string;
  lastTrained: string;
}

/** A2A Agent Card – JSON structure following the A2A spec. */
export interface A2AAgentCard {
  agent_id: string;
  name: string;
  description: string;
  capabilities: string[];
  certified_by: string;
  cert_tier: CertificationSummary["tier"];
  cert_seal: string;
  cert_issued: string;
  cert_expires: string;
  consistency_score: number;
  url: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  description: string;
  domain: string;
  creator: string;
  model: string;
  tools: string[];
  certifications: CertificationSummary[];
  deployments: DeploymentSummary[];
  stats: AgentStats;
  agentCard: A2AAgentCard;
}
