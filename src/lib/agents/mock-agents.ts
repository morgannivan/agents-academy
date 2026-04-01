import type { AgentProfile } from "./types";

/** Six realistic mock agents spanning different industry domains. */
export const MOCK_AGENTS: AgentProfile[] = [
  /* ------------------------------------------------------------------ */
  /*  1 · Healthcare                                                     */
  /* ------------------------------------------------------------------ */
  {
    id: "med-triage-pro",
    name: "MedTriage Pro",
    description:
      "HIPAA-compliant patient triage agent that gathers symptoms, assesses urgency, and routes cases to the appropriate care team in real time.",
    domain: "Healthcare",
    creator: "HealthTech Labs",
    model: "gpt-4o",
    tools: [
      "symptom-checker",
      "ehr-lookup",
      "appointment-scheduler",
      "hipaa-redactor",
    ],
    certifications: [
      { tier: "gold", domain: "Healthcare", score: 94.2, issuedAt: "2025-11-10" },
      { tier: "silver", domain: "Security", score: 87.5, issuedAt: "2025-09-01" },
    ],
    deployments: [
      { channel: "API", status: "live", url: "https://api.agents.academy/med-triage-pro" },
      { channel: "Web Widget", status: "live", url: "https://widget.agents.academy/med-triage-pro" },
    ],
    stats: {
      totalTrainingRuns: 342,
      katasCompleted: 58,
      averageScore: 94.2,
      rankInDomain: 3,
      createdAt: "2025-06-15",
      lastTrained: "2026-03-28",
    },
    agentCard: {
      agent_id: "med-triage-pro",
      name: "MedTriage Pro",
      description:
        "HIPAA-compliant patient triage agent with real-time symptom assessment and care routing.",
      capabilities: [
        "symptom-assessment",
        "urgency-classification",
        "ehr-integration",
        "care-team-routing",
        "hipaa-compliance",
      ],
      certified_by: "agents.academy",
      cert_tier: "gold",
      cert_seal: "https://certs.agents.academy/seals/gold-healthcare.svg",
      cert_issued: "2025-11-10",
      cert_expires: "2026-11-10",
      consistency_score: 0.96,
      url: "https://agents.academy/profile/med-triage-pro",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  2 · Finance                                                        */
  /* ------------------------------------------------------------------ */
  {
    id: "compliance-bot",
    name: "ComplianceBot",
    description:
      "Automated compliance review agent that screens transactions, flags anomalies, and generates audit-ready reports for financial institutions.",
    domain: "Finance",
    creator: "FinGuard AI",
    model: "claude-3.5-sonnet",
    tools: [
      "transaction-screener",
      "aml-checker",
      "report-generator",
      "regulatory-db",
    ],
    certifications: [
      { tier: "platinum", domain: "Finance", score: 97.8, issuedAt: "2025-12-01" },
      { tier: "gold", domain: "Security", score: 93.1, issuedAt: "2025-10-15" },
    ],
    deployments: [
      { channel: "API", status: "live", url: "https://api.agents.academy/compliance-bot" },
      { channel: "Slack", status: "live", url: "https://slack.agents.academy/compliance-bot" },
      { channel: "Web Widget", status: "deploying", url: "https://widget.agents.academy/compliance-bot" },
    ],
    stats: {
      totalTrainingRuns: 521,
      katasCompleted: 74,
      averageScore: 97.8,
      rankInDomain: 1,
      createdAt: "2025-04-20",
      lastTrained: "2026-03-30",
    },
    agentCard: {
      agent_id: "compliance-bot",
      name: "ComplianceBot",
      description:
        "Automated compliance review agent for transaction screening, anomaly detection, and audit reporting.",
      capabilities: [
        "transaction-screening",
        "aml-detection",
        "audit-report-generation",
        "regulatory-lookup",
        "real-time-alerting",
      ],
      certified_by: "agents.academy",
      cert_tier: "platinum",
      cert_seal: "https://certs.agents.academy/seals/platinum-finance.svg",
      cert_issued: "2025-12-01",
      cert_expires: "2026-12-01",
      consistency_score: 0.99,
      url: "https://agents.academy/profile/compliance-bot",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  3 · Real Estate                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: "lead-qualifier",
    name: "LeadQualifier",
    description:
      "Conversational lead qualification agent for real estate teams. Engages prospects, scores intent, and books showings automatically.",
    domain: "Real Estate",
    creator: "PropTech Solutions",
    model: "gpt-4o-mini",
    tools: [
      "lead-scorer",
      "calendar-sync",
      "mls-search",
      "crm-writer",
    ],
    certifications: [
      { tier: "silver", domain: "Real Estate", score: 88.5, issuedAt: "2025-10-05" },
    ],
    deployments: [
      { channel: "Web Widget", status: "live", url: "https://widget.agents.academy/lead-qualifier" },
      { channel: "SMS", status: "live", url: "https://sms.agents.academy/lead-qualifier" },
    ],
    stats: {
      totalTrainingRuns: 189,
      katasCompleted: 32,
      averageScore: 88.5,
      rankInDomain: 7,
      createdAt: "2025-08-01",
      lastTrained: "2026-03-15",
    },
    agentCard: {
      agent_id: "lead-qualifier",
      name: "LeadQualifier",
      description:
        "Conversational lead qualification agent that scores prospects and books showings for real estate teams.",
      capabilities: [
        "lead-scoring",
        "intent-detection",
        "showing-booking",
        "mls-property-search",
        "crm-integration",
      ],
      certified_by: "agents.academy",
      cert_tier: "silver",
      cert_seal: "https://certs.agents.academy/seals/silver-realestate.svg",
      cert_issued: "2025-10-05",
      cert_expires: "2026-10-05",
      consistency_score: 0.91,
      url: "https://agents.academy/profile/lead-qualifier",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  4 · DevOps                                                         */
  /* ------------------------------------------------------------------ */
  {
    id: "incident-commander",
    name: "IncidentCommander",
    description:
      "On-call incident response agent that triages alerts, correlates signals, runs playbooks, and coordinates war rooms across Slack and PagerDuty.",
    domain: "DevOps",
    creator: "SRE Collective",
    model: "claude-3.5-sonnet",
    tools: [
      "pagerduty-api",
      "datadog-query",
      "runbook-executor",
      "slack-thread-manager",
    ],
    certifications: [
      { tier: "gold", domain: "DevOps", score: 92.7, issuedAt: "2025-11-20" },
      { tier: "silver", domain: "Security", score: 86.3, issuedAt: "2025-08-12" },
    ],
    deployments: [
      { channel: "Slack", status: "live", url: "https://slack.agents.academy/incident-commander" },
      { channel: "API", status: "live", url: "https://api.agents.academy/incident-commander" },
    ],
    stats: {
      totalTrainingRuns: 278,
      katasCompleted: 45,
      averageScore: 92.7,
      rankInDomain: 2,
      createdAt: "2025-05-10",
      lastTrained: "2026-03-25",
    },
    agentCard: {
      agent_id: "incident-commander",
      name: "IncidentCommander",
      description:
        "On-call incident response agent for alert triage, signal correlation, and automated playbook execution.",
      capabilities: [
        "alert-triage",
        "signal-correlation",
        "runbook-execution",
        "war-room-coordination",
        "postmortem-drafting",
      ],
      certified_by: "agents.academy",
      cert_tier: "gold",
      cert_seal: "https://certs.agents.academy/seals/gold-devops.svg",
      cert_issued: "2025-11-20",
      cert_expires: "2026-11-20",
      consistency_score: 0.94,
      url: "https://agents.academy/profile/incident-commander",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  5 · Legal                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "contract-analyst",
    name: "ContractAnalyst",
    description:
      "Contract review agent that extracts key clauses, identifies risks, compares against playbooks, and generates redline suggestions.",
    domain: "Legal",
    creator: "LegalMind Inc.",
    model: "gpt-4o",
    tools: [
      "clause-extractor",
      "risk-scorer",
      "playbook-comparator",
      "redline-generator",
    ],
    certifications: [
      { tier: "gold", domain: "Legal", score: 91.4, issuedAt: "2025-10-28" },
    ],
    deployments: [
      { channel: "API", status: "live", url: "https://api.agents.academy/contract-analyst" },
      { channel: "Web Widget", status: "offline", url: "https://widget.agents.academy/contract-analyst" },
    ],
    stats: {
      totalTrainingRuns: 210,
      katasCompleted: 39,
      averageScore: 91.4,
      rankInDomain: 4,
      createdAt: "2025-07-22",
      lastTrained: "2026-03-20",
    },
    agentCard: {
      agent_id: "contract-analyst",
      name: "ContractAnalyst",
      description:
        "Contract review agent for clause extraction, risk identification, and automated redline generation.",
      capabilities: [
        "clause-extraction",
        "risk-assessment",
        "playbook-comparison",
        "redline-suggestion",
        "summary-generation",
      ],
      certified_by: "agents.academy",
      cert_tier: "gold",
      cert_seal: "https://certs.agents.academy/seals/gold-legal.svg",
      cert_issued: "2025-10-28",
      cert_expires: "2026-10-28",
      consistency_score: 0.93,
      url: "https://agents.academy/profile/contract-analyst",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  6 · Customer Support                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "support-sage",
    name: "SupportSage",
    description:
      "Multi-channel customer support agent that resolves tickets, escalates edge cases, and learns from resolution history to improve over time.",
    domain: "Customer Support",
    creator: "CX Works",
    model: "gpt-4o-mini",
    tools: [
      "ticket-resolver",
      "knowledge-base-search",
      "escalation-router",
      "sentiment-analyzer",
    ],
    certifications: [
      { tier: "bronze", domain: "Customer Support", score: 82.1, issuedAt: "2026-01-15" },
    ],
    deployments: [
      { channel: "Web Widget", status: "live", url: "https://widget.agents.academy/support-sage" },
      { channel: "Discord", status: "deploying", url: "https://discord.agents.academy/support-sage" },
      { channel: "Telegram", status: "offline", url: "https://telegram.agents.academy/support-sage" },
    ],
    stats: {
      totalTrainingRuns: 134,
      katasCompleted: 21,
      averageScore: 82.1,
      rankInDomain: 12,
      createdAt: "2025-11-03",
      lastTrained: "2026-03-10",
    },
    agentCard: {
      agent_id: "support-sage",
      name: "SupportSage",
      description:
        "Multi-channel customer support agent with ticket resolution, escalation routing, and continuous learning.",
      capabilities: [
        "ticket-resolution",
        "knowledge-base-search",
        "escalation-routing",
        "sentiment-analysis",
        "resolution-learning",
      ],
      certified_by: "agents.academy",
      cert_tier: "bronze",
      cert_seal: "https://certs.agents.academy/seals/bronze-support.svg",
      cert_issued: "2026-01-15",
      cert_expires: "2027-01-15",
      consistency_score: 0.85,
      url: "https://agents.academy/profile/support-sage",
    },
  },
];

/** Look up a single agent by ID. */
export function getAgentById(id: string): AgentProfile | undefined {
  return MOCK_AGENTS.find((a) => a.id === id);
}
