"use client";

import {
  Stethoscope,
  Dumbbell,
  ClipboardCheck,
  Award,
  Rocket,
  Activity,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import PipelineStage from "@/components/pipeline/PipelineStage";
import type { PipelineStageProps } from "@/components/pipeline/PipelineStage";
import PipelineArrow from "@/components/pipeline/PipelineArrow";

/* ------------------------------------------------------------------ */
/*  Stage definitions                                                 */
/* ------------------------------------------------------------------ */

const stages: (PipelineStageProps & { key: string })[] = [
  {
    key: "diagnose",
    icon: Stethoscope,
    name: "Diagnose",
    description: "Assess current capability against domain standards",
    details:
      "Run a diagnostic pass to surface capability gaps. Maps agent behavior to OGC standards and identifies the weakest areas before training begins.",
    status: "complete",
  },
  {
    key: "train",
    icon: Dumbbell,
    name: "Train",
    description: "Kata loops against standards",
    details:
      "Targeted training sessions using curated kata sequences. Each kata drills a specific standard until the agent consistently meets the benchmark.",
    status: "active",
    highlighted: true,
  },
  {
    key: "eval",
    icon: ClipboardCheck,
    name: "Eval",
    description: "Benchmark against test suite",
    details:
      "Run the agent through a full evaluation suite — scored per-standard with pass/fail thresholds. Produces a detailed scorecard.",
    status: "upcoming",
    highlighted: true,
    callout: "This is where most platforms stop. We keep going.",
  },
  {
    key: "certify",
    icon: Award,
    name: "Certify",
    description: "Issue credential with OGC",
    details:
      "Agents that pass evaluation receive a verifiable OGC credential — a tamper-proof certificate tied to specific standards and score thresholds.",
    status: "upcoming",
    highlighted: true,
  },
  {
    key: "deploy",
    icon: Rocket,
    name: "Deploy",
    description: "Ship to channel",
    details:
      "One-click deployment to Slack, API, web widget, or any supported channel. Includes rollback, canary, and A/B deployment strategies.",
    status: "upcoming",
  },
  {
    key: "monitor",
    icon: Activity,
    name: "Monitor",
    description: "Production behavior tracking",
    details:
      "Continuous monitoring of live interactions. Track standard adherence, latency, user satisfaction, and flag anomalies in real time.",
    status: "upcoming",
  },
  {
    key: "retrain",
    icon: RefreshCw,
    name: "Retrain",
    description: "Drift detection triggers loop back",
    details:
      "When monitoring detects capability drift or new failure patterns, the agent is automatically queued for a focused retraining cycle.",
    status: "upcoming",
  },
];

/* ------------------------------------------------------------------ */
/*  Highlighted stages (unique-value section)                         */
/* ------------------------------------------------------------------ */

const highlightedKeys = new Set(["train", "eval", "certify"]);

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Agent Lifecycle Pipeline
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Evals are one step. We take your agent from diagnosis through
            certified deployment — and keep it there.
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Pipeline row                                            */}
        {/* -------------------------------------------------------- */}
        <div className="relative mb-12">
          {/* Highlight backdrop behind TRAIN → EVAL → CERTIFY */}
          <div className="pointer-events-none absolute -inset-y-3 left-[calc(14.28%_-_8px)] w-[calc(42.86%_+_16px)] rounded-2xl border border-emerald-500/20 bg-emerald-950/10" />

          <div className="relative flex items-start gap-0 overflow-x-auto pb-4">
            {stages.map((stage, i) => (
              <div key={stage.key} className="flex items-start">
                <PipelineStage
                  icon={stage.icon}
                  name={stage.name}
                  description={stage.description}
                  details={stage.details}
                  status={stage.status}
                  highlighted={stage.highlighted}
                  callout={stage.callout}
                />
                {i < stages.length - 1 && (
                  <PipelineArrow
                    highlighted={
                      highlightedKeys.has(stages[i].key) &&
                      highlightedKeys.has(stages[i + 1].key)
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Label under highlighted section */}
          <p className="mt-1 pl-[14.28%] text-xs font-medium tracking-wide text-emerald-500/70">
            Our unique value — train, prove, certify
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Retrain loop indicator                                  */}
        {/* -------------------------------------------------------- */}
        <div className="mb-16 flex items-center gap-2 text-xs text-zinc-600">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>
            Drift detected → pipeline loops back to <strong>Diagnose</strong>
          </span>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Comparison sidebar (full-width card on this layout)     */}
        {/* -------------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Them */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-1 text-sm font-semibold text-zinc-400">
              Eval Platforms
            </h2>
            <p className="mb-4 text-2xl font-bold text-zinc-100">
              Give you a score.
            </p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                Run benchmarks and return a number
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                No path from score to improvement
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                No deployment, no monitoring, no guarantees
              </li>
            </ul>
          </div>

          {/* Us */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 ring-1 ring-emerald-500/20">
            <h2 className="mb-1 text-sm font-semibold text-emerald-400">
              agents.academy
            </h2>
            <p className="mb-4 text-2xl font-bold text-zinc-100">
              Give you a certified, deployed, monitored agent with guarantees.
            </p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {[
                "Diagnose gaps before you start",
                "Targeted training against real standards",
                "Verifiable OGC certification on pass",
                "One-click deployment to any channel",
                "24/7 production monitoring with drift alerts",
                "Automatic retraining when standards slip",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
