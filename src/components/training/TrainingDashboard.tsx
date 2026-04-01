"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TrainingSession, TrainingEvent } from "@/lib/training/types";
import {
  createMockSession,
  simulateTraining,
} from "@/lib/training/mock-session";
import DomainBadge from "@/components/ui/DomainBadge";
import ScoreGauge from "./ScoreGauge";
import SkillBar from "./SkillBar";

interface TrainingDashboardProps {
  domain: string;
  agentName?: string;
  running: boolean;
}

export default function TrainingDashboard({
  domain,
  agentName = "Support Agent v1",
  running,
}: TrainingDashboardProps) {
  const [session, setSession] = useState<TrainingSession>(() =>
    createMockSession(domain),
  );
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // ---- simulation lifecycle ----
  const handleEvent = useCallback(
    (event: TrainingEvent, snap: TrainingSession) => {
      // Only show result + skill_improved + training_complete in feed
      if (event.type !== "kata_start") {
        setEvents((prev) => [...prev, event]);
      }
      setSession({ ...snap, scores: snap.scores.map((s) => ({ ...s })) });
    },
    [],
  );

  useEffect(() => {
    if (!running) return;

    const { cancel } = simulateTraining(domain, handleEvent);

    // Elapsed timer
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    return () => {
      cancel();
      clearInterval(timerRef.current);
    };
  }, [running, domain, handleEvent]);

  // Stop timer when training completes
  useEffect(() => {
    if (session.status === "complete") {
      clearInterval(timerRef.current);
    }
  }, [session.status]);

  // Auto-scroll event feed
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [events]);

  // ---- helpers ----
  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const isComplete = session?.status === "complete";

  // Pre-compute confetti positions so Math.random is not called during render
  const confettiDots = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        left: `${(((i * 17 + 7) * 37) % 100)}%`,
        top: `${(((i * 13 + 3) * 41) % 100)}%`,
        backgroundColor: ["#10b981", "#f59e0b", "#6366f1", "#ec4899", "#3b82f6"][
          i % 5
        ],
        opacity: 0.6 + (((i * 31) % 40) / 100),
        animation: `confetti-fall ${1.5 + ((i * 23) % 200) / 100}s ease-in-out ${((i * 19) % 200) / 100}s infinite alternate`,
      })),
    [],
  );

  if (!session) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-zinc-100">{agentName}</h2>
          <DomainBadge domain={domain} />
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <span>
            Katas{" "}
            <strong className="text-zinc-200">
              {session.katasCompleted}/{session.katasTotal}
            </strong>
          </span>
          <span className="tabular-nums font-mono text-zinc-500">
            {formatElapsed(elapsed)}
          </span>
          {isComplete ? (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              Complete
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Running
            </span>
          )}
        </div>
      </div>

      {/* ---- Celebration banner ---- */}
      {isComplete && (
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-5 text-center">
          {/* Confetti-style dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiDots.map((dot, i) => (
              <span
                key={i}
                className="absolute inline-block h-1.5 w-1.5 rounded-full"
                style={dot}
              />
            ))}
          </div>
          <p className="text-2xl font-bold text-emerald-400">
            🎉 Training Complete!
          </p>
          <p className="mt-1 text-sm text-emerald-300/80">
            Final score: <strong>{session.currentScore}%</strong> across{" "}
            {session.scores.length} skills
          </p>
        </div>
      )}

      {/* ---- Score gauge + Skill bars ---- */}
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        {/* Gauge */}
        <div className="flex items-start justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <ScoreGauge score={session.currentScore} />
        </div>

        {/* Skill bars grid */}
        <div className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:grid-cols-2">
          {session.scores.map((skill) => (
            <SkillBar key={skill.skillName} skill={skill} />
          ))}
        </div>
      </div>

      {/* ---- Live event feed ---- */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60">
        <div className="border-b border-zinc-800 px-4 py-2.5">
          <h3 className="text-sm font-medium text-zinc-400">Live Feed</h3>
        </div>
        <div
          ref={feedRef}
          className="h-56 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
        >
          {events.length === 0 && (
            <p className="text-zinc-600">Waiting for events…</p>
          )}
          {events.map((evt, i) => {
            const isPassed = evt.type === "kata_complete";
            const isFailed = evt.type === "kata_failed";
            const isSkill = evt.type === "skill_improved";
            const isDone = evt.type === "training_complete";

            return (
              <div
                key={i}
                className={`py-0.5 ${
                  isDone
                    ? "font-bold text-emerald-400"
                    : isSkill
                      ? "text-amber-400"
                      : isPassed
                        ? "text-emerald-500"
                        : isFailed
                          ? "text-red-500"
                          : "text-zinc-500"
                }`}
              >
                {evt.data.message}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline keyframes for confetti animation */}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(12px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
