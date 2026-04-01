import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Framework data                                                     */
/* ------------------------------------------------------------------ */

interface Framework {
  slug: string;
  emoji: string;
  name: string;
  description: string;
  agentsOnPlatform: number;
  hasDeepPage: boolean;
}

const FRAMEWORKS: Framework[] = [
  {
    slug: "crewai",
    emoji: "⛵",
    name: "CrewAI",
    description:
      "Import multi-agent crews with roles, goals, backstories, and task pipelines. Map CrewAI YAML directly to AATS teams.",
    agentsOnPlatform: 1_243,
    hasDeepPage: true,
  },
  {
    slug: "langchain",
    emoji: "🦜",
    name: "LangChain / LangGraph",
    description:
      "Bring in LangChain agents, chains, and LangGraph state machines. Convert tools, memory, and prompts to AATS configs.",
    agentsOnPlatform: 2_871,
    hasDeepPage: true,
  },
  {
    slug: "openclaw",
    emoji: "🦞",
    name: "OpenClaw",
    description:
      "Import skills from Claw Hub via SKILL.md. Parse soul.md system prompts, tools, and metadata — then add the trust layer.",
    agentsOnPlatform: 487,
    hasDeepPage: true,
  },
  {
    slug: "autogen",
    emoji: "🤖",
    name: "AutoGen",
    description:
      "Import Microsoft AutoGen multi-agent conversations. Map UserProxy and Assistant agents to AATS certified agents.",
    agentsOnPlatform: 634,
    hasDeepPage: false,
  },
  {
    slug: "openai-gpts",
    emoji: "💎",
    name: "OpenAI GPTs",
    description:
      "Pull GPT configurations from the GPT Store. Convert instructions, knowledge files, and actions into trainable agents.",
    agentsOnPlatform: 3_412,
    hasDeepPage: false,
  },
  {
    slug: "google-adk",
    emoji: "🔷",
    name: "Google ADK",
    description:
      "Import agents built with Google's Agent Development Kit. Map Gemini configs, extensions, and grounding to AATS.",
    agentsOnPlatform: 218,
    hasDeepPage: false,
  },
  {
    slug: "custom-http",
    emoji: "🔌",
    name: "Custom HTTP",
    description:
      "Connect any agent via a standard HTTP endpoint. Send your agent config JSON and we handle the rest.",
    agentsOnPlatform: 956,
    hasDeepPage: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
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
        <div className="mb-14 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">
            Integrations
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Connect Any Agent Framework
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Import agents from the frameworks you already use. We map concepts,
            convert configs, and add the training + certification layer.
          </p>
        </div>

        {/* Framework Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORKS.map((fw) => {
            const cardClass =
              "group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-emerald-500/50";

            const cardBody = (
              <>
                {/* Logo + Name */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-2xl">
                    {fw.emoji}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-100">
                      {fw.name}
                    </h2>
                    <p className="text-xs text-zinc-500">
                      {fw.agentsOnPlatform.toLocaleString()} agents on platform
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 flex-1 text-sm leading-6 text-zinc-400">
                  {fw.description}
                </p>

                {/* CTA */}
                {fw.hasDeepPage ? (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-emerald-500">
                    Connect
                    <ArrowRight className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400">
                    Coming Soon
                  </span>
                )}
              </>
            );

            return fw.hasDeepPage ? (
              <Link
                key={fw.slug}
                href={`/integrations/${fw.slug}`}
                className={cardClass}
              >
                {cardBody}
              </Link>
            ) : (
              <div key={fw.slug} className={cardClass}>
                {cardBody}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
          <h3 className="text-xl font-semibold text-zinc-100">
            Don&apos;t see your framework?
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-400">
            Use our Custom HTTP integration or{" "}
            <Link
              href="/build/import"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              import directly
            </Link>{" "}
            from any agent config format. We support A2A, MCP, and custom JSON
            schemas.
          </p>
        </div>
      </div>
    </div>
  );
}
