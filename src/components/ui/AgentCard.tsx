import { Star } from "lucide-react";
import DomainBadge from "@/components/ui/DomainBadge";

export interface AgentCardProps {
  name: string;
  domain: string;
  rating: number;
  price: string;
}

export default function AgentCard({
  name,
  domain,
  rating,
  price,
}: AgentCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-emerald-500/50">
      {/* Avatar placeholder */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-lg font-bold text-emerald-400">
        {name.charAt(0)}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-zinc-100">{name}</h3>
      <div className="mb-3">
        <DomainBadge domain={domain} />
      </div>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-700"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-zinc-500">{rating.toFixed(1)}</span>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-zinc-100">{price}</span>
        <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400">
          View Agent
        </button>
      </div>
    </div>
  );
}
