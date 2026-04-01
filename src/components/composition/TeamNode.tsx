"use client";

import { Bot, Plus } from "lucide-react";

// ---------------------------------------------------------------------------
// Tier badge colours
// ---------------------------------------------------------------------------

const TIER_COLORS: Record<string, { ring: string; text: string }> = {
  bronze: { ring: "ring-orange-700/60", text: "text-orange-400" },
  silver: { ring: "ring-zinc-400/60", text: "text-zinc-300" },
  gold: { ring: "ring-amber-400/60", text: "text-amber-400" },
  platinum: { ring: "ring-emerald-400/60", text: "text-emerald-400" },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface TeamNodeProps {
  /** Display name of the agent (empty = unfilled slot). */
  name?: string;
  /** Role label shown beneath the name. */
  role: string;
  /** Certification tier badge. */
  certTier?: "bronze" | "silver" | "gold" | "platinum";
  /** Agent score (0-100). */
  score?: number;
  /** Called when the user clicks an empty slot to add an agent. */
  onAdd?: () => void;
  /** Whether this node is currently selected. */
  selected?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamNode({
  name,
  role,
  certTier,
  score,
  onAdd,
  selected = false,
}: TeamNodeProps) {
  const filled = Boolean(name);
  const tier = certTier ? TIER_COLORS[certTier] : null;

  return (
    <button
      type="button"
      onClick={filled ? undefined : onAdd}
      className={`group relative flex w-44 flex-col items-center gap-2 rounded-2xl border p-5 transition-all ${
        selected
          ? "border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-500/10"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
      } ${!filled ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Avatar circle */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ring-2 ${
          tier ? `${tier.ring} bg-zinc-950/40` : "ring-zinc-700 bg-zinc-950/40"
        }`}
      >
        {filled ? (
          <Bot className="h-6 w-6 text-emerald-400" />
        ) : (
          <Plus className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-emerald-400" />
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-zinc-100 truncate max-w-full">
        {name ?? "Add Agent"}
      </p>

      {/* Role tag */}
      <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
        {role}
      </span>

      {/* Cert badge + score */}
      {filled && certTier && (
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              tier?.text ?? "text-zinc-500"
            }`}
          >
            {certTier}
          </span>
          {score !== undefined && (
            <span className="text-xs tabular-nums text-zinc-400">
              {score.toFixed(1)}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
