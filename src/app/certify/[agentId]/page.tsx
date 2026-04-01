import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { CertificationTier } from "@/lib/certification/types";
import { generateCertification } from "@/lib/certification/mock-cert";
import CertBadge from "@/components/certification/CertBadge";
import OutcomeGuaranteeCard from "@/components/certification/OutcomeGuaranteeCard";
import CertTimeline from "@/components/certification/CertTimeline";

// ---------------------------------------------------------------------------
// Mock agent → domain / tier mapping (static for demo)
// ---------------------------------------------------------------------------

const MOCK_AGENTS: Record<
  string,
  { domain: string; tier: CertificationTier }
> = {
  "medassist-pro": { domain: "healthcare", tier: CertificationTier.CERTIFIED },
  "finguard-ai": { domain: "finance", tier: CertificationTier.VERIFIED },
  "lexreview": { domain: "legal", tier: CertificationTier.CERTIFIED },
  "opsbot": { domain: "devops", tier: CertificationTier.VERIFIED },
  "helpdesk-ai": { domain: "support", tier: CertificationTier.COMMUNITY },
};

export function generateStaticParams() {
  return Object.keys(MOCK_AGENTS).map((agentId) => ({ agentId }));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;

  const agent = MOCK_AGENTS[agentId] ?? {
    domain: "support",
    tier: CertificationTier.COMMUNITY,
  };

  const cert = generateCertification(agentId, agent.domain, agent.tier);

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back link */}
        <Link
          href="/certify"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Certification
        </Link>

        {/* Header */}
        <h1 className="mb-1 text-3xl font-bold tracking-tight">
          Certification Report
        </h1>
        <p className="mb-10 text-sm text-zinc-500">
          Issued {issuedDate} &middot; Agent{" "}
          <span className="font-mono text-zinc-400">{agentId}</span>
        </p>

        {/* Two-column: Badge + Standards */}
        <div className="mb-10 grid gap-8 md:grid-cols-2">
          {/* Badge */}
          <CertBadge
            tier={cert.tier}
            score={cert.score}
            domain={agent.domain}
          />

          {/* Standards summary */}
          <div className="flex flex-col gap-4">
            {/* Passed */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="mb-3 text-sm font-medium text-zinc-300">
                Standards Passed
              </h3>
              <ul className="space-y-2">
                {cert.standardsPassed.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Failed (if any) */}
            {cert.standardsFailed.length > 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="mb-3 text-sm font-medium text-zinc-300">
                  Standards Failed
                </h3>
                <ul className="space-y-2">
                  {cert.standardsFailed.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Outcome Guarantee Contract */}
        {cert.outcomeGuarantee && (
          <div className="mb-10">
            <OutcomeGuaranteeCard contract={cert.outcomeGuarantee} />
          </div>
        )}

        {/* Timeline */}
        <CertTimeline tier={cert.tier} />
      </div>
    </div>
  );
}
