"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardPaste,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  mapOpenClawToAATS,
  OPENCLAW_TO_AATS_MAP,
  type AATSOpenClawConfig,
} from "@/lib/integrations/openclaw-mapper";

/* ------------------------------------------------------------------ */
/*  Example SKILL.md                                                   */
/* ------------------------------------------------------------------ */

const EXAMPLE_SKILL_MD = `---
openclaw.author: kira-dev
openclaw.version: 2.1.0
openclaw.model: gpt-4o
openclaw.requires: [web_search, code_interpreter, file_reader, slack_notify]
openclaw.tags: [devops, incident-response, automation]
---

# Incident Commander

A DevOps incident response agent that triages alerts, correlates logs,
and coordinates resolution across teams.

## Capabilities

- Monitor PagerDuty / OpsGenie alerts and auto-classify severity
- Correlate CloudWatch, Datadog, and Sentry logs into a timeline
- Draft incident summaries and post to Slack #incidents channel
- Suggest runbook steps based on historical incident patterns
- Escalate to on-call engineers when resolution confidence is low

## soul.md

You are Incident Commander, a calm and methodical DevOps agent.
When an alert fires, your first priority is to assess blast radius.
Never take destructive actions without explicit human approval.
Always cite log evidence when recommending a root cause.`;

/* ------------------------------------------------------------------ */
/*  Concept mapping                                                    */
/* ------------------------------------------------------------------ */

const CONCEPT_ROWS = Object.entries(OPENCLAW_TO_AATS_MAP).map(
  ([openclaw, aats]) => ({ openclaw, aats }),
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OpenClawIntegrationPage() {
  const [skillMd, setSkillMd] = useState("");
  const [result, setResult] = useState<AATSOpenClawConfig | null>(null);
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    if (!skillMd.trim()) return;
    setImporting(true);
    await new Promise((r) => setTimeout(r, 750));
    const config = mapOpenClawToAATS(skillMd);
    setResult(config);
    setImporting(false);
  };

  const handlePasteExample = () => {
    setSkillMd(EXAMPLE_SKILL_MD);
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
              🦞
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                OpenClaw Integration
              </h1>
              <p className="text-sm text-zinc-500">
                487 skills imported &middot; SKILL.md format
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-zinc-400">
            Import skills directly from Claw Hub by URL or paste a SKILL.md
            file. We parse the skill name, soul.md system prompt, tool
            requirements, and metadata — then wrap it in the training and
            certification layer that OpenClaw doesn&apos;t provide.
          </p>
        </div>

        {/* ---- ClawHavoc Warning ---- */}
        <section className="mb-14 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-300">
              Remember ClawHavoc?
            </h2>
          </div>
          <p className="text-sm leading-6 text-zinc-400">
            In March 2026, the{" "}
            <span className="font-medium text-zinc-200">ClawHavoc incident</span>{" "}
            exposed a critical gap in the OpenClaw ecosystem: a popular Claw Hub
            skill was modified to exfiltrate API keys via its{" "}
            <code className="text-zinc-300">soul.md</code> prompt injection —
            affecting 2,300+ deployments before it was discovered. OpenClaw has
            no certification, no trust scoring, and no runtime guardrails.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            <span className="font-medium text-emerald-400">
              agents.academy adds the trust layer OpenClaw lacks.
            </span>{" "}
            Every imported skill goes through adversarial Katas, prompt-injection
            detection, and tool-permission audits before receiving an AATS
            certification badge. Your team gets consistency scores, audit trails,
            and runtime sandboxing — so another ClawHavoc can&apos;t happen on
            your watch.
          </p>
        </section>

        {/* ---- Concept Mapping ---- */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-semibold text-zinc-100">
            Concept Mapping
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEPT_ROWS.map(({ openclaw, aats }) => (
              <div
                key={openclaw}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <span className="rounded-md bg-red-500/10 px-2.5 py-1 font-mono text-xs text-red-400">
                  {openclaw}
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
            Import Flow
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Paste SKILL.md",
                desc: "Paste the full SKILL.md content or import by Claw Hub URL. We extract the title, description, tools from openclaw.requires, and the soul.md system prompt.",
              },
              {
                step: "02",
                title: "Security Audit",
                desc: "The imported skill runs through prompt-injection detection, tool-permission checks, and adversarial red-team Katas. Issues are flagged before deployment.",
              },
              {
                step: "03",
                title: "Certify & Deploy",
                desc: "Once the skill passes all checks, it receives an AATS certification badge with a trust score. Deploy with confidence and runtime monitoring.",
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

        {/* ---- Example SKILL.md ---- */}
        <section className="mb-14">
          <h2 className="mb-2 text-xl font-semibold text-zinc-100">
            Example SKILL.md
          </h2>
          <p className="mb-4 text-sm text-zinc-400">
            A DevOps incident response skill with tools, metadata, and a soul.md
            system prompt.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-xs leading-relaxed text-zinc-400">
            <code>{EXAMPLE_SKILL_MD}</code>
          </pre>
        </section>

        {/* ---- Import CTA ---- */}
        <section className="rounded-2xl border border-emerald-500/20 bg-zinc-900/80 p-8">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold text-zinc-100">
              Import from OpenClaw
            </h2>
          </div>
          <p className="mb-5 text-sm text-zinc-400">
            Paste your{" "}
            <code className="text-zinc-300">SKILL.md</code> content below.
            We&apos;ll parse it, run security checks, and show the converted
            AATS config.
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
            value={skillMd}
            onChange={(e) => {
              setSkillMd(e.target.value);
              setResult(null);
            }}
            placeholder="Paste your SKILL.md content here…"
            rows={14}
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          />

          <button
            onClick={handleImport}
            disabled={!skillMd.trim() || importing}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing &amp; Scanning…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Import &amp; Audit Skill
              </>
            )}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">
                  Import Successful — Certification Required
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-zinc-500">Skill Name</dt>
                  <dd className="text-zinc-200">{result.name}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Model</dt>
                  <dd className="text-zinc-200">{result.model}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Trust Score</dt>
                  <dd className="text-amber-400">
                    {result.trustScore}/100 — needs certification
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Source Format</dt>
                  <dd className="text-zinc-200">{result.sourceFormat}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Tools</dt>
                  <dd className="text-zinc-200">
                    {result.tools.join(", ") || "None detected"}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">MCP Tools</dt>
                  <dd className="text-zinc-200">
                    {result.mcpTools.join(", ") || "None"}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                <p className="text-sm text-amber-300">
                  ⚠ This skill has not been certified yet. Run it through AATS
                  training Katas to generate a trust score and receive a
                  certification badge before deploying to production.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
