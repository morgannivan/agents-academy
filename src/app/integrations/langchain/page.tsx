"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardPaste,
  Loader2,
  Workflow,
} from "lucide-react";
import {
  mapLangChainToAATS,
  LANGCHAIN_TO_AATS_MAP,
  type AATSPipelineConfig,
} from "@/lib/integrations/langchain-mapper";

/* ------------------------------------------------------------------ */
/*  Example LangChain agent config                                     */
/* ------------------------------------------------------------------ */

const EXAMPLE_CONFIG = `{
  "name": "Research Assistant",
  "agent_type": "openai-functions",
  "llm": {
    "model_name": "gpt-4o",
    "temperature": 0.2,
    "max_tokens": 4096,
    "provider": "openai"
  },
  "tools": [
    {
      "name": "serpapi",
      "description": "Search the web for current information",
      "type": "tool"
    },
    {
      "name": "arxiv",
      "description": "Search academic papers on arXiv",
      "type": "tool"
    },
    {
      "name": "wikipedia",
      "description": "Look up facts on Wikipedia",
      "type": "tool"
    }
  ],
  "memory": {
    "type": "buffer",
    "max_token_limit": 4096,
    "return_messages": true
  },
  "system_message": "You are a research assistant that finds, synthesizes, and cites information from multiple sources. Always provide references.",
  "max_iterations": 15,
  "verbose": true
}`;

/* ------------------------------------------------------------------ */
/*  Concept mapping                                                    */
/* ------------------------------------------------------------------ */

const CONCEPT_ROWS = Object.entries(LANGCHAIN_TO_AATS_MAP).map(
  ([langchain, aats]) => ({ langchain, aats }),
);

/* ------------------------------------------------------------------ */
/*  Code snippet                                                       */
/* ------------------------------------------------------------------ */

const CODE_SNIPPET = `import { mapLangChainToAATS } from "@/lib/integrations/langchain-mapper";

// 1. Parse your LangChain agent config
const config = JSON.parse(agentConfigJson);

// 2. Convert LangChain → AATS
const pipeline = mapLangChainToAATS(config);

// 3. Result: agent pipeline ready for training
console.log(pipeline.name);          // "Research Assistant"
console.log(pipeline.pipelineType);  // "openai-functions"
console.log(pipeline.context.type);  // "buffer"
console.log(pipeline.mcpTools);      // ["mcp:serpapi", ...]`;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LangChainIntegrationPage() {
  const [json, setJson] = useState("");
  const [result, setResult] = useState<AATSPipelineConfig | null>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    if (!json.trim()) return;
    setImporting(true);
    setError(null);

    await new Promise((r) => setTimeout(r, 700));

    try {
      const parsed = JSON.parse(json) as Record<string, unknown>;
      const pipeline = mapLangChainToAATS(parsed);
      setResult(pipeline);
    } catch {
      setError("Invalid JSON. Please check your configuration and try again.");
    }

    setImporting(false);
  };

  const handlePasteExample = () => {
    setJson(EXAMPLE_CONFIG);
    setResult(null);
    setError(null);
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
              🦜
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                LangChain / LangGraph Integration
              </h1>
              <p className="text-sm text-zinc-500">
                2,871 agents imported &middot; Chain &amp; graph support
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-zinc-400">
            Import LangChain agents, chains, and LangGraph state machines. We
            convert your tools, memory, prompts, and agent type into AATS
            pipeline configs — ready for training and certification.
          </p>
        </div>

        {/* ---- Concept Mapping ---- */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-semibold text-zinc-100">
            Concept Mapping
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEPT_ROWS.map(({ langchain, aats }) => (
              <div
                key={langchain}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 font-mono text-xs text-blue-400">
                  {langchain}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-600" />
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400">
                  {aats}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-semibold text-zinc-100">
            How It Works
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Export Config",
                desc: "Export your LangChain agent as JSON from LangChain Hub or your codebase. Include tools, memory, and prompt template.",
              },
              {
                step: "02",
                title: "Map & Convert",
                desc: "We parse the agent type, LLM config, tool bindings, and memory settings. Each maps to an AATS equivalent automatically.",
              },
              {
                step: "03",
                title: "Train & Certify",
                desc: "Run your converted agent through domain Katas. Once scores pass thresholds, receive an AATS certification badge.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <p className="text-sm font-medium text-emerald-500">
                  {s.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-zinc-100">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {s.desc}
                </p>
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

        {/* ---- Import CTA ---- */}
        <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-8">
          <div className="mb-4 flex items-center gap-3">
            <Workflow className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold text-zinc-100">
              Import from LangChain
            </h2>
          </div>
          <p className="mb-5 text-sm text-zinc-400">
            Paste your LangChain agent JSON configuration below. We&apos;ll
            convert it to an AATS pipeline config.
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
            value={json}
            onChange={(e) => {
              setJson(e.target.value);
              setResult(null);
              setError(null);
            }}
            placeholder="Paste your LangChain agent JSON here…"
            rows={14}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          />

          <button
            onClick={handleImport}
            disabled={!json.trim() || importing}
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
                Import from LangChain
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Import Successful</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-zinc-500">Name</dt>
                  <dd className="text-zinc-200">{result.name}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Pipeline Type</dt>
                  <dd className="text-zinc-200">{result.pipelineType}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Model</dt>
                  <dd className="text-zinc-200">{result.model}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Context Type</dt>
                  <dd className="text-zinc-200">{result.context.type}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Tools</dt>
                  <dd className="text-zinc-200">
                    {result.tools.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">MCP Tools</dt>
                  <dd className="text-zinc-200">
                    {result.mcpTools.join(", ")}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-zinc-500">System Prompt</dt>
                  <dd className="mt-1 rounded bg-zinc-900 p-3 font-mono text-xs text-zinc-300">
                    {result.systemPrompt}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
