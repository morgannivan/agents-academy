import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Download,
  ShieldCheck,
  GitFork,
  Rocket,
  ImageIcon,
  MessageSquare,
  Clock,
} from "lucide-react";
import DomainBadge from "@/components/ui/DomainBadge";
import {
  getListingByAgentId,
  getRelatedListings,
} from "@/lib/marketplace/mock-listings";
import type { CertificationTier } from "@/lib/marketplace/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TIER_COLORS: Record<CertificationTier, string> = {
  community: "border-zinc-700 text-zinc-400 bg-zinc-800/50",
  verified: "border-blue-500/50 text-blue-400 bg-blue-950/30",
  certified: "border-emerald-500/50 text-emerald-400 bg-emerald-950/30",
  enterprise: "border-amber-500/50 text-amber-400 bg-amber-950/30",
};

const TIER_LABELS: Record<CertificationTier, string> = {
  community: "Community",
  verified: "Verified",
  certified: "Certified",
  enterprise: "Enterprise",
};

const TIER_DESCRIPTIONS: Record<CertificationTier, string> = {
  community: "Community-contributed agent. Not formally reviewed.",
  verified: "Identity verified. Passed basic quality and safety checks.",
  certified:
    "Fully certified under the Open Governance Compact. Meets enterprise compliance standards.",
  enterprise:
    "Enterprise-grade certification with dedicated support, SLA guarantees, and custom audit trails.",
};

function formatPrice(amount: number, period: string): string {
  const base = `$${amount}`;
  switch (period) {
    case "monthly":
      return `${base}/mo`;
    case "yearly":
      return `${base}/yr`;
    case "one_time":
      return base;
    case "per_task":
      return `${base}/task`;
    default:
      return base;
  }
}

/* ------------------------------------------------------------------ */
/*  Mock reviews                                                       */
/* ------------------------------------------------------------------ */

const MOCK_REVIEWS = [
  {
    author: "Sarah K.",
    rating: 5,
    date: "2 weeks ago",
    text: "Incredible agent — cut our workflow time in half. The integrations work flawlessly and the documentation is top-notch.",
  },
  {
    author: "Marcus T.",
    rating: 4,
    date: "1 month ago",
    text: "Solid performance across the board. Would love to see more customization options for edge cases, but overall very impressed.",
  },
  {
    author: "Priya R.",
    rating: 5,
    date: "2 months ago",
    text: "Deployed it in production within a day. The cert tier gave us the confidence we needed to ship fast.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const listing = getListingByAgentId(agentId);

  if (!listing) notFound();

  const related = getRelatedListings(agentId, 3);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/marketplace"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        {/* ---- Header ---- */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-bold text-emerald-400">
              {listing.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {listing.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                by {listing.creator}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <DomainBadge domain={listing.domain} />
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${TIER_COLORS[listing.certificationTier]}`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {TIER_LABELS[listing.certificationTier]}
                </span>
              </div>
            </div>
          </div>

          {/* Price & CTAs */}
          <div className="flex flex-col items-end gap-3">
            <span className="text-3xl font-bold text-zinc-50">
              {formatPrice(listing.price.amount, listing.price.period)}
            </span>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400">
                <Rocket className="h-4 w-4" />
                Deploy This Agent
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100">
                <GitFork className="h-4 w-4" />
                Fork &amp; Customize
              </button>
            </div>
          </div>
        </div>

        {/* ---- Stats bar ---- */}
        <div className="mb-10 flex flex-wrap gap-6 border-y border-zinc-800 py-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-zinc-200">
              {listing.rating.toFixed(1)}
            </span>
            <span className="text-sm text-zinc-500">
              ({listing.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Download className="h-4 w-4" />
            {listing.downloads.toLocaleString()} downloads
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="h-4 w-4" />
            Listed {listing.createdAt}
          </div>
        </div>

        {/* ---- Description ---- */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">About</h2>
          <p className="leading-relaxed text-zinc-300">{listing.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ---- Screenshots placeholder ---- */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900"
              >
                <ImageIcon className="h-8 w-8 text-zinc-700" />
              </div>
            ))}
          </div>
        </section>

        {/* ---- Certification / OGC ---- */}
        <section className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 text-emerald-400" />
            <div>
              <h2 className="text-lg font-semibold">
                Certification:{" "}
                <span className="text-emerald-400">
                  {TIER_LABELS[listing.certificationTier]}
                </span>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {TIER_DESCRIPTIONS[listing.certificationTier]}
              </p>
              {(listing.certificationTier === "certified" ||
                listing.certificationTier === "enterprise") && (
                <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="mb-2 text-sm font-medium text-zinc-300">
                    Open Governance Compact (OGC) Summary
                  </h3>
                  <ul className="space-y-1 text-sm text-zinc-400">
                    <li>• Data handling: encrypted at rest &amp; in transit</li>
                    <li>• Audit trail: full request/response logging</li>
                    <li>• Bias testing: quarterly evaluation reports</li>
                    <li>• Incident response: 24h acknowledgment SLA</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---- Reviews ---- */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MessageSquare className="h-5 w-5 text-zinc-500" />
            Reviews
          </h2>
          <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">
                      {review.author}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600">{review.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Related Agents ---- */}
        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold">Related Agents</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/marketplace/${r.agentId}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-emerald-500/50"
                >
                  <h3 className="font-semibold text-zinc-100">{r.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <DomainBadge domain={r.domain} />
                    <span className="text-sm text-zinc-400">
                      {r.rating.toFixed(1)} ★
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-300">
                    {formatPrice(r.price.amount, r.price.period)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
