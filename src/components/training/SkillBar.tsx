"use client";

import type { SkillScore } from "@/lib/training/types";

interface SkillBarProps {
  skill: SkillScore;
}

export default function SkillBar({ skill }: SkillBarProps) {
  const barColor = skill.passed
    ? "bg-emerald-500"
    : skill.score > 0
      ? "bg-amber-500"
      : "bg-zinc-700";

  const textColor = skill.passed
    ? "text-emerald-400"
    : skill.score > 0
      ? "text-amber-400"
      : "text-zinc-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="truncate text-zinc-300">{skill.skillName}</span>
        <span className={`ml-2 tabular-nums font-medium ${textColor}`}>
          {skill.score}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${skill.score}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-600">
        <span>{skill.attempts} attempts</span>
        {skill.passed && <span className="text-emerald-500">✓ Mastered</span>}
      </div>
    </div>
  );
}
