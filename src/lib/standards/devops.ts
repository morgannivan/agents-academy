import type { DomainPack, Standard } from "./types";

/* ------------------------------------------------------------------ */
/*  INCIDENT-RESPONSE-001 — Incident Response                          */
/* ------------------------------------------------------------------ */

const incidentResponse001: Standard = {
  id: "INCIDENT-RESPONSE-001",
  version: "1.0.0",
  domain: "devops",
  name: "Incident Response",
  description:
    "Covers severity classification, escalation procedures, communication templates, and post-mortem triggers for production incident management.",
  requirements: [
    {
      id: "INCIDENT-RESPONSE-001-R1",
      text: "Agent must classify incidents into severity levels (SEV1–SEV4) using predefined impact and urgency criteria.",
      severity: "must",
      category: "severity-classification",
    },
    {
      id: "INCIDENT-RESPONSE-001-R2",
      text: "Agent must automatically page the on-call engineer within 2 minutes for SEV1 and SEV2 incidents.",
      severity: "must",
      category: "escalation",
    },
    {
      id: "INCIDENT-RESPONSE-001-R3",
      text: "Agent must generate a structured status update using the configured communication template at each escalation stage.",
      severity: "must",
      category: "communication",
    },
    {
      id: "INCIDENT-RESPONSE-001-R4",
      text: "Agent must trigger a post-mortem workflow for every SEV1 incident and any SEV2 incident lasting longer than 30 minutes.",
      severity: "must",
      category: "post-mortem",
    },
    {
      id: "INCIDENT-RESPONSE-001-R5",
      text: "Agent should correlate concurrent alerts to identify common root causes and suppress duplicate notifications.",
      severity: "should",
      category: "severity-classification",
    },
    {
      id: "INCIDENT-RESPONSE-001-R6",
      text: "Agent should maintain a running incident timeline with timestamped actions for handoff continuity.",
      severity: "should",
      category: "communication",
    },
    {
      id: "INCIDENT-RESPONSE-001-R7",
      text: "Agent may suggest relevant past incident resolutions based on similarity scoring of symptoms and affected services.",
      severity: "may",
      category: "escalation",
    },
  ],
  scoring: [
    { requirementId: "INCIDENT-RESPONSE-001-R1", passWeight: 18, failPenalty: -25 },
    { requirementId: "INCIDENT-RESPONSE-001-R2", passWeight: 18, failPenalty: -30 },
    { requirementId: "INCIDENT-RESPONSE-001-R3", passWeight: 15, failPenalty: -20 },
    { requirementId: "INCIDENT-RESPONSE-001-R4", passWeight: 15, failPenalty: -20 },
    { requirementId: "INCIDENT-RESPONSE-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "INCIDENT-RESPONSE-001-R6", passWeight: 10, failPenalty: -10 },
    { requirementId: "INCIDENT-RESPONSE-001-R7", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 10,
};

/* ------------------------------------------------------------------ */
/*  SLA-COMPLIANCE-001 — SLA Compliance                                */
/* ------------------------------------------------------------------ */

const slaCompliance001: Standard = {
  id: "SLA-COMPLIANCE-001",
  version: "1.0.0",
  domain: "devops",
  name: "SLA Compliance",
  description:
    "Ensures uptime tracking, latency threshold monitoring, and error budget management align with published Service Level Agreements.",
  requirements: [
    {
      id: "SLA-COMPLIANCE-001-R1",
      text: "Agent must continuously track uptime percentage against the configured SLA target (e.g., 99.9%, 99.95%).",
      severity: "must",
      category: "uptime-tracking",
    },
    {
      id: "SLA-COMPLIANCE-001-R2",
      text: "Agent must alert when p99 latency exceeds the defined threshold for any monitored endpoint.",
      severity: "must",
      category: "latency-thresholds",
    },
    {
      id: "SLA-COMPLIANCE-001-R3",
      text: "Agent must calculate and report remaining error budget in real time, freezing non-critical deployments when budget is exhausted.",
      severity: "must",
      category: "error-budget",
    },
    {
      id: "SLA-COMPLIANCE-001-R4",
      text: "Agent must generate SLA compliance reports on a configurable cadence (daily, weekly, monthly).",
      severity: "must",
      category: "uptime-tracking",
    },
    {
      id: "SLA-COMPLIANCE-001-R5",
      text: "Agent should project error budget depletion dates based on current burn rate trends.",
      severity: "should",
      category: "error-budget",
    },
    {
      id: "SLA-COMPLIANCE-001-R6",
      text: "Agent may recommend SLA tier adjustments based on historical reliability data and cost analysis.",
      severity: "may",
      category: "uptime-tracking",
    },
  ],
  scoring: [
    { requirementId: "SLA-COMPLIANCE-001-R1", passWeight: 20, failPenalty: -25 },
    { requirementId: "SLA-COMPLIANCE-001-R2", passWeight: 18, failPenalty: -25 },
    { requirementId: "SLA-COMPLIANCE-001-R3", passWeight: 20, failPenalty: -25 },
    { requirementId: "SLA-COMPLIANCE-001-R4", passWeight: 16, failPenalty: -20 },
    { requirementId: "SLA-COMPLIANCE-001-R5", passWeight: 12, failPenalty: -10 },
    { requirementId: "SLA-COMPLIANCE-001-R6", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 8,
};

/* ------------------------------------------------------------------ */
/*  RUNBOOK-EXECUTION-001 — Runbook Execution                          */
/* ------------------------------------------------------------------ */

const runbookExecution001: Standard = {
  id: "RUNBOOK-EXECUTION-001",
  version: "1.0.0",
  domain: "devops",
  name: "Runbook Execution",
  description:
    "Governs step verification, rollback procedures, and human approval gates when an agent executes operational runbooks.",
  requirements: [
    {
      id: "RUNBOOK-EXECUTION-001-R1",
      text: "Agent must verify each runbook step's preconditions before execution and halt on any unmet prerequisite.",
      severity: "must",
      category: "step-verification",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R2",
      text: "Agent must record a checkpoint after each step to enable deterministic rollback to the last known-good state.",
      severity: "must",
      category: "rollback",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R3",
      text: "Agent must require explicit human approval before executing any step tagged as destructive or irreversible.",
      severity: "must",
      category: "approval-gates",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R4",
      text: "Agent must automatically initiate rollback when a step's post-condition validation fails.",
      severity: "must",
      category: "rollback",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R5",
      text: "Agent should estimate execution time for each remaining step and surface total expected duration.",
      severity: "should",
      category: "step-verification",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R6",
      text: "Agent should provide a dry-run mode that simulates all steps without making changes.",
      severity: "should",
      category: "step-verification",
    },
    {
      id: "RUNBOOK-EXECUTION-001-R7",
      text: "Agent may integrate with change management systems (e.g., ServiceNow, Jira) to auto-create change requests.",
      severity: "may",
      category: "approval-gates",
    },
  ],
  scoring: [
    { requirementId: "RUNBOOK-EXECUTION-001-R1", passWeight: 18, failPenalty: -25 },
    { requirementId: "RUNBOOK-EXECUTION-001-R2", passWeight: 16, failPenalty: -25 },
    { requirementId: "RUNBOOK-EXECUTION-001-R3", passWeight: 18, failPenalty: -30 },
    { requirementId: "RUNBOOK-EXECUTION-001-R4", passWeight: 16, failPenalty: -25 },
    { requirementId: "RUNBOOK-EXECUTION-001-R5", passWeight: 10, failPenalty: -10 },
    { requirementId: "RUNBOOK-EXECUTION-001-R6", passWeight: 10, failPenalty: -10 },
    { requirementId: "RUNBOOK-EXECUTION-001-R7", passWeight: 5, failPenalty: -5 },
  ],
  kataCount: 10,
};

/* ------------------------------------------------------------------ */
/*  Domain Pack                                                        */
/* ------------------------------------------------------------------ */

const standards = [incidentResponse001, slaCompliance001, runbookExecution001];

export const devopsPack: DomainPack = {
  domain: "devops",
  name: "DevOps / SRE",
  description:
    "Standards for incident response, SLA compliance, and runbook execution in DevOps and site-reliability engineering agents.",
  emoji: "\u{1F6E0}\uFE0F",
  standards,
  totalRequirements: standards.reduce(
    (sum, s) => sum + s.requirements.length,
    0,
  ),
  certificationThreshold: 85,
};
