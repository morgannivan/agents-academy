"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardPaste,
  Loader2,
  Users,
} from "lucide-react";
import {
  mapCrewAIToAATS,
  CREWAI_TO_AATS_MAP,
  type AATSTeamConfig,
} from "@/lib/integrations/crewai-mapper";

/* ------------------------------------------------------------------ */
/*  Example crew YAML                                                  */
/* ------------------------------------------------------------------ */

const EXAMPLE_CREW_YAML = `researcher:
  role: "Senior Research Analyst"
  goal: "Find and synthesize comprehensive information on any given topic"
  backstory: "You are a veteran research analyst with 15 years of experience at top think tanks. You excel at finding obscure sources, cross-referencing data, and identifying trends others miss."
  tools:
    - search_tool
    - scrape_tool
    - arxiv_tool
  allow_delegation: true
  verbose: true

writer:
  role: "Content Writer"
  goal: "Transform research findings into compelling, well-structured articles"
  backstory: "You are an award-winning writer who has published in major outlets. You turn complex research into clear, engaging prose that any audience can understand."
  tools:
    - search_tool
    - file_writer
  allow_delegation: false
  verbose: true

editor:
  role: "Senior Editor"
  goal: "Review and polish content for accuracy, clarity, and brand voice"
  backstory: "You are a meticulous editor with a sharp eye for factual errors, logical gaps, and style inconsistencies. You have edited for the NYT and The Economist."
  tools:
    - grammar_tool
    - fact_checker
  allow_delegation: true
  verbose: false`;

/* ------------------------------------------------------------------ */
/*  Concept mapping visual data                                        */
/* ------------------------------------------------------------------ */

const CONCEPT_ROWS = Object.entries(CREWAI_TO_AATS_MAP).map(
  ([crewai, aats]) => ({ crewai, aats }),
);

/* ------------------------------------------------------------------ */
/*  Code snippet for import example                                    */
/* ------------------------------------------------------------------ */

const CODE_SNIPPET = `import { mapCrewAIToAATS } from "@/lib/integrations/crewai-mapper";
import fs from "fs";

// 1. Read your crew.yaml
const crewYaml = fs.readFileSync("crew.yaml", "utf-8");

// 2. Convert CrewAI → AATS
const team = mapCrewAIToAATS(crewYaml);

// 3. Result: certified agent team ready for training
console.log(team.teamName);     // "Imported CrewAI Crew"
console.log(team.agents.length); // 3
console.log(team.katas.length);  // tasks mapped to katas`;

/* ------------------------------------------------------------------ */
/*  Customer support import walkthrough                                */
/* ------------------------------------------------------------------ */

const WALKTHROUGH_STEPS = [
  {
    step: "01",
    title: "Import",
    description:
      'Paste your customer support crew YAML below. We parse roles (Triage Agent, Resolution Specialist, QA Reviewer), goals, backstories, and tool bindings.',
  },
  {
    step: "02",
    title: "Train",
    description:
      "Each agent runs through domain-specific Katas — handling refund requests, escalation flows, and SLA compliance checks — until scores exceed the certification threshold.",
  },
  {
    step: "03",
    title: "Certify & Deploy",
    description:
      "The crew receives an AATS certification badge with consistency scores. Deploy to Slack, Zendesk, or your custom support portal with audit trails built in.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CrewAIIntegrationPage() {
  const [yaml, setYaml] = useState("");
  const [result, setResult] = useState<AATSTeamConfig | null>(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!yaml.trim()) return;
    setImporting(true);
    // Simulate a small delay for realism
    await new Promise((r) => setTimeout(r, 800));
    const team = mapCrewAIToAATS(yaml);
    setResult(team);
    setImporting(false);
  };

  const handlePasteExample = () => {
    setYaml(EXAMPLE_CREW_YAML);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Back */}
        <Link
          href="/integrations"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          All Integrations
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-3xl">
              ⛵
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                CrewAI Integration
              </h1>
              <p className="text-sm text-zinc-500">
                1,243 crews imported &middot; Multi-agent team support
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-zinc-400">
            Import your CrewAI crews — agents, tasks, tools, and delegation
            settings — directly into agents.academy. We convert your YAML config
            to AATS format, so you can train, certify, and deploy your crew with
            enterprise guardrails.
          </p>
        </div>

        {/* ---- Concept Mapping ---- */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-semibold text-zinc-100">
            Concept Mapping
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEPT_ROWS.map(({ crewai, aats }) => (
              <div
                key={crewai}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <span className="rounded-md bg-orange-500/10 px-2.5 py-1 font-mono text-xs text-orange-400">
                  {crewai}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-600" />
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400">
                  {aats}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Code Snippet ---- */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-zinc-100">
            Import Code
          </h2>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-relaxed text-zinc-300">
            <code>{CODE_SNIPPET}</code>
          </pre>
        </section>

        {/* ---- Customer Support Walkthrough ---- */}
        <section className="mb-14">
          <h2 className="mb-2 text-xl font-semibold text-zinc-100">
            Example: Customer Support Crew
          </h2>
          <p className="mb-6 text-sm text-zinc-400">
            See how a 3-agent customer support crew goes from CrewAI YAML to a
            certified, deployed team.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {WALKTHROUGH_STEPS.map((ws) => (
              <div
                key={ws.step}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <p className="text-sm font-medium text-emerald-500">
                  {ws.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-zinc-100">
                  {ws.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {ws.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Example YAML ---- */}
        <section className="mb-14">
          <h2 className="mb-2 text-xl font-semibold text-zinc-100">
            Example CrewAI Crew YAML
          </h2>
          <p className="mb-4 text-sm text-zinc-400">
            A realistic 3-agent content crew with researcher, writer, and
            editor.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-xs leading-relaxed text-zinc-400">
            <code>{EXAMPLE_CREW_YAML}</code>
          </pre>
        </section>

        {/* ---- Import CTA ---- */}
        <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-8">
          <div className="mb-4 flex items-center gap-3">
            <Users className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold text-zinc-100">
              Import CrewAI Crew
            </h2>
          </div>
          <p className="mb-5 text-sm text-zinc-400">
            Paste your <code className="text-zinc-300">crew.yaml</code> or{" "}
            <code className="text-zinc-300">agents.yaml</code> below. We&apos;ll
            parse it and show the converted AATS team config.
          </p>

          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={handlePasteExample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              <ClipboardPaste className="h-3.5 w-3.5" />
              Paste Example
            </button>
          </div>

          <textarea
            value={yaml}
            onChange={(e) => {
              setYaml(e.target.value);
              setResult(null);
            }}
            placeholder="Paste your CrewAI YAML here…"
            rows={12}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          />

          <button
            onClick={handleImport}
            disabled={!yaml.trim() || importing}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing…
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4" />
                Import CrewAI Crew
              </>
            )}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Import Successful</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-zinc-500">Team Name</dt>
                  <dd className="text-zinc-200">{result.teamName}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Agents</dt>
                  <dd className="text-zinc-200">{result.agents.length}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Katas</dt>
                  <dd className="text-zinc-200">{result.katas.length}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Model</dt>
                  <dd className="text-zinc-200">
                    {result.agents[0]?.model ?? "gpt-4o"}
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <dt className="text-sm text-zinc-500">Agents</dt>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.agents.map((a) => (
                    <span
                      key={a.name}
                      className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
