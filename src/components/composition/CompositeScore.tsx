"use client";

import { ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface AgentScore {
  name: string;
  score: number;
}

interface CompositeScoreProps {
  agents: AgentScore[];
  teamName: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tierFromScore(score: number) {
  if (score >= 95) return { label: "Platinum", color: "text-emerald-400" };
  if (score >= 85) return { label: "Gold", color: "text-amber-400" };
  if (score >= 70) return { label: "Silver", color: "text-zinc-300" };
  return { label: "Bronze", color: "text-orange-400" };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CompositeScore({
  agents,
  teamName,
}: CompositeScoreProps) {
  const validAgents = agents.filter((a) => a.score > 0);
  const composite =
    validAgents.length > 0
      ? validAgents.reduce((sum, a) => sum + a.score, 0) / validAgents.length
      : 0;
  const tier = tierFromScore(composite);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950/50 ring-2 ring-emerald-500/40">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Team Composite Score
          </p>
          <p className="text-sm font-semibold text-zinc-200">{teamName}</p>
        </div>
      </div>

      {/* Big number */}
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold tabular-nums text-emerald-400">
          {composite > 0 ? composite.toFixed(1) : "—"}
        </span>
        <span className="text-sm text-zinc-500">/ 100</span>
        <span
          className={`ml-2 text-xs font-bold uppercase tracking-wider ${tier.color}`}
        >
          {composite > 0 ? tier.label : "—"}
        </span>
      </div>

      {/* Individual agent scores */}
      {validAgents.length > 0 && (
        <div className="mt-5 space-y-2">
          {validAgents.map((a) => {
            const pct = Math.min(a.score, 100);
            return (
              <div key={a.name} className="flex items-center gap-3">
                <span className="w-28 truncate text-xs text-zinc-400">
                  {a.name}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs tabular-nums text-zinc-400">
                  {a.score.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
