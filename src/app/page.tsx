import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Lock,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import HeroInput from "@/components/hero-input";
import SignInButton from "@/components/auth/SignInButton";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Build", href: "#build" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Train", href: "#train" },
  { label: "Certify", href: "#certify" },
  { label: "Courses", href: "#courses" },
];

const STEPS = [
  {
    step: "01",
    title: "Import or Build",
    description:
      "Bring agents from CrewAI, LangChain, OpenClaw, or GPT Store — or build from domain-specific templates with standards baked in.",
  },
  {
    step: "02",
    title: "Train & Certify",
    description:
      "Run agents through domain-specific training katas. Evaluate against codified standards. Certify with Outcome Guarantee Contracts.",
  },
  {
    step: "03",
    title: "Deploy & Monitor",
    description:
      "Ship certified agents to any channel. Monitor production behavior. Auto-retrain when drift is detected.",
  },
];

const DOMAINS = [
  {
    emoji: "\u{1F3E5}",
    title: "Healthcare",
    description:
      "HIPAA-compliant agents for patient intake, scheduling, triage, and care coordination.",
  },
  {
    emoji: "\u{1F4B0}",
    title: "Finance",
    description:
      "Agents for compliance review, fraud workflows, portfolio operations, and reporting.",
  },
  {
    emoji: "\u2696\uFE0F",
    title: "Legal",
    description:
      "Contract review, due diligence, matter intake, and regulatory research agents.",
  },
  {
    emoji: "\u{1F3E0}",
    title: "Real Estate",
    description:
      "Lead qualification, listing operations, property matching, and transaction support.",
  },
  {
    emoji: "\u{1F6E0}\uFE0F",
    title: "DevOps",
    description:
      "Alert triage, incident coordination, runbook execution, and infrastructure assistants.",
  },
  {
    emoji: "\u{1F3A7}",
    title: "Customer Support",
    description:
      "Resolve tickets faster with multi-channel agents that know your product and policies.",
  },
  {
    emoji: "\u{1F4C8}",
    title: "Sales",
    description:
      "Prospecting, qualification, CRM updates, and meeting prep agents for every rep.",
  },
  {
    emoji: "\u{1F52C}",
    title: "Research",
    description:
      "Literature review, synthesis, data extraction, and hypothesis-generation agents.",
  },
  {
    emoji: "\u270D\uFE0F",
    title: "Content",
    description:
      "Editorial planning, SEO briefs, social content, and brand-safe writing assistants.",
  },
  {
    emoji: "\u{1F512}",
    title: "Security",
    description:
      "SOC workflows, vulnerability triage, threat summaries, and policy automation agents.",
  },
];

const STATS = [
  { value: "17", label: "Domain Standards" },
  { value: "5", label: "Industry Packs" },
  { value: "200+", label: "Training Katas" },
  { value: "3", label: "Certification Tiers" },
];

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Beyond Eval",
    description:
      "Eval platforms give you a score. We train, certify, deploy, monitor, and retrain — the full agent lifecycle.",
  },
  {
    icon: ShieldCheck,
    title: "Domain Standards",
    description:
      "Codified best practices for Healthcare, Finance, Legal, Real Estate, and DevOps. Agents are certified against specific requirements.",
  },
  {
    icon: Lock,
    title: "Outcome Guarantees",
    description:
      "Every certified agent comes with quantified performance guarantees backed by statistical evidence from training runs.",
  },
  {
    icon: Users,
    title: "Platform Agnostic",
    description:
      "Import from CrewAI, LangChain, OpenClaw, or GPT Store. Deploy to any channel. Not locked to any ecosystem.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            agents<span className="text-emerald-500">.academy</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </Link>
            ))}
            <SignInButton />
          </div>

          {/* Mobile nav fallback */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="#build"
              className="rounded-xl border border-zinc-800 px-3 py-2 text-sm text-zinc-200"
            >
              Build
            </Link>
            <SignInButton />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ---- Hero ---- */}
        <section id="build" className="relative overflow-hidden scroll-mt-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-24 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_35%)]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pb-28 sm:pt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
              <Bot className="h-4 w-4 text-emerald-500" />
              The certification layer for the agent economy
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Certified, domain-specific AI agents{" "}
              <span className="text-emerald-500">trained to standards</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              agents.academy trains agents against codified domain standards,
              certifies their capabilities with evidence, and deploys them with
              outcome guarantees. From eval to production.
            </p>

            <div className="mt-10">
              <HeroInput />
            </div>
          </div>
        </section>

        {/* ---- How It Works ---- */}
        <section
          id="train"
          className="border-y border-zinc-800 bg-zinc-900/40 scroll-mt-24"
        >
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">
                How It Works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Import. Train. Certify. Deploy.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
                >
                  <p className="text-sm font-medium text-emerald-500">
                    {step.step}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Domain Cards ---- */}
        <section
          id="marketplace"
          className="scroll-mt-24 border-b border-zinc-800"
        >
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">
                Domain Templates
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Agents for every high-value workflow
              </h2>
              <p className="mt-4 text-zinc-400">
                Start from a domain-specific template, then tailor knowledge,
                integrations, and policies to your team.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {DOMAINS.map((domain) => (
                <div
                  key={domain.title}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-emerald-500/40"
                >
                  <div className="text-3xl">{domain.emoji}</div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-50">
                    {domain.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {domain.description}
                  </p>
                  <Link
                    href="#build"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-500 transition-colors hover:text-emerald-400"
                  >
                    Build Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Stats Bar ---- */}
        <section className="border-b border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-semibold text-emerald-500 sm:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Why Section ---- */}
        <section id="certify" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">
                Why agents.academy
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                The trust layer the agent economy is missing
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {VALUE_PROPS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
                >
                  <item.icon className="h-8 w-8 text-emerald-500" />
                  <h3 className="mt-5 text-xl font-semibold text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer
        id="courses"
        className="border-t border-zinc-800 bg-zinc-950 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-zinc-50"
              >
                agents<span className="text-emerald-500">.academy</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Courses and certifications are launching soon for teams building
                trustworthy AI agents in production.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {link.label}
                </Link>
              ))}
              <SignInButton />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} agents.academy</p>
            <p>
              Build, train, certify, and deploy the next generation of agents.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
