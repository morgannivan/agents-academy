import { Activity, Target, TrendingUp, Trophy } from "lucide-react";
import type { AgentStats as AgentStatsType } from "@/lib/agents/types";

const CELLS = [
  {
    key: "totalTrainingRuns" as const,
    label: "Training Runs",
    icon: Activity,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "katasCompleted" as const,
    label: "Katas Completed",
    icon: Target,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "averageScore" as const,
    label: "Avg Score",
    icon: TrendingUp,
    format: (v: number) => `${v.toFixed(1)}%`,
  },
  {
    key: "rankInDomain" as const,
    label: "Domain Rank",
    icon: Trophy,
    format: (v: number) => `#${v}`,
  },
];

export default function AgentStats({ stats }: { stats: AgentStatsType }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {CELLS.map(({ key, label, icon: Icon, format }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <Icon className="mb-2 h-5 w-5 text-emerald-400" />
          <span className="text-2xl font-bold text-zinc-100">
            {format(stats[key])}
          </span>
          <span className="text-xs text-zinc-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
