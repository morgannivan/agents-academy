import type { TrainingSession, TrainingEvent } from "./types";

const DOMAIN_SKILLS: Record<string, string[]> = {
  "Customer Support": [
    "Greeting & Rapport",
    "Issue Identification",
    "Error Handling",
    "Escalation Protocol",
    "Resolution & Follow-up",
    "Tone & Empathy",
  ],
  Healthcare: [
    "Triage Assessment",
    "HIPAA Compliance",
    "Symptom Analysis",
    "Referral Routing",
    "Patient Communication",
    "Documentation",
  ],
  Finance: [
    "Risk Assessment",
    "Regulatory Compliance",
    "Transaction Validation",
    "Fraud Detection",
    "Client Advisory",
    "Reporting",
  ],
};

const KATA_NAMES: Record<string, string[]> = {
  "Customer Support": [
    "Handle angry customer refund request",
    "Route billing dispute to correct team",
    "Respond to shipping delay inquiry",
    "Process account cancellation",
    "Upsell premium support plan",
    "Resolve password reset issue",
    "Handle multi-language support request",
    "Manage escalation to supervisor",
    "Close ticket with satisfaction survey",
    "Detect and prevent social engineering",
    "Handle concurrent chat sessions",
    "Process warranty claim",
    "Manage SLA breach notification",
    "Transfer context between channels",
    "Handle out-of-scope request gracefully",
  ],
};

function getKataNames(domain: string): string[] {
  return KATA_NAMES[domain] ?? KATA_NAMES["Customer Support"]!;
}

export function createMockSession(domain: string): TrainingSession {
  const skills = (DOMAIN_SKILLS[domain] ?? DOMAIN_SKILLS["Customer Support"]!);
  return {
    id: `train_${Date.now()}`,
    agentId: "agent_cs_001",
    agentName: "Support Agent v1",
    domain,
    status: "running",
    startedAt: Date.now(),
    katasCompleted: 0,
    katasTotal: 50,
    currentScore: 0,
    scores: skills.map((name) => ({
      skillName: name,
      score: 0,
      passed: false,
      attempts: 0,
    })),
  };
}

export type TrainingCallback = (
  event: TrainingEvent,
  session: TrainingSession,
) => void;

/**
 * Simulate a training run. Calls `onEvent` at roughly `intervalMs` intervals.
 * Returns a cancel function.
 */
export function simulateTraining(
  domain: string,
  onEvent: TrainingCallback,
  intervalMs = 600,
): { session: TrainingSession; cancel: () => void } {
  const session = createMockSession(domain);
  const kataNames = getKataNames(domain);
  let kataIndex = 0;
  let cancelled = false;
  let timerId: ReturnType<typeof setTimeout>;

  function tick() {
    if (cancelled || kataIndex >= session.katasTotal) return;

    const kataName = kataNames[kataIndex % kataNames.length]!;
    const skill =
      session.scores[kataIndex % session.scores.length]!;

    // Emit kata_start
    onEvent(
      {
        type: "kata_start",
        timestamp: Date.now(),
        data: {
          kataIndex: kataIndex + 1,
          kataName,
          skillName: skill.skillName,
        },
      },
      { ...session },
    );

    // Determine outcome — 80 % pass rate, rising with score
    const passChance = 0.75 + skill.score * 0.0025;
    const passed = Math.random() < passChance;
    const pointsGained = passed ? Math.floor(Math.random() * 5) + 1 : 0;

    skill.attempts += 1;
    if (passed) {
      skill.score = Math.min(100, skill.score + pointsGained);
      skill.passed = skill.score >= 70;
    }

    kataIndex += 1;
    session.katasCompleted = kataIndex;
    session.currentScore = Math.round(
      session.scores.reduce((a, s) => a + s.score, 0) / session.scores.length,
    );

    // Emit kata result
    const resultEvent: TrainingEvent = {
      type: passed ? "kata_complete" : "kata_failed",
      timestamp: Date.now(),
      data: {
        kataIndex,
        kataName,
        skillName: skill.skillName,
        score: skill.score,
        pointsGained,
        passed,
        message: passed
          ? `Kata ${kataIndex}/${session.katasTotal}: ${kataName}… PASSED +${pointsGained} points`
          : `Kata ${kataIndex}/${session.katasTotal}: ${kataName}… FAILED`,
      },
    };
    onEvent(resultEvent, { ...session });

    // Occasionally emit skill_improved
    if (passed && skill.score >= 70 && skill.score - pointsGained < 70) {
      onEvent(
        {
          type: "skill_improved",
          timestamp: Date.now(),
          data: {
            skillName: skill.skillName,
            score: skill.score,
            message: `🎯 ${skill.skillName} reached mastery (${skill.score}%)`,
          },
        },
        { ...session },
      );
    }

    // Check completion
    if (kataIndex >= session.katasTotal) {
      session.status = "complete";
      onEvent(
        {
          type: "training_complete",
          timestamp: Date.now(),
          data: {
            message: `Training complete! Final score: ${session.currentScore}%`,
          },
        },
        { ...session },
      );
      return;
    }

    timerId = setTimeout(tick, intervalMs + Math.random() * 200);
  }

  timerId = setTimeout(tick, intervalMs);

  return {
    session,
    cancel: () => {
      cancelled = true;
      clearTimeout(timerId);
    },
  };
}
