export interface SkillScore {
  skillName: string;
  score: number; // 0-100
  passed: boolean;
  attempts: number;
}

export interface TrainingSession {
  id: string;
  agentId: string;
  agentName: string;
  domain: string;
  status: "running" | "complete" | "failed";
  startedAt: number;
  katasCompleted: number;
  katasTotal: number;
  currentScore: number;
  scores: SkillScore[];
}

export type TrainingEventType =
  | "kata_start"
  | "kata_complete"
  | "kata_failed"
  | "skill_improved"
  | "training_complete";

export interface TrainingEvent {
  type: TrainingEventType;
  timestamp: number;
  data: {
    kataIndex?: number;
    kataName?: string;
    skillName?: string;
    score?: number;
    pointsGained?: number;
    passed?: boolean;
    message?: string;
  };
}
