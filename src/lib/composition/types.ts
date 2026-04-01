// ---------------------------------------------------------------------------
// Agent Composition Engine Types
// ---------------------------------------------------------------------------

/** Relationship between two agents in a team. */
export type ConnectionType =
  | "delegates_to"
  | "reports_to"
  | "collaborates_with";

/** A single agent assigned to a team. */
export interface TeamMember {
  agentId: string;
  role: string;
  certificationTier: "bronze" | "silver" | "gold" | "platinum";
  score: number;
}

/** A directed connection between two agents in a team. */
export interface AgentConnection {
  fromAgentId: string;
  toAgentId: string;
  type: ConnectionType;
  description: string;
}

/** A fully assembled multi-agent team. */
export interface AgentTeam {
  id: string;
  name: string;
  description: string;
  agents: TeamMember[];
  connections: AgentConnection[];
  compositeScore: number;
  compositeCertification: "bronze" | "silver" | "gold" | "platinum";
}

/** A slot in a team template that can be filled by a real agent. */
export interface TemplateSlot {
  role: string;
  domain: string;
  requiredTier: "bronze" | "silver" | "gold" | "platinum";
  suggestedAgentId?: string;
}

/** A reusable team blueprint. */
export interface TeamTemplate {
  id: string;
  name: string;
  description: string;
  domain: string;
  members: TemplateSlot[];
}
