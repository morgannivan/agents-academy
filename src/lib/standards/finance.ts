import type { DomainPack, Standard } from "./types";

/* ------------------------------------------------------------------ */
/*  SOX-COMPLIANCE-001 — SOX Compliance                                */
/* ------------------------------------------------------------------ */

const soxCompliance001: Standard = {
  id: "SOX-COMPLIANCE-001",
  version: "1.0.0",
  domain: "finance",
  name: "SOX Compliance",
  description:
    "Ensures agent outputs meet Sarbanes-Oxley requirements for audit trails, access controls, and data integrity in financial reporting workflows.",
  requirements: [
    {
      id: "SOX-COMPLIANCE-001-R1",
      text: "Agent must maintain a tamper-evident audit log of every financial data access, transformation, and output event.",
      severity: "must",
      category: "audit-trail",
    },
    {
      id: "SOX-COMPLIANCE-001-R2",
      text: "Agent must enforce segregation of duties — the same principal cannot both initiate and approve a financial transaction.",
      severity: "must",
      category: "access-controls",
    },
    {
      id: "SOX-COMPLIANCE-001-R3",
      text: "Agent must validate data integrity checksums before and after any financial data transformation.",
      severity: "must",
      category: "data-integrity",
    },
    {
      id: "SOX-COMPLIANCE-001-R4",
      text: "Agent must restrict access to financial records to authorised roles with documented approval chains.",
      severity: "must",
      category: "access-controls",
    },
    {
      id: "SOX-COMPLIANCE-001-R5",
      text: "Agent should flag anomalous transaction patterns that may indicate material misstatement or fraud.",
      severity: "should",
      category: "data-integrity",
    },
    {
      id: "SOX-COMPLIANCE-001-R6",
      text: "Agent should produce change-tracking reports for all modifications to financial document templates.",
      severity: "should",
      category: "audit-trail",
    },
  ],
  scoring: [
    { requirementId: "SOX-COMPLIANCE-001-R1", passWeight: 20, failPenalty: -30 },
    { requirementId: "SOX-COMPLIANCE-001-R2", passWeight: 20, failPenalty: -25 },
    { requirementId: "SOX-COMPLIANCE-001-R3", passWeight: 18, failPenalty: -25 },
    { requirementId: "SOX-COMPLIANCE-001-R4", passWeight: 18, failPenalty: -25 },
    { requirementId: "SOX-COMPLIANCE-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "SOX-COMPLIANCE-001-R6", passWeight: 10, failPenalty: -10 },
  ],
  kataCount: 10,
};

/* ------------------------------------------------------------------ */
/*  NUMERICAL-ACCURACY-001 — Numerical Accuracy                        */
/* ------------------------------------------------------------------ */

const numericalAccuracy001: Standard = {
  id: "NUMERICAL-ACCURACY-001",
  version: "1.0.0",
  domain: "finance",
  name: "Numerical Accuracy",
  description:
    "Validates decimal precision, currency handling, calculation verification, and rounding rules for all financial computations.",
  requirements: [
    {
      id: "NUMERICAL-ACCURACY-001-R1",
      text: "Agent must use fixed-point or decimal arithmetic (never floating-point) for all monetary calculations.",
      severity: "must",
      category: "decimal-precision",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R2",
      text: "Agent must preserve the correct number of decimal places per currency (e.g., 2 for USD, 0 for JPY, 8 for BTC).",
      severity: "must",
      category: "currency-handling",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R3",
      text: "Agent must apply banker's rounding (round-half-to-even) unless a different rounding rule is explicitly configured.",
      severity: "must",
      category: "rounding-rules",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R4",
      text: "Agent must independently verify totals by re-summing line items rather than trusting cached aggregates.",
      severity: "must",
      category: "calculation-verification",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R5",
      text: "Agent should display currency codes (ISO 4217) alongside all monetary values to prevent ambiguity.",
      severity: "should",
      category: "currency-handling",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R6",
      text: "Agent should log intermediate calculation steps for auditability of complex multi-step computations.",
      severity: "should",
      category: "calculation-verification",
    },
    {
      id: "NUMERICAL-ACCURACY-001-R7",
      text: "Agent may support configurable rounding modes (truncation, ceiling, floor) for jurisdiction-specific requirements.",
      severity: "may",
      category: "rounding-rules",
    },
  ],
  scoring: [
    { requirementId: "NUMERICAL-ACCURACY-001-R1", passWeight: 18, failPenalty: -30 },
    { requirementId: "NUMERICAL-ACCURACY-001-R2", passWeight: 16, failPenalty: -25 },
    { requirementId: "NUMERICAL-ACCURACY-001-R3", passWeight: 16, failPenalty: -20 },
    { requirementId: "NUMERICAL-ACCURACY-001-R4", passWeight: 16, failPenalty: -25 },
    { requirementId: "NUMERICAL-ACCURACY-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "NUMERICAL-ACCURACY-001-R6", passWeight: 10, failPenalty: -10 },
    { requirementId: "NUMERICAL-ACCURACY-001-R7", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 12,
};

/* ------------------------------------------------------------------ */
/*  RISK-DISCLOSURE-001 — Risk Disclosure                              */
/* ------------------------------------------------------------------ */

const riskDisclosure001: Standard = {
  id: "RISK-DISCLOSURE-001",
  version: "1.0.0",
  domain: "finance",
  name: "Risk Disclosure",
  description:
    "Ensures mandatory disclaimers, proper risk factor presentation, and regulatory compliance in all financial communications generated by the agent.",
  requirements: [
    {
      id: "RISK-DISCLOSURE-001-R1",
      text: "Agent must append a regulatory disclaimer to every output that contains investment-related information or projections.",
      severity: "must",
      category: "disclaimers",
    },
    {
      id: "RISK-DISCLOSURE-001-R2",
      text: "Agent must present risk factors in order of materiality, with quantitative impact ranges where available.",
      severity: "must",
      category: "risk-factors",
    },
    {
      id: "RISK-DISCLOSURE-001-R3",
      text: "Agent must never present projected returns without an accompanying statement that past performance does not guarantee future results.",
      severity: "must",
      category: "disclaimers",
    },
    {
      id: "RISK-DISCLOSURE-001-R4",
      text: "Agent must comply with jurisdiction-specific disclosure requirements (SEC, FCA, MiFID II) based on the configured locale.",
      severity: "must",
      category: "regulatory-compliance",
    },
    {
      id: "RISK-DISCLOSURE-001-R5",
      text: "Agent should clearly distinguish between factual data and forward-looking statements in all outputs.",
      severity: "should",
      category: "risk-factors",
    },
    {
      id: "RISK-DISCLOSURE-001-R6",
      text: "Agent may provide links to full prospectus or regulatory filing documents when summarising financial products.",
      severity: "may",
      category: "regulatory-compliance",
    },
  ],
  scoring: [
    { requirementId: "RISK-DISCLOSURE-001-R1", passWeight: 20, failPenalty: -30 },
    { requirementId: "RISK-DISCLOSURE-001-R2", passWeight: 18, failPenalty: -20 },
    { requirementId: "RISK-DISCLOSURE-001-R3", passWeight: 20, failPenalty: -30 },
    { requirementId: "RISK-DISCLOSURE-001-R4", passWeight: 18, failPenalty: -25 },
    { requirementId: "RISK-DISCLOSURE-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "RISK-DISCLOSURE-001-R6", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 8,
};

/* ------------------------------------------------------------------ */
/*  Domain Pack                                                        */
/* ------------------------------------------------------------------ */

const standards = [soxCompliance001, numericalAccuracy001, riskDisclosure001];

export const financePack: DomainPack = {
  domain: "finance",
  name: "Finance",
  description:
    "Standards for SOX compliance, numerical accuracy, and risk disclosure in financial AI agents.",
  emoji: "\u{1F4B0}",
  standards,
  totalRequirements: standards.reduce(
    (sum, s) => sum + s.requirements.length,
    0,
  ),
  certificationThreshold: 90,
};
