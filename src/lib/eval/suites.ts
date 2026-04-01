import type { EvalSuite } from "./types";

export const evalSuites: EvalSuite[] = [
  {
    id: "customer-support-basic",
    name: "Customer Support Basic",
    domain: "Customer Support",
    description:
      "Evaluate agent capability in handling common support scenarios including ticket triage, response quality, escalation decisions, and resolution tracking.",
    standards: [
      "OGC-CS-001",
      "OGC-CS-002",
      "OGC-CS-003",
      "OGC-CS-004",
      "OGC-CS-005",
    ],
    kataCount: 20,
    difficulty: "beginner",
  },
  {
    id: "healthcare-compliance",
    name: "Healthcare Compliance",
    domain: "Healthcare",
    description:
      "Rigorous evaluation of HIPAA compliance, patient data handling, clinical terminology accuracy, and regulatory adherence in healthcare agent interactions.",
    standards: [
      "OGC-HC-001",
      "OGC-HC-002",
      "OGC-HC-003",
      "OGC-HC-004",
      "OGC-HC-005",
      "OGC-HC-006",
      "OGC-HC-007",
      "OGC-HC-008",
    ],
    kataCount: 50,
    difficulty: "expert",
  },
  {
    id: "finance-accuracy",
    name: "Finance Accuracy",
    domain: "Finance",
    description:
      "Test numerical precision, regulatory compliance, risk assessment accuracy, and financial reporting standards across common finance agent workflows.",
    standards: [
      "OGC-FIN-001",
      "OGC-FIN-002",
      "OGC-FIN-003",
      "OGC-FIN-004",
      "OGC-FIN-005",
      "OGC-FIN-006",
    ],
    kataCount: 30,
    difficulty: "advanced",
  },
  {
    id: "devops-incident-response",
    name: "DevOps Incident Response",
    domain: "DevOps",
    description:
      "Assess agent performance in incident detection, root cause analysis, runbook execution, communication protocols, and post-mortem generation.",
    standards: [
      "OGC-OPS-001",
      "OGC-OPS-002",
      "OGC-OPS-003",
      "OGC-OPS-004",
      "OGC-OPS-005",
    ],
    kataCount: 25,
    difficulty: "advanced",
  },
  {
    id: "general-capability",
    name: "General Capability",
    domain: "General",
    description:
      "Broad assessment of core agent competencies: reasoning, instruction following, tool use, context management, and output quality across diverse tasks.",
    standards: [
      "OGC-GEN-001",
      "OGC-GEN-002",
      "OGC-GEN-003",
      "OGC-GEN-004",
      "OGC-GEN-005",
      "OGC-GEN-006",
      "OGC-GEN-007",
    ],
    kataCount: 40,
    difficulty: "intermediate",
  },
];
