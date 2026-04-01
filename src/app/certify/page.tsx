import { Check, ShieldCheck, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Community",
    price: "$0",
    description: "Open-source agents with basic validation",
    icon: Check,
    color: "text-zinc-400",
    borderColor: "border-zinc-800",
    features: [
      "Basic functionality tests",
      "Community reviews",
      "Public source code",
      "Standard support",
    ],
  },
  {
    name: "Verified",
    price: "$49",
    description: "Professionally reviewed and performance-tested",
    icon: ShieldCheck,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    highlighted: true,
    features: [
      "Automated benchmark suite",
      "Security audit",
      "Performance guarantees",
      "Priority support",
      "Verified badge",
    ],
  },
  {
    name: "Certified",
    price: "$199",
    description: "Enterprise-grade with compliance and SLA guarantees",
    icon: Award,
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    features: [
      "Full compliance review",
      "SLA guarantees",
      "Dedicated support",
      "Custom benchmarks",
      "Certified badge",
      "Insurance coverage",
    ],
  },
];

export default function CertifyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Agent Certification
          </h1>
          <p className="text-lg text-zinc-400">Coming Soon</p>
        </div>

        {/* Tier Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border bg-zinc-900 p-8 ${tier.borderColor} ${
                  tier.highlighted ? "ring-1 ring-emerald-500/30" : ""
                }`}
              >
                <Icon className={`mb-4 h-8 w-8 ${tier.color}`} />
                <h3 className="mb-1 text-xl font-semibold text-zinc-100">
                  {tier.name}
                </h3>
                <p className="mb-6 text-sm text-zinc-400">{tier.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-zinc-100">
                    {tier.price}
                  </span>
                  {tier.price !== "$0" && (
                    <span className="text-sm text-zinc-500">/agent</span>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  disabled
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-emerald-500 text-zinc-950"
                      : "border border-zinc-700 text-zinc-300"
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
