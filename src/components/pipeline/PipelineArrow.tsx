"use client";

export default function PipelineArrow({
  highlighted = false,
}: {
  highlighted?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center px-1" aria-hidden>
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        className="overflow-visible"
      >
        {/* Animated dashes flowing along the arrow shaft */}
        <line
          x1="0"
          y1="10"
          x2="30"
          y2="10"
          stroke={highlighted ? "#34d399" : "#52525b"}
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-[flow_1.2s_linear_infinite]"
        />
        {/* Arrowhead */}
        <polygon
          points="28,4 40,10 28,16"
          fill={highlighted ? "#34d399" : "#52525b"}
        />
      </svg>
    </div>
  );
}
