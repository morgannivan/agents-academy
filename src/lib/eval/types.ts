export type EvalStatus = "pending" | "running" | "passed" | "failed" | "error";

export interface EvalScore {
  standardId: string;
  passed: boolean;
  score: number;
  details: string;
}

export interface EvalRun {
  id: string;
  agentId: string;
  suiteId: string;
  status: EvalStatus;
  scores: EvalScore[];
  startedAt: string;
  completedAt: string | null;
}

export type EvalDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface EvalSuite {
  id: string;
  name: string;
  domain: string;
  description: string;
  standards: string[];
  kataCount: number;
  difficulty: EvalDifficulty;
}
