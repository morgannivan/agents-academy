"use client";

import type { ConnectionType } from "@/lib/composition/types";

// ---------------------------------------------------------------------------
// Connection style map
// ---------------------------------------------------------------------------

const TYPE_STYLES: Record<ConnectionType, { stroke: string; dash?: string }> = {
  delegates_to: { stroke: "#10b981" },           // emerald-500
  reports_to: { stroke: "#34d399", dash: "6 3" }, // emerald-400 dashed
  collaborates_with: { stroke: "#6ee7b7", dash: "3 3" }, // emerald-300 dotted
};

const LABEL_MAP: Record<ConnectionType, string> = {
  delegates_to: "delegates to",
  reports_to: "reports to",
  collaborates_with: "collaborates",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface TeamConnectionProps {
  /** Starting x,y (centre of source node). */
  x1: number;
  y1: number;
  /** Ending x,y (centre of target node). */
  x2: number;
  y2: number;
  /** Relationship type. */
  type: ConnectionType;
  /** Optional label override. */
  label?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamConnection({
  x1,
  y1,
  x2,
  y2,
  type,
  label,
}: TeamConnectionProps) {
  const style = TYPE_STYLES[type];
  const mid = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };

  // Arrowhead angle
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 10;
  const ax = x2 - headLen * Math.cos(angle - Math.PI / 6);
  const ay = y2 - headLen * Math.sin(angle - Math.PI / 6);
  const bx = x2 - headLen * Math.cos(angle + Math.PI / 6);
  const by = y2 - headLen * Math.sin(angle + Math.PI / 6);

  return (
    <g>
      {/* Line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={style.stroke}
        strokeWidth={2}
        strokeDasharray={style.dash}
        strokeOpacity={0.7}
      />

      {/* Arrowhead */}
      <polygon
        points={`${x2},${y2} ${ax},${ay} ${bx},${by}`}
        fill={style.stroke}
        fillOpacity={0.8}
      />

      {/* Label */}
      <text
        x={mid.x}
        y={mid.y - 8}
        textAnchor="middle"
        className="fill-zinc-500 text-[10px]"
      >
        {label ?? LABEL_MAP[type]}
      </text>
    </g>
  );
}
