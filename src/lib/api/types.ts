/* ------------------------------------------------------------------
 *  API Request / Response Types
 * ------------------------------------------------------------------ */

import type { AgentProfile } from "@/lib/agents/types";
import type { CertificationResult } from "@/lib/certification/types";
import type { CertificationTier as MarketCertTier, MarketplaceSort } from "@/lib/marketplace/types";
import type { DeployChannel, DeployStatus } from "@/lib/deploy/types";
import type { ImportSource, ImportedAgent } from "@/lib/import/types";
import type { TrainingSession } from "@/lib/training/types";

// ---- Generic envelope ---------------------------------------------------

export interface ApiError {
  error: string;
}

// ---- /api/agents --------------------------------------------------------

export interface CreateAgentBody {
  name: string;
  domain: string;
  config?: {
    model?: string;
    tools?: string[];
    description?: string;
  };
}

export interface CreateAgentResponse {
  agent: AgentProfile;
}

export interface ListAgentsResponse {
  agents: AgentProfile[];
}

// ---- /api/agents/[agentId] ----------------------------------------------

export interface GetAgentResponse {
  agent: AgentProfile;
}

export interface UpdateAgentBody {
  name?: string;
  description?: string;
  model?: string;
  tools?: string[];
  domain?: string;
}

export interface UpdateAgentResponse {
  agent: AgentProfile;
}

// ---- /api/agents/[agentId]/train ----------------------------------------

export interface StartTrainingBody {
  domain?: string;
}

export interface StartTrainingResponse {
  sessionId: string;
  status: TrainingSession["status"];
  session: TrainingSession;
}

export interface GetTrainingStatusResponse {
  sessionId: string;
  status: TrainingSession["status"];
  session: TrainingSession;
}

// ---- /api/agents/[agentId]/certify --------------------------------------

export interface RequestCertificationBody {
  domain?: string;
  tier?: string;
}

export interface RequestCertificationResponse {
  certification: CertificationResult;
}

export interface GetCertificationStatusResponse {
  agentId: string;
  certifications: AgentProfile["certifications"];
}

// ---- /api/agents/[agentId]/deploy ---------------------------------------

export interface DeployAgentBody {
  channel: DeployChannel;
  config?: Record<string, unknown>;
}

export interface DeployAgentResponse {
  deployment: DeployStatus;
}

// ---- /api/marketplace ---------------------------------------------------

export interface MarketplaceQueryParams {
  domain?: string;
  tier?: MarketCertTier;
  sort?: MarketplaceSort;
  search?: string;
}

// ---- /api/import --------------------------------------------------------

export interface ImportAgentBody {
  source: ImportSource;
  url?: string;
  config?: Record<string, unknown>;
}

export interface ImportAgentResponse {
  agent: ImportedAgent;
}

// ---- /api/standards -----------------------------------------------------

export interface Standard {
  id: string;
  name: string;
  domain: string;
  description: string;
}

export interface ListStandardsResponse {
  standards: Standard[];
}

// ---- /api/user/profile --------------------------------------------------

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  company: string;
  agentCount: number;
  joinedAt: string;
}

export interface UpdateProfileBody {
  name?: string;
  bio?: string;
  company?: string;
}

export interface UpdateProfileResponse {
  profile: UserProfile;
}
