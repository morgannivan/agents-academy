import {
  CertificationTier,
  type CertificationResult,
  type Guarantee,
  type OutcomeGuaranteeContract,
} from "./types";

// ---------------------------------------------------------------------------
// Domain-specific standards & guarantees
// ---------------------------------------------------------------------------

interface DomainProfile {
  standards: string[];
  guarantees: Guarantee[];
}

const DOMAIN_PROFILES: Record<string, DomainProfile> = {
  healthcare: {
    standards: [
      "HIPAA Privacy Rule",
      "HIPAA Security Rule",
      "HL7 FHIR Interoperability",
      "PHI De-identification",
      "Clinical Decision Support Safety",
      "Audit Trail Retention (6 yr)",
    ],
    guarantees: [
      { metric: "Accuracy", threshold: 97, unit: "%", basedOnRuns: 12_400 },
      { metric: "PHI Leak Rate", threshold: 0, unit: "incidents", basedOnRuns: 12_400 },
      { metric: "Response Latency p95", threshold: 800, unit: "ms", basedOnRuns: 12_400 },
      { metric: "Uptime", threshold: 99.95, unit: "%", basedOnRuns: 12_400 },
    ],
  },
  finance: {
    standards: [
      "SOC 2 Type II",
      "PCI-DSS v4.0",
      "SEC Reg-BI Compliance",
      "AML/KYC Validation",
      "Data Residency (US)",
      "Audit Trail Immutability",
    ],
    guarantees: [
      { metric: "Transaction Accuracy", threshold: 99.5, unit: "%", basedOnRuns: 8_750 },
      { metric: "Fraud Detection Recall", threshold: 94, unit: "%", basedOnRuns: 8_750 },
      { metric: "Latency p99", threshold: 400, unit: "ms", basedOnRuns: 8_750 },
      { metric: "Uptime", threshold: 99.99, unit: "%", basedOnRuns: 8_750 },
    ],
  },
  legal: {
    standards: [
      "Attorney-Client Privilege Safeguards",
      "GDPR Article 22 Compliance",
      "eDiscovery Protocol",
      "Citation Accuracy Standard",
      "Conflict-of-Interest Screening",
    ],
    guarantees: [
      { metric: "Citation Accuracy", threshold: 96, unit: "%", basedOnRuns: 5_200 },
      { metric: "Document Review Speed", threshold: 120, unit: "pages/min", basedOnRuns: 5_200 },
      { metric: "False Positive Rate", threshold: 3, unit: "%", basedOnRuns: 5_200 },
      { metric: "Uptime", threshold: 99.9, unit: "%", basedOnRuns: 5_200 },
    ],
  },
  devops: {
    standards: [
      "SOC 2 Type II",
      "ISO 27001 Controls",
      "NIST CSF Alignment",
      "Least-Privilege Enforcement",
      "Incident Playbook Compliance",
    ],
    guarantees: [
      { metric: "Alert Triage Accuracy", threshold: 95, unit: "%", basedOnRuns: 15_300 },
      { metric: "MTTR Reduction", threshold: 40, unit: "%", basedOnRuns: 15_300 },
      { metric: "Runbook Execution Success", threshold: 98, unit: "%", basedOnRuns: 15_300 },
      { metric: "Uptime", threshold: 99.95, unit: "%", basedOnRuns: 15_300 },
    ],
  },
  support: {
    standards: [
      "GDPR Data Subject Requests",
      "PII Masking Standard",
      "Escalation SLA Compliance",
      "Tone & Brand Consistency",
      "Multi-language Support",
    ],
    guarantees: [
      { metric: "Resolution Accuracy", threshold: 92, unit: "%", basedOnRuns: 21_000 },
      { metric: "CSAT Score", threshold: 4.5, unit: "/ 5", basedOnRuns: 21_000 },
      { metric: "Avg Handle Time", threshold: 45, unit: "seconds", basedOnRuns: 21_000 },
      { metric: "Uptime", threshold: 99.9, unit: "%", basedOnRuns: 21_000 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Tier scoring ranges
// ---------------------------------------------------------------------------

const TIER_CONFIG: Record<
  CertificationTier,
  { minScore: number; maxScore: number; failRange: [number, number] }
> = {
  [CertificationTier.COMMUNITY]: { minScore: 55, maxScore: 74, failRange: [2, 4] },
  [CertificationTier.VERIFIED]: { minScore: 75, maxScore: 89, failRange: [0, 2] },
  [CertificationTier.CERTIFIED]: { minScore: 90, maxScore: 99, failRange: [0, 0] },
};

// ---------------------------------------------------------------------------
// Mock agent names per domain
// ---------------------------------------------------------------------------

const MOCK_AGENTS: Record<string, string> = {
  healthcare: "MedAssist Pro",
  finance: "FinGuard AI",
  legal: "LexReview",
  devops: "OpsBot",
  support: "HelpDesk AI",
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function pickDomain(domain: string): DomainProfile {
  const key = domain.toLowerCase();
  return DOMAIN_PROFILES[key] ?? DOMAIN_PROFILES.support;
}

function seededScore(min: number, max: number, seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return min + (Math.abs(hash) % (max - min + 1));
}

export function generateCertification(
  agentId: string,
  domain: string,
  tier: CertificationTier,
): CertificationResult {
  const profile = pickDomain(domain);
  const config = TIER_CONFIG[tier];
  const score = seededScore(config.minScore, config.maxScore, agentId + domain);

  const failCount = seededScore(config.failRange[0], config.failRange[1], agentId);
  const standardsFailed = profile.standards.slice(0, failCount);
  const standardsPassed = profile.standards.slice(failCount);

  const issuedAt = "2026-03-15T00:00:00Z";
  const expiresAt = "2027-03-15T00:00:00Z";

  const agentName =
    MOCK_AGENTS[domain.toLowerCase()] ?? `Agent ${agentId.slice(0, 6)}`;

  const ogc: OutcomeGuaranteeContract | undefined =
    tier !== CertificationTier.COMMUNITY
      ? {
          agentName,
          certification: tier,
          standardsCompliance: standardsPassed,
          guarantees: profile.guarantees,
          confidence: tier === CertificationTier.CERTIFIED ? 0.99 : 0.95,
          validUntil: expiresAt,
        }
      : undefined;

  return {
    agentId,
    tier,
    score,
    standardsPassed,
    standardsFailed,
    issuedAt,
    expiresAt,
    outcomeGuarantee: ogc,
  };
}
