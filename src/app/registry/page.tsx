import Link from "next/link";
import { Bot, Eye, EyeOff, GraduationCap, Shield, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mock registry data                                                 */
/* ------------------------------------------------------------------ */

type AgentStatus = "training" | "certified" | "enrolled" | "monitoring";
type Visibility = "public" | "private";

interface RegisteredAgent {
  id: string;
  name: string;
  domain: string;
  domainEmoji: string;
  status: AgentStatus;
  visibility: Visibility;
  certTier?: "community" | "verified" | "certified";
  score?: number;
  owner: string;
  enrolledAt: string;
  katasCompleted?: number;
  katasTotal?: number;
}

const AGENTS: RegisteredAgent[] = [
  { id: "medassist-pro", name: "MedAssist Pro", domain: "Healthcare", domainEmoji: "\u{1F3E5}", status: "certified", visibility: "public", certTier: "certified", score: 97, owner: "HealthTech Inc", enrolledAt: "2026-03-15", katasCompleted: 50, katasTotal: 50 },
  { id: "finguard-ai", name: "FinGuard AI", domain: "Finance", domainEmoji: "\u{1F4B0}", status: "certified", visibility: "public", certTier: "verified", score: 94, owner: "Morgan Analytics", enrolledAt: "2026-03-18", katasCompleted: 30, katasTotal: 30 },
  { id: "devops-responder", name: "DevOps Responder", domain: "DevOps", domainEmoji: "\u{1F6E0}\uFE0F", status: "training", visibility: "public", owner: "SRE Labs", enrolledAt: "2026-03-28", katasCompleted: 34, katasTotal: 50 },
  { id: "lead-qualifier-v2", name: "LeadQualifier v2", domain: "Real Estate", domainEmoji: "\u{1F3E0}", status: "certified", visibility: "private", certTier: "certified", score: 91, owner: "PropTech Co", enrolledAt: "2026-03-10", katasCompleted: 45, katasTotal: 45 },
  { id: "support-agent-x", name: "SupportAgent X", domain: "Support", domainEmoji: "\u{1F3A7}", status: "enrolled", visibility: "public", owner: "HelpDesk AI", enrolledAt: "2026-04-01" },
  { id: "lexreview", name: "LexReview", domain: "Legal", domainEmoji: "\u2696\uFE0F", status: "certified", visibility: "public", certTier: "community", score: 88, owner: "LegalTech", enrolledAt: "2026-03-20", katasCompleted: 25, katasTotal: 25 },
  { id: "sec-scanner", name: "SecScanner", domain: "Security", domainEmoji: "\u{1F512}", status: "monitoring", visibility: "private", certTier: "verified", score: 93, owner: "CyberOps", enrolledAt: "2026-03-05", katasCompleted: 40, katasTotal: 40 },
  { id: "research-bot", name: "ResearchBot", domain: "Research", domainEmoji: "\u{1F52C}", status: "training", visibility: "public", owner: "AcademicAI", enrolledAt: "2026-03-30", katasCompleted: 12, katasTotal: 35 },
];

const STATUS_COLORS: Record<AgentStatus, string> = {
  enrolled: "text-blue-400 bg-blue-400/10",
  training: "text-amber-400 bg-amber-400/10",
  certified: "text-emerald-400 bg-emerald-400/10",
  monitoring: "text-violet-400 bg-violet-400/10",
};

const TIER_COLORS: Record<string, string> = {
  community: "border-zinc-600 text-zinc-400",
  verified: "border-blue-500 text-blue-400",
  certified: "border-emerald-500 text-emerald-400",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RegistryPage() {
  const publicAgents = AGENTS.filter((a) => a.visibility === "public");
  const certified = AGENTS.filter((a) => a.status === "certified").length;
  const training = AGENTS.filter((a) => a.status === "training").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">Agent Registry</h1>
          <p className="mt-2 text-zinc-400">
            Browse registered agents. {certified} certified, {training} in training.
          </p>
        </div>
        <Link
          href="/enroll"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          <Bot className="h-4 w-4" />
          Register an Agent
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Certified", "Training", "Enrolled", "Monitoring"].map((tab) => (
          <button
            key={tab}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              tab === "All"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Agent cards */}
      <div className="mt-8 space-y-4">
        {publicAgents.map((agent) => (
          <Link
            key={agent.id}
            href={`/registry/${agent.id}`}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors hover:border-zinc-700 sm:flex-row sm:items-center"
          >
            {/* Left: identity */}
            <div className="flex items-center gap-4 sm:w-72">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-xl">
                {agent.domainEmoji}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-50">{agent.name}</h3>
                <p className="text-sm text-zinc-500">{agent.domain} &middot; {agent.owner}</p>
              </div>
            </div>

            {/* Status badge */}
            <div className="sm:w-28">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[agent.status]}`}>
                {agent.status === "certified" && <GraduationCap className="h-3 w-3" />}
                {agent.status === "training" && <Bot className="h-3 w-3" />}
                {agent.status === "monitoring" && <Shield className="h-3 w-3" />}
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
            </div>

            {/* Cert tier */}
            <div className="sm:w-24">
              {agent.certTier ? (
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${TIER_COLORS[agent.certTier]}`}>
                  {agent.certTier}
                </span>
              ) : (
                <span className="text-xs text-zinc-600">&mdash;</span>
              )}
            </div>

            {/* Score */}
            <div className="sm:w-16 text-center">
              {agent.score ? (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-sm font-medium text-zinc-200">{agent.score}</span>
                </div>
              ) : (
                <span className="text-xs text-zinc-600">&mdash;</span>
              )}
            </div>

            {/* Training progress */}
            <div className="flex-1">
              {agent.katasCompleted !== undefined && agent.katasTotal !== undefined && (
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{agent.katasCompleted}/{agent.katasTotal} katas</span>
                    <span>{Math.round((agent.katasCompleted / agent.katasTotal) * 100)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-zinc-800">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${(agent.katasCompleted / agent.katasTotal) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Visibility */}
            <div className="sm:w-10">
              {agent.visibility === "public" ? (
                <Eye className="h-4 w-4 text-zinc-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-zinc-600" />
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Private agents notice */}
      <div className="mt-8 rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-5 text-center">
        <EyeOff className="mx-auto h-5 w-5 text-zinc-600" />
        <p className="mt-2 text-sm text-zinc-500">
          {AGENTS.filter((a) => a.visibility === "private").length} private agents not shown.
          Sign in to view your private agents.
        </p>
      </div>
    </div>
  );
}
