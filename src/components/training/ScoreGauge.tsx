"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreGauge({
  score,
  size = 180,
  strokeWidth = 12,
}: ScoreGaugeProps) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number>(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const delta = score - start;
    if (delta === 0) return;

    const duration = 400;
    const t0 = performance.now();

    function animate(now: number) {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(start + delta * eased);
      setDisplayed(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = score;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;

  const color =
    displayed >= 70
      ? "text-emerald-500"
      : displayed >= 40
        ? "text-amber-500"
        : "text-zinc-500";

  const strokeColor =
    displayed >= 70
      ? "stroke-emerald-500"
      : displayed >= 40
        ? "stroke-amber-500"
        : "stroke-zinc-600";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-800"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${strokeColor} transition-colors duration-300`}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold tabular-nums ${color}`}>
          {displayed}
        </span>
        <span className="text-xs text-zinc-500">overall score</span>
      </div>
    </div>
  );
}
