import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cog,
  Layers,
  MonitorCheck,
  Package,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KISS Agency — Keep It Simple, Ship It | kissagency.ai",
  description:
    "We build AI agent systems for enterprises. You describe the outcome. We deliver the certified agent.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Bot,
    title: "Custom Agent Development",
    description:
      "Purpose-built AI agents designed for your exact workflows, compliance requirements, and integration landscape.",
  },
  {
    icon: Layers,
    title: "AATS Integration",
    description:
      "Seamless integration with the Agent Academy Training Standard — so every agent you ship is certified and auditable.",
  },
  {
    icon: MonitorCheck,
    title: "Agent DevOps / SRE",
    description:
      "Deployment, monitoring, and operations at scale. We keep your agents running, reliable, and observable 24/7.",
  },
  {
    icon: Package,
    title: "Domain Pack Creation",
    description:
      "We build your industry-specific standards — compliance rules, eval suites, and guardrails packaged for reuse.",
  },
];

const CASE_STUDIES = [
  {
    industry: "Healthcare Provider",
    emoji: "\u{1F3E5}",
    metric: "95%",
    label: "Triage Accuracy",
    description:
      "Deployed a HIPAA-compliant triage agent that routes patient inquiries with 95% accuracy, reducing nurse workload by 40%.",
  },
  {
    industry: "Financial Services Firm",
    emoji: "\u{1F4B0}",
    metric: "99%",
    label: "Numerical Accuracy",
    description:
      "Built a portfolio reporting agent that achieved 99% numerical accuracy across 12 compliance-critical report types.",
  },
  {
    industry: "Real Estate Company",
    emoji: "\u{1F3E0}",
    metric: "3x",
    label: "Lead Qualification",
    description:
      "Tripled qualified lead throughput with an agent that pre-screens, scores, and routes prospects in real time.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ConsultingPage() {
  return (
    <>
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/consulting"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            KISS<span className="text-blue-500"> Agency</span>
          </Link>

          <div className="flex items-center gap-7">
            <Link
              href="#services"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Services
            </Link>
            <Link
              href="#case-studies"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Case Studies
            </Link>
            <Link
              href="#pricing"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              agents.academy
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-24 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_35%)]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pb-28 sm:pt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
              <Cog className="h-4 w-4 text-blue-500" />
              Keep It Simple, Ship It
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              We build AI agent systems for{" "}
              <span className="text-blue-500">enterprises</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              You describe the outcome. We deliver the certified agent —
              compliant, tested, and production-ready on the agents.academy
              platform.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section
          id="services"
          className="scroll-mt-24 border-y border-zinc-800 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
                What We Do
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                End-to-end agent engineering
              </h2>
              <p className="mt-4 text-zinc-400">
                From architecture to production operations, we handle the full
                lifecycle so your team ships faster.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-colors hover:border-blue-500/40"
                >
                  <service.icon className="h-8 w-8 text-blue-500" />
                  <h3 className="mt-5 text-xl font-semibold text-zinc-50">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Case Studies ---- */}
        <section id="case-studies" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
                Results
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Proven outcomes across industries
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.industry}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
                >
                  <div className="text-3xl">{study.emoji}</div>
                  <p className="mt-4 text-sm font-medium text-zinc-500">
                    {study.industry}
                  </p>
                  <div className="mt-3 text-4xl font-semibold text-blue-500">
                    {study.metric}
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    {study.label}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {study.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section
          id="pricing"
          className="scroll-mt-24 border-y border-zinc-800 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              Starting at $150/hr
            </h2>
            <p className="mt-4 text-zinc-400">
              Project-based pricing available for larger engagements. Every
              project includes architecture review, implementation, testing, and
              deployment support.
            </p>

            <a
              href="mailto:hello@kissagency.ai"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-blue-500"
            >
              Book a Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <Link
                href="/consulting"
                className="text-lg font-semibold tracking-tight text-zinc-50"
              >
                KISS<span className="text-blue-500"> Agency</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                kissagency.ai — enterprise AI agent consulting powered by the
                agents.academy platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                agents.academy
              </Link>
              <Link
                href="/speaking"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                I Speak AI
              </Link>
              <Link
                href="/premium"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Secret Agents
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} kissagency.ai</p>
            <p>Keep it simple. Ship it.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
