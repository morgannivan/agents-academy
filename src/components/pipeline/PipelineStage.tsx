"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

export interface PipelineStageProps {
  icon: LucideIcon;
  name: string;
  description: string;
  details: string;
  status: "complete" | "active" | "upcoming";
  highlighted?: boolean;
  callout?: string;
}

const statusColors: Record<PipelineStageProps["status"], string> = {
  complete: "bg-emerald-500",
  active: "bg-amber-500 animate-pulse",
  upcoming: "bg-zinc-600",
};

const statusLabels: Record<PipelineStageProps["status"], string> = {
  complete: "Complete",
  active: "In Progress",
  upcoming: "Upcoming",
};

export default function PipelineStage({
  icon: Icon,
  name,
  description,
  details,
  status,
  highlighted = false,
  callout,
}: PipelineStageProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      className={`flex w-36 shrink-0 flex-col rounded-xl border p-4 text-left transition-all ${
        highlighted
          ? "border-emerald-500/60 bg-emerald-950/30 ring-1 ring-emerald-500/30"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
      }`}
    >
      {/* Status dot */}
      <div className="mb-3 flex items-center justify-between">
        <Icon
          className={`h-5 w-5 ${highlighted ? "text-emerald-400" : "text-zinc-400"}`}
        />
        <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${statusColors[status]}`}
          />
          {statusLabels[status]}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
        {description}
      </p>

      {/* Callout */}
      {callout && (
        <p className="mt-2 rounded bg-amber-950/40 px-2 py-1 text-[10px] font-medium leading-snug text-amber-400">
          {callout}
        </p>
      )}

      {/* Expand toggle */}
      <div className="mt-2 flex items-center gap-1 text-[10px] text-zinc-600">
        <ChevronDown
          className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
        {expanded ? "Collapse" : "Details"}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-2 border-t border-zinc-800 pt-2 text-[11px] leading-relaxed text-zinc-400">
          {details}
        </div>
      )}
    </button>
  );
}
