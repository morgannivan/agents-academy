import type { DomainPack, Standard } from "./types";

/* ------------------------------------------------------------------ */
/*  PRECEDENT-CITATION-001 — Precedent Citation                        */
/* ------------------------------------------------------------------ */

const precedentCitation001: Standard = {
  id: "PRECEDENT-CITATION-001",
  version: "1.0.0",
  domain: "legal",
  name: "Precedent Citation",
  description:
    "Ensures citation accuracy, jurisdiction relevance, recency awareness, and overruled-case detection for legal research and brief generation.",
  requirements: [
    {
      id: "PRECEDENT-CITATION-001-R1",
      text: "Agent must cite cases using the correct reporter format (e.g., Bluebook, OSCOLA) for the target jurisdiction.",
      severity: "must",
      category: "citation-accuracy",
    },
    {
      id: "PRECEDENT-CITATION-001-R2",
      text: "Agent must verify that cited precedents are from a jurisdiction with binding or persuasive authority over the matter.",
      severity: "must",
      category: "jurisdiction-relevance",
    },
    {
      id: "PRECEDENT-CITATION-001-R3",
      text: "Agent must flag cases older than 10 years and surface more recent authority on the same legal issue when available.",
      severity: "must",
      category: "recency",
    },
    {
      id: "PRECEDENT-CITATION-001-R4",
      text: "Agent must detect and warn when a cited case has been overruled, reversed, or distinguished by a higher court.",
      severity: "must",
      category: "overruled-detection",
    },
    {
      id: "PRECEDENT-CITATION-001-R5",
      text: "Agent should rank citations by relevance to the specific legal issue rather than alphabetical or chronological order.",
      severity: "should",
      category: "citation-accuracy",
    },
    {
      id: "PRECEDENT-CITATION-001-R6",
      text: "Agent should provide pinpoint citations (paragraph or page number) rather than citing entire decisions.",
      severity: "should",
      category: "citation-accuracy",
    },
    {
      id: "PRECEDENT-CITATION-001-R7",
      text: "Agent may generate a Shepard's-style treatment summary for each cited precedent.",
      severity: "may",
      category: "overruled-detection",
    },
  ],
  scoring: [
    { requirementId: "PRECEDENT-CITATION-001-R1", passWeight: 18, failPenalty: -25 },
    { requirementId: "PRECEDENT-CITATION-001-R2", passWeight: 18, failPenalty: -25 },
    { requirementId: "PRECEDENT-CITATION-001-R3", passWeight: 16, failPenalty: -20 },
    { requirementId: "PRECEDENT-CITATION-001-R4", passWeight: 18, failPenalty: -30 },
    { requirementId: "PRECEDENT-CITATION-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "PRECEDENT-CITATION-001-R6", passWeight: 10, failPenalty: -10 },
    { requirementId: "PRECEDENT-CITATION-001-R7", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 10,
};

/* ------------------------------------------------------------------ */
/*  CONFIDENTIALITY-001 — Confidentiality & Privilege                  */
/* ------------------------------------------------------------------ */

const confidentiality001: Standard = {
  id: "CONFIDENTIALITY-001",
  version: "1.0.0",
  domain: "legal",
  name: "Confidentiality & Privilege",
  description:
    "Covers attorney-client privilege awareness, data compartmentalization, and inadvertent disclosure prevention for legal AI agents.",
  requirements: [
    {
      id: "CONFIDENTIALITY-001-R1",
      text: "Agent must tag all communications and work product as privileged when generated in the context of legal advice.",
      severity: "must",
      category: "privilege-awareness",
    },
    {
      id: "CONFIDENTIALITY-001-R2",
      text: "Agent must enforce matter-level data compartmentalization — information from one matter must never leak into another.",
      severity: "must",
      category: "data-compartmentalization",
    },
    {
      id: "CONFIDENTIALITY-001-R3",
      text: "Agent must prevent inadvertent disclosure by scanning outbound messages for privileged content markers before sending.",
      severity: "must",
      category: "disclosure-prevention",
    },
    {
      id: "CONFIDENTIALITY-001-R4",
      text: "Agent must maintain an access log showing which personnel viewed privileged materials and when.",
      severity: "must",
      category: "privilege-awareness",
    },
    {
      id: "CONFIDENTIALITY-001-R5",
      text: "Agent should warn users before including privileged content in communications with non-privileged recipients.",
      severity: "should",
      category: "disclosure-prevention",
    },
    {
      id: "CONFIDENTIALITY-001-R6",
      text: "Agent should support configurable privilege labels aligned with the firm's document management taxonomy.",
      severity: "should",
      category: "data-compartmentalization",
    },
  ],
  scoring: [
    { requirementId: "CONFIDENTIALITY-001-R1", passWeight: 20, failPenalty: -25 },
    { requirementId: "CONFIDENTIALITY-001-R2", passWeight: 20, failPenalty: -30 },
    { requirementId: "CONFIDENTIALITY-001-R3", passWeight: 20, failPenalty: -30 },
    { requirementId: "CONFIDENTIALITY-001-R4", passWeight: 16, failPenalty: -20 },
    { requirementId: "CONFIDENTIALITY-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "CONFIDENTIALITY-001-R6", passWeight: 8, failPenalty: -10 },
  ],
  kataCount: 8,
};

/* ------------------------------------------------------------------ */
/*  Domain Pack                                                        */
/* ------------------------------------------------------------------ */

const standards = [precedentCitation001, confidentiality001];

export const legalPack: DomainPack = {
  domain: "legal",
  name: "Legal",
  description:
    "Standards for precedent citation accuracy and confidentiality preservation in legal AI agents.",
  emoji: "\u2696\uFE0F",
  standards,
  totalRequirements: standards.reduce(
    (sum, s) => sum + s.requirements.length,
    0,
  ),
  certificationThreshold: 90,
};
