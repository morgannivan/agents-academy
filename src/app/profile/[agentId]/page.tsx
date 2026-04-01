import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  GitFork,
  Rocket,
  ShieldCheck,
  Wrench,
  Wifi,
  WifiOff,
  Loader2,
  BarChart3,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import DomainBadge from "@/components/ui/DomainBadge";
import AgentStats from "@/components/agents/AgentStats";
import AgentCardJSON from "@/components/agents/AgentCardJSON";
import { getAgentById } from "@/lib/agents/mock-agents";
import type { CertificationSummary, DeploymentSummary } from "@/lib/agents/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TIER_VARIANT: Record<CertificationSummary["tier"], "default" | "success" | "warning" | "info" | "premium"> = {
  bronze: "warning",
  silver: "default",
  gold: "premium",
  platinum: "info",
};

function DeploymentStatusIcon({ status }: { status: DeploymentSummary["status"] }) {
  switch (status) {
    case "live":
      return <Wifi className="h-4 w-4 text-emerald-400" />;
    case "deploying":
      return <Loader2 className="h-4 w-4 animate-spin text-amber-400" />;
    case "offline":
    case "failed":
      return <WifiOff className="h-4 w-4 text-zinc-500" />;
  }
}

const STATUS_LABEL: Record<DeploymentSummary["status"], string> = {
  live: "Live",
  deploying: "Deploying",
  offline: "Offline",
  failed: "Failed",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back link */}
        <Link
          href="/profile"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          All agents
        </Link>

        {/* ---- Header ---- */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-bold text-emerald-400">
            {agent.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {agent.name}
              </h1>
              <DomainBadge domain={agent.domain} />
              <Badge variant="info">
                <ShieldCheck className="mr-1 inline h-3 w-3" />
                {agent.agentCard.consistency_score * 100}% consistency
              </Badge>
            </div>
            <p className="mt-2 text-zinc-400">{agent.description}</p>
            <p className="mt-1 text-xs text-zinc-600">
              by {agent.creator} · {agent.model}
            </p>
          </div>
        </div>

        {/* ---- Stats ---- */}
        <section className="mb-10">
          <AgentStats stats={agent.stats} />
        </section>

        {/* ---- Capabilities ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <Wrench className="h-5 w-5 text-emerald-500" />
            Capabilities
          </h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <ul className="grid gap-2 sm:grid-cols-2">
              {agent.agentCard.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {cap}
                </li>
              ))}
            </ul>

            {agent.tools.length > 0 && (
              <>
                <p className="mt-5 mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ---- Certification Badges ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {agent.certifications.map((cert) => (
              <div
                key={`${cert.tier}-${cert.domain}`}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
              >
                <Badge variant={TIER_VARIANT[cert.tier]}>
                  {cert.tier.toUpperCase()}
                </Badge>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    {cert.domain}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Score {cert.score}% · Issued {cert.issuedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Deployments ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <Rocket className="h-5 w-5 text-emerald-500" />
            Deployments
          </h2>
          <div className="space-y-3">
            {agent.deployments.map((dep) => (
              <div
                key={dep.channel}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <DeploymentStatusIcon status={dep.status} />
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {dep.channel}
                    </p>
                    <p className="text-xs text-zinc-500 break-all">
                      {dep.url}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={dep.status === "live" ? "success" : dep.status === "deploying" ? "warning" : "default"}
                >
                  {STATUS_LABEL[dep.status]}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Training History (placeholder chart) ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Training History
          </h2>
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-2 h-8 w-8 text-zinc-700" />
              <p className="text-sm text-zinc-500">
                Training history chart coming soon
              </p>
              <p className="text-xs text-zinc-600">
                {agent.stats.totalTrainingRuns} runs · Last trained{" "}
                {agent.stats.lastTrained}
              </p>
            </div>
          </div>
        </section>

        {/* ---- A2A Agent Card JSON Viewer ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <Bot className="h-5 w-5 text-emerald-500" />
            A2A Agent Card
          </h2>
          <AgentCardJSON card={agent.agentCard} />
        </section>

        {/* ---- CTAs ---- */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            <GitFork className="h-4 w-4" />
            Fork This Agent
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            <Rocket className="h-4 w-4" />
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
}
