import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  recommended: boolean;
}

const TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started building agents with no commitment.",
    features: [
      "5 katas per day",
      "1 agent deployment",
      "Community certification",
      "Community support",
      "Basic templates",
    ],
    cta: "Get Started Free",
    recommended: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For individuals and small teams shipping real agents.",
    features: [
      "Unlimited katas",
      "5 agent deployments",
      "Verified certification",
      "Pro models (GPT-4o, Claude Sonnet, Gemini Pro)",
      "Priority support",
      "Advanced templates",
      "Custom domain badges",
    ],
    cta: "Start Pro Trial",
    recommended: true,
  },
  {
    name: "Certified",
    price: "$99",
    period: "/mo",
    description: "For teams that need compliance and governance.",
    features: [
      "Everything in Pro",
      "Certified tier certification",
      "All models (including Opus, GPT-o3)",
      "Domain training packs",
      "Open Governance Compact (OGC)",
      "Audit trails & compliance reports",
      "SSO & team management",
      "Dedicated onboarding",
    ],
    cta: "Start Certified Trial",
    recommended: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with custom requirements at scale.",
    features: [
      "Everything in Certified",
      "Custom compliance standards",
      "Dedicated support & SLA",
      "Custom model fine-tuning",
      "On-premise deployment option",
      "Volume discounts",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    recommended: false,
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Upgrade or downgrade anytime — changes take effect at the start of your next billing cycle. No lock-in.",
  },
  {
    q: "What counts as a kata?",
    a: "A kata is a single training exercise or evaluation run for your agent. Building, deploying, and using agents in production does not consume katas.",
  },
  {
    q: "What is the Open Governance Compact?",
    a: "The OGC is our transparency framework that documents how certified agents handle data, bias, incidents, and security — giving you auditable proof of compliance.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual plans get 2 months free. Contact us or toggle to annual billing in your account settings.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Start free, scale as you grow. Every plan includes the core platform
            — choose the tier that fits your compliance and deployment needs.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mb-24 grid gap-6 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.recommended
                  ? "border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {/* Recommended badge */}
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-zinc-950">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recommended
                  </span>
                </div>
              )}

              <h2 className="text-lg font-semibold text-zinc-100">
                {tier.name}
              </h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-50">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-zinc-500">{tier.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-zinc-300"
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.recommended
                          ? "text-emerald-400"
                          : "text-zinc-600"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-8 w-full rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                  tier.recommended
                    ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                    : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="mb-2 font-semibold text-zinc-100">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
