"use client";

import { useState } from "react";
import {
  Download,
  FileJson,
  FileUp,
  Globe,
  Link,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ImportSource, importAgent, type ImportedAgent } from "@/lib/import";

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

interface TabDef {
  id: ImportSource;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  inputType: "url" | "json" | "yaml" | "endpoint";
  description: string;
}

const TABS: TabDef[] = [
  {
    id: ImportSource.OPENCLAW,
    label: "OpenClaw",
    icon: <Link className="h-4 w-4" />,
    placeholder: "https://openclaw.dev/skills/my-skill",
    inputType: "url",
    description: "Paste a SKILL.md URL from the OpenClaw registry.",
  },
  {
    id: ImportSource.LANGCHAIN,
    label: "LangChain",
    icon: <FileJson className="h-4 w-4" />,
    placeholder: '{\n  "name": "My Agent",\n  "llm": "gpt-4o",\n  "tools": ["serpapi", "llm_math"],\n  "prompt_template": "You are a helpful assistant..."\n}',
    inputType: "json",
    description: "Paste your LangChain agent / chain JSON configuration.",
  },
  {
    id: ImportSource.CREWAI,
    label: "CrewAI",
    icon: <FileUp className="h-4 w-4" />,
    placeholder:
      'role: "Research Analyst"\ngoal: "Find and summarize relevant information"\nbackstory: "You are an expert researcher..."\ntools:\n  - search_tool\n  - scrape_tool',
    inputType: "yaml",
    description: "Paste or upload your CrewAI crew YAML configuration.",
  },
  {
    id: ImportSource.GPT_STORE,
    label: "GPT Store",
    icon: <Globe className="h-4 w-4" />,
    placeholder: "https://chatgpt.com/g/g-abc123-my-gpt",
    inputType: "url",
    description: "Paste a GPT Store URL to import its public configuration.",
  },
  {
    id: ImportSource.CUSTOM,
    label: "Custom",
    icon: <Download className="h-4 w-4" />,
    placeholder: "https://api.example.com/agents/export/42",
    inputType: "endpoint",
    description:
      "Provide an HTTP endpoint that returns an agent config JSON payload.",
  },
];

/* ------------------------------------------------------------------ */
/*  Status types                                                       */
/* ------------------------------------------------------------------ */

type ImportStatus =
  | { state: "idle" }
  | { state: "importing"; progress: number }
  | { state: "success"; agent: ImportedAgent }
  | { state: "error"; message: string };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ImportPage() {
  const [activeTab, setActiveTab] = useState<ImportSource>(
    ImportSource.OPENCLAW,
  );
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<ImportStatus>({ state: "idle" });

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  /* ----- import handler ----- */
  const handleImport = async () => {
    if (!inputValue.trim()) return;

    setStatus({ state: "importing", progress: 0 });

    // Simulate progress ticks while the importer runs
    const interval = setInterval(() => {
      setStatus((prev) =>
        prev.state === "importing"
          ? { ...prev, progress: Math.min(prev.progress + 15, 90) }
          : prev,
      );
    }, 300);

    try {
      let input: string | Record<string, unknown> = inputValue;

      if (
        currentTab.inputType === "json" ||
        currentTab.inputType === "yaml" ||
        currentTab.inputType === "endpoint"
      ) {
        // For JSON tabs, parse into an object; for YAML stubs we pass as-is
        // wrapped in an object so the router receives a Record.
        try {
          input = JSON.parse(inputValue) as Record<string, unknown>;
        } catch {
          // If it's YAML (or unparseable), wrap raw text so the stub can handle it
          input = { _raw: inputValue };
        }
      }

      const agent = await importAgent(activeTab, input);

      clearInterval(interval);
      setStatus({ state: "success", agent });
    } catch (err) {
      clearInterval(interval);
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Import failed",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-5">
        <h1 className="text-lg font-semibold text-zinc-100">Import Agent</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Bring in an existing agent from another platform and train it on
          agents.academy.
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {/* Tabs */}
        <nav className="flex gap-1 overflow-x-auto rounded-lg bg-zinc-900 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setInputValue("");
                setStatus({ state: "idle" });
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Description */}
        <p className="mt-5 text-sm text-zinc-400">{currentTab.description}</p>

        {/* Input area */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentTab.placeholder}
          rows={currentTab.inputType === "url" || currentTab.inputType === "endpoint" ? 2 : 10}
          className="mt-4 w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
        />

        {/* Import button */}
        <button
          onClick={handleImport}
          disabled={!inputValue.trim() || status.state === "importing"}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status.state === "importing" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Importing…
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Import &amp; Train
            </>
          )}
        </button>

        {/* Progress bar */}
        {status.state === "importing" && (
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${status.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Importing and converting agent configuration…
            </p>
          </div>
        )}

        {/* Success state */}
        {status.state === "success" && (
          <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Import Successful</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-zinc-500">Name</dt>
                <dd className="text-zinc-200">{status.agent.name}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Source</dt>
                <dd className="text-zinc-200">{status.agent.source}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Model</dt>
                <dd className="text-zinc-200">
                  {status.agent.convertedConfig.model}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Tools</dt>
                <dd className="text-zinc-200">
                  {status.agent.convertedConfig.tools.join(", ")}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-zinc-500">System Prompt</dt>
                <dd className="mt-1 rounded bg-zinc-900 p-3 font-mono text-xs text-zinc-300">
                  {status.agent.convertedConfig.systemPrompt}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Error state */}
        {status.state === "error" && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
