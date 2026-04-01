// ---------------------------------------------------------------------------
// Certification System Types
// ---------------------------------------------------------------------------

export enum CertificationTier {
  COMMUNITY = "COMMUNITY",
  VERIFIED = "VERIFIED",
  CERTIFIED = "CERTIFIED",
}

export interface Guarantee {
  metric: string;
  threshold: number;
  unit: string;
  basedOnRuns: number;
}

export interface OutcomeGuaranteeContract {
  agentName: string;
  certification: CertificationTier;
  standardsCompliance: string[];
  guarantees: Guarantee[];
  confidence: number;
  validUntil: string;
}

export interface CertificationResult {
  agentId: string;
  tier: CertificationTier;
  score: number;
  standardsPassed: string[];
  standardsFailed: string[];
  issuedAt: string;
  expiresAt: string;
  outcomeGuarantee?: OutcomeGuaranteeContract;
}
