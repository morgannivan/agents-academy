import type { TeamTemplate } from "./types";

// ---------------------------------------------------------------------------
// Pre-built Team Templates
// ---------------------------------------------------------------------------

export const TEAM_TEMPLATES: TeamTemplate[] = [
  /* ------------------------------------------------------------------ */
  /*  Customer Support Team                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "customer-support-team",
    name: "Customer Support Team",
    description:
      "End-to-end support pipeline: triage incoming tickets, route to specialists, escalate edge cases, and run QA on every resolution.",
    domain: "Customer Support",
    members: [
      {
        role: "Triage",
        domain: "Customer Support",
        requiredTier: "bronze",
        suggestedAgentId: "support-sage",
      },
      {
        role: "Specialist",
        domain: "Customer Support",
        requiredTier: "silver",
      },
      {
        role: "Escalation",
        domain: "Customer Support",
        requiredTier: "gold",
      },
      {
        role: "QA",
        domain: "Customer Support",
        requiredTier: "silver",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Research Team                                                       */
  /* ------------------------------------------------------------------ */
  {
    id: "research-team",
    name: "Research Team",
    description:
      "Systematic research workflow: plan the investigation, gather sources, analyse findings, and produce a polished write-up.",
    domain: "Research",
    members: [
      {
        role: "Planner",
        domain: "Research",
        requiredTier: "silver",
      },
      {
        role: "Researcher",
        domain: "Research",
        requiredTier: "silver",
      },
      {
        role: "Analyst",
        domain: "Research",
        requiredTier: "gold",
      },
      {
        role: "Writer",
        domain: "Research",
        requiredTier: "bronze",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  DevOps Team                                                         */
  /* ------------------------------------------------------------------ */
  {
    id: "devops-team",
    name: "DevOps Team",
    description:
      "Incident-response pipeline: monitor infrastructure, respond to alerts, execute runbooks, and review post-incident actions.",
    domain: "DevOps",
    members: [
      {
        role: "Monitor",
        domain: "DevOps",
        requiredTier: "silver",
        suggestedAgentId: "incident-commander",
      },
      {
        role: "Responder",
        domain: "DevOps",
        requiredTier: "gold",
      },
      {
        role: "Executor",
        domain: "DevOps",
        requiredTier: "gold",
      },
      {
        role: "Reviewer",
        domain: "DevOps",
        requiredTier: "silver",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Sales Team                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "sales-team",
    name: "Sales Team",
    description:
      "Full-funnel sales automation: qualify leads, nurture prospects, close deals, and surface pipeline analytics.",
    domain: "Sales",
    members: [
      {
        role: "Qualifier",
        domain: "Sales",
        requiredTier: "bronze",
        suggestedAgentId: "lead-qualifier",
      },
      {
        role: "Nurture",
        domain: "Sales",
        requiredTier: "silver",
      },
      {
        role: "Closer",
        domain: "Sales",
        requiredTier: "gold",
      },
      {
        role: "Analytics",
        domain: "Sales",
        requiredTier: "silver",
      },
    ],
  },
];

/** Look up a single team template by ID. */
export function getTemplateById(id: string): TeamTemplate | undefined {
  return TEAM_TEMPLATES.find((t) => t.id === id);
}
