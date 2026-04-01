import { FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import type { OutcomeGuaranteeContract } from "@/lib/certification/types";
import { CertificationTier } from "@/lib/certification/types";

interface OutcomeGuaranteeCardProps {
  contract: OutcomeGuaranteeContract;
}

export default function OutcomeGuaranteeCard({
  contract,
}: OutcomeGuaranteeCardProps) {
  const validDate = new Date(contract.validUntil).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tierLabel =
    contract.certification === CertificationTier.CERTIFIED
      ? "Certified"
      : "Verified";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
          <FileCheck className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Outcome Guarantee Contract
          </h3>
          <p className="text-sm text-zinc-500">
            {contract.agentName} &middot; {tierLabel}
          </p>
        </div>
      </div>

      {/* Guarantees */}
      <div className="mb-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Performance Guarantees
        </h4>
        <ul className="space-y-2">
          {contract.guarantees.map((g) => (
            <li
              key={g.metric}
              className="flex items-center justify-between rounded-lg bg-zinc-800/60 px-4 py-2.5"
            >
              <span className="text-sm text-zinc-300">{g.metric}</span>
              <span className="text-sm font-semibold text-emerald-400">
                {g.unit === "%" || g.unit === "/ 5"
                  ? `≥ ${g.threshold}${g.unit}`
                  : g.unit === "incidents"
                    ? `${g.threshold} ${g.unit}`
                    : `≤ ${g.threshold} ${g.unit}`}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-zinc-600">
          Based on {contract.guarantees[0]?.basedOnRuns.toLocaleString()} evaluated runs
        </p>
      </div>

      {/* Compliance standards */}
      <div className="mb-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Standards Compliance
        </h4>
        <div className="flex flex-wrap gap-2">
          {contract.standardsCompliance.map((s) => (
            <span
              key={s}
              className="rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: confidence + validity */}
      <div className="flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
        <span>
          Confidence:{" "}
          <strong className="text-zinc-200">
            {(contract.confidence * 100).toFixed(0)}%
          </strong>
        </span>
        <span className="hidden sm:inline text-zinc-700">|</span>
        <span>
          Valid until: <strong className="text-zinc-200">{validDate}</strong>
        </span>
      </div>
    </div>
  );
}
