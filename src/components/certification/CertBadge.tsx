import { Award, Check, ShieldCheck } from "lucide-react";
import { CertificationTier } from "@/lib/certification/types";

const TIER_STYLES: Record<
  CertificationTier,
  {
    label: string;
    ring: string;
    bg: string;
    text: string;
    accent: string;
    Icon: typeof Award;
  }
> = {
  [CertificationTier.COMMUNITY]: {
    label: "Community",
    ring: "ring-orange-700/60",
    bg: "bg-gradient-to-br from-orange-950 to-orange-900/60",
    text: "text-orange-300",
    accent: "text-orange-400",
    Icon: Check,
  },
  [CertificationTier.VERIFIED]: {
    label: "Verified",
    ring: "ring-zinc-400/60",
    bg: "bg-gradient-to-br from-zinc-800 to-zinc-700/60",
    text: "text-zinc-200",
    accent: "text-zinc-300",
    Icon: ShieldCheck,
  },
  [CertificationTier.CERTIFIED]: {
    label: "Certified",
    ring: "ring-amber-400/60",
    bg: "bg-gradient-to-br from-amber-950 to-amber-800/60",
    text: "text-amber-200",
    accent: "text-amber-400",
    Icon: Award,
  },
};

interface CertBadgeProps {
  tier: CertificationTier;
  score: number;
  domain: string;
}

export default function CertBadge({ tier, score, domain }: CertBadgeProps) {
  const style = TIER_STYLES[tier];
  const { Icon } = style;

  return (
    <div
      className={`relative flex flex-col items-center gap-3 rounded-2xl p-8 ring-2 ${style.ring} ${style.bg}`}
    >
      {/* Decorative corner accents */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-current opacity-30" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-current opacity-30" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-current opacity-30" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-current opacity-30" />

      {/* Icon circle */}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ring-2 ${style.ring} bg-zinc-950/40`}
      >
        <Icon className={`h-8 w-8 ${style.accent}`} />
      </div>

      {/* Title */}
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        agents.academy
      </p>
      <h3 className={`text-2xl font-bold tracking-tight ${style.text}`}>
        {style.label}
      </h3>

      {/* Score */}
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl font-extrabold tabular-nums ${style.accent}`}>
          {score}
        </span>
        <span className="text-sm text-zinc-500">/ 100</span>
      </div>

      {/* Domain */}
      <span className="rounded-full bg-zinc-900/60 px-3 py-1 text-xs font-medium capitalize text-zinc-400">
        {domain}
      </span>
    </div>
  );
}
