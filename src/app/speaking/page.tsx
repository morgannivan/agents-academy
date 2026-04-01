import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Mail,
  Mic,
  Newspaper,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "I Speak AI — Nivan Morgan | ispeakai.com",
  description:
    "Nivan Morgan — Where Infrastructure Meets Intelligence. Speaking, thought leadership, and insights on AI agents, DevOps, and the agent economy.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TOPICS = [
  {
    title: "The Trust Gap in AI Agents",
    description:
      "Why enterprises hesitate to deploy agents — and the certification, eval, and observability practices that close the gap.",
  },
  {
    title: "DevOps for the Agent Economy",
    description:
      "Applying SRE principles to agent systems: deployment pipelines, rollback strategies, and production monitoring.",
  },
  {
    title: "From Eval to Production: The Full Agent Lifecycle",
    description:
      "Beyond benchmarks — how to take an agent from passing evals to handling real traffic with confidence.",
  },
  {
    title: "Building Domain-Specific Agent Standards",
    description:
      "Creating compliance frameworks, eval suites, and guardrails tailored to regulated industries.",
  },
];

const ENGAGEMENTS = [
  {
    event: "AI Infrastructure Summit 2026",
    topic: "DevOps for the Agent Economy",
    type: "Keynote",
  },
  {
    event: "Enterprise AI Conference",
    topic: "The Trust Gap in AI Agents",
    type: "Main Stage",
  },
  {
    event: "AgentCon Global",
    topic: "From Eval to Production",
    type: "Workshop",
  },
];

const BLOG_POSTS = [
  {
    title: "Why Every Agent Marketplace is a Shelf",
    description:
      "Listing agents isn't enough. Without training, certification, and ops, marketplaces are just catalogs.",
  },
  {
    title: "Eval is Not Enough",
    description:
      "Passing benchmarks doesn't mean production-ready. What actually matters after the eval score.",
  },
  {
    title: "The 5-Layer Moat",
    description:
      "Standards, training data, eval infrastructure, certified operators, and distribution — the real defensibility stack.",
  },
  {
    title: "CrewAI vs LangChain vs AATS",
    description:
      "A practitioner's comparison of agent frameworks and why standards matter more than syntax.",
  },
  {
    title: "The Agent Economy Needs a School Not a Store",
    description:
      "Why education, certification, and skill development will define the next wave of AI adoption.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SpeakingPage() {
  return (
    <>
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/speaking"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            I Speak<span className="text-violet-500"> AI</span>
          </Link>

          <div className="flex items-center gap-7">
            <Link
              href="#topics"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Topics
            </Link>
            <Link
              href="#blog"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Blog
            </Link>
            <Link
              href="#newsletter"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:inline"
            >
              Newsletter
            </Link>
            <Link
              href="/"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              agents.academy
            </Link>
            <Link
              href="/consulting"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              kissagency.ai
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-24 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_35%)]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pb-28 sm:pt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
              <Mic className="h-4 w-4 text-violet-500" />
              ispeakai.com
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Nivan Morgan — Where Infrastructure Meets{" "}
              <span className="text-violet-500">Intelligence</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Speaker, builder, and advisor on AI agent systems, DevOps for the
              agent economy, and production-grade AI infrastructure.
            </p>
          </div>
        </section>

        {/* ---- Bio ---- */}
        <section className="border-y border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
              {/* Photo placeholder */}
              <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900">
                <User className="h-20 w-20 text-violet-500/40" />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-500">
                  About
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                  Nivan Morgan
                </h2>
                <p className="mt-4 text-base leading-8 text-zinc-400">
                  Founder of agents.academy and KISS Agency. I&apos;ve spent
                  over a decade at the intersection of infrastructure and AI —
                  building the systems that let enterprises trust, deploy, and
                  operate intelligent agents at scale.
                </p>
                <p className="mt-4 text-base leading-8 text-zinc-400">
                  I created the Agent Academy Training Standard (AATS) because I
                  believe the agent economy needs schools, not stores. My work
                  focuses on bridging the gap between what AI agents can do and
                  what production environments demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Topics ---- */}
        <section id="topics" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-500">
                Speaking Topics
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Topics I speak about
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-colors hover:border-violet-500/40"
                >
                  <Mic className="h-6 w-6 text-violet-500" />
                  <h3 className="mt-4 text-xl font-semibold text-zinc-50">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Speaking Engagements ---- */}
        <section className="border-y border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-500">
                On Stage
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Speaking engagements
              </h2>
            </div>

            <div className="mt-14 space-y-4">
              {ENGAGEMENTS.map((engagement) => (
                <div
                  key={engagement.event}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {engagement.event}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {engagement.topic}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                    {engagement.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Blog ---- */}
        <section id="blog" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-500">
                Writing
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-50 sm:text-4xl">
                Latest posts
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.title}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-colors hover:border-violet-500/40"
                >
                  <BookOpen className="h-5 w-5 text-violet-500" />
                  <h3 className="mt-4 text-lg font-semibold text-zinc-50">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {post.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-500">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Newsletter ---- */}
        <section
          id="newsletter"
          className="scroll-mt-24 border-y border-zinc-800 bg-zinc-900/40"
        >
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-violet-500" />
            <h2 className="mt-6 text-3xl font-semibold text-zinc-50 sm:text-4xl">
              Stay in the loop
            </h2>
            <p className="mt-4 text-zinc-400">
              Weekly insights on AI agents, infrastructure, and the agent
              economy. No spam, unsubscribe anytime.
            </p>

            <form className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none ring-violet-500 focus:ring-2 sm:max-w-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
              >
                <Mail className="h-4 w-4" />
                Subscribe
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
                href="/speaking"
                className="text-lg font-semibold tracking-tight text-zinc-50"
              >
                I Speak<span className="text-violet-500"> AI</span>
              </Link>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                ispeakai.com — Nivan Morgan on AI agents, infrastructure, and
                the agent economy.
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
                href="/premium"
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Secret Agents
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} ispeakai.com</p>
            <p>Where infrastructure meets intelligence.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
