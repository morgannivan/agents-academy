import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Eye,
  Fingerprint,
  Rocket,
  Shield,
  Star,
  Trophy,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Secret Agents Academy — The Inner Circle",
  description:
    "Premium membership for the agents.academy elite. Early access, priority training, private leaderboards, and direct architecture review.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Rocket,
    title: "Early Access to New Domain Packs",
    description:
      "Be the first to deploy agents built on new industry standards — weeks before public release.",
  },
  {
    icon: Star,
    title: "Priority Training Queue",
    description:
      "Your agents train first. Skip the queue and get faster iteration cycles on every build.",
  },
  {
    icon: Trophy,
    title: "Private Leaderboards",
    description:
      "Compete on exclusive benchmarks. Track your agents against the best in the inner circle.",
  },
  {
    icon: UserCheck,
    title: "Direct Access to Nivan",
    description:
      "Monthly architecture review sessions with Nivan Morgan. Get expert eyes on your agent systems.",
  },
  {
    icon: Eye,
    title: "Beta Features",
    description:
      "Test unreleased platform capabilities before anyone else. Shape the future of agents.academy.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PremiumPage() {
  return (
    <>
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/premium"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            Secret Agents<span className="text-amber-500"> Academy</span>
          </Link>

          <div className="flex items-center gap-7">
            <Link
              href="#benefits"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Benefits
            </Link>
            <Link
              href="#pricing"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Pricing
            </Link>
            <Link
              href="#waitlist"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Waitlist
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
            <div className="absolute left-1/2 top-24 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_35%)]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pb-28 sm:pt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              <Fingerprint className="h-4 w-4" />
              Classified Access Only
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              The{" "}
              <span className="text-amber-500">Inner Circle</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Secret Agents Academy is the premium tier for builders who want
              first-mover advantage. Priority access, exclusive intel, and a
              direct line to mission control.
            </p>

            <div className="mt-10">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-500"
              >
                <Shield className="h-4 w-4" />
                Request Access
              </a>
            </div>
          </div>
        </section>

        {/* ---- Dossier / Benefits ---- */}
        <section
          id="benefits"
          className="scroll-mt-24 border-y border-zinc-800 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Your Dossier
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                What&apos;s inside the briefcase
              </h2>
              <p className="mt-4 text-zinc-400">
                Every membership comes loaded with advantages you won&apos;t
                find on the open platform.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-colors hover:border-amber-500/40"
                >
                  <benefit.icon className="h-8 w-8 text-amber-500" />
                  <h3 className="mt-5 text-xl font-semibold text-zinc-50">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Pricing ---- */}
        <section id="pricing" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Crown className="mx-auto h-10 w-10 text-amber-500" />
            <h2 className="mt-6 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              $199<span className="text-lg text-zinc-500">/mo</span>
            </h2>
            <p className="mt-4 text-zinc-400">
              Cancel anytime. No contracts. Your clearance stays active as long
              as you&apos;re subscribed.
            </p>

            <div className="mt-8 mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Includes
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Early access to all new domain packs
                </li>
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Priority training queue
                </li>
                <li className="flex items-start gap-3">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Private leaderboards &amp; benchmarks
                </li>
                <li className="flex items-start gap-3">
                  <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Monthly architecture review with Nivan
                </li>
                <li className="flex items-start gap-3">
                  <Eye className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  Beta features &amp; unreleased tools
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Waitlist ---- */}
        <section
          id="waitlist"
          className="scroll-mt-24 border-y border-zinc-800 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Fingerprint className="mx-auto h-10 w-10 text-amber-500" />
            <h2 className="mt-6 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              Join the waitlist
            </h2>
            <p className="mt-4 text-zinc-400">
              Spots are limited. Drop your details and we&apos;ll send your
              clearance papers when a slot opens.
            </p>

            <form className="mt-8 mx-auto max-w-md space-y-4">
              <div>
                <label htmlFor="waitlist-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="waitlist-name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none ring-amber-500 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none ring-amber-500 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="waitlist-reason" className="sr-only">
                  Why do you want to join?
                </label>
                <textarea
                  id="waitlist-reason"
                  name="reason"
                  rows={3}
                  placeholder="Tell us about your agent projects (optional)"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none ring-amber-500 focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-500"
              >
                Request Clearance
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <Link
                href="/premium"
                className="text-lg font-semibold tracking-tight text-zinc-50"
              >
                Secret Agents<span className="text-amber-500"> Academy</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                secret-agents.academy — the inner circle of agents.academy.
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
                href="/consulting"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                kissagency.ai
              </Link>
              <Link
                href="/speaking"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                I Speak AI
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} secret-agents.academy</p>
            <p>Your mission, should you choose to accept it.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
