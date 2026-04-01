/* ------------------------------------------------------------------ */
/*  Domain Standards Library — Core Types                              */
/* ------------------------------------------------------------------ */

export type Severity = "must" | "should" | "may";

export interface Requirement {
  id: string;
  text: string;
  severity: Severity;
  category: string;
}

export interface ScoringRule {
  requirementId: string;
  passWeight: number;
  failPenalty: number;
}

export interface Standard {
  id: string;
  version: string;
  domain: string;
  name: string;
  description: string;
  requirements: Requirement[];
  scoring: ScoringRule[];
  kataCount: number;
}

export interface DomainPack {
  domain: string;
  name: string;
  description: string;
  emoji: string;
  standards: Standard[];
  totalRequirements: number;
  certificationThreshold: number;
}
