import {
  BookOpen,
  CheckCircle,
  FlaskConical,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { CertificationTier } from "@/lib/certification/types";

interface Milestone {
  icon: LucideIcon;
  title: string;
  description: string;
  date: string;
  status: "complete" | "current" | "upcoming";
}

function buildMilestones(tier: CertificationTier): Milestone[] {
  const base: Milestone[] = [
    {
      icon: BookOpen,
      title: "Domain Training",
      description:
        "Ingested domain corpus, regulatory documents, and historical data.",
      date: "2026-01-10",
      status: "complete",
    },
    {
      icon: FlaskConical,
      title: "Benchmark Evaluation",
      description:
        "Ran 5,000+ automated scenarios across accuracy, safety, and latency.",
      date: "2026-02-02",
      status: "complete",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Audit",
      description:
        "Passed automated compliance checks for all applicable standards.",
      date: "2026-02-20",
      status: "complete",
    },
  ];

  if (tier === CertificationTier.COMMUNITY) {
    base[2].status = "upcoming";
    base[2].description =
      "Compliance audit not required for Community tier.";
    return base;
  }

  base.push({
    icon: CheckCircle,
    title: "Peer Review",
    description:
      "Reviewed by two independent domain experts and a security auditor.",
    date: "2026-03-01",
    status: tier === CertificationTier.VERIFIED ? "current" : "complete",
  });

  if (tier === CertificationTier.CERTIFIED) {
    base.push({
      icon: Rocket,
      title: "Certification Issued",
      description:
        "Full certification granted with Outcome Guarantee Contract.",
      date: "2026-03-15",
      status: "complete",
    });
  }

  return base;
}

const STATUS_STYLES: Record<
  Milestone["status"],
  { dot: string; line: string; text: string }
> = {
  complete: {
    dot: "bg-emerald-500",
    line: "bg-emerald-500/40",
    text: "text-zinc-300",
  },
  current: {
    dot: "bg-amber-400 animate-pulse",
    line: "bg-zinc-700",
    text: "text-zinc-100",
  },
  upcoming: {
    dot: "bg-zinc-700",
    line: "bg-zinc-800",
    text: "text-zinc-500",
  },
};

interface CertTimelineProps {
  tier: CertificationTier;
}

export default function CertTimeline({ tier }: CertTimelineProps) {
  const milestones = buildMilestones(tier);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold text-zinc-100">
        Certification Timeline
      </h3>

      <ol className="relative ml-3 border-l border-zinc-800">
        {milestones.map((m, i) => {
          const s = STATUS_STYLES[m.status];
          const Icon = m.icon;
          const isLast = i === milestones.length - 1;

          return (
            <li key={m.title} className={`relative pl-8 ${isLast ? "" : "pb-8"}`}>
              {/* Connector line override */}
              {!isLast && (
                <span
                  className={`absolute left-0 top-3 -ml-px h-full w-0.5 ${s.line}`}
                  aria-hidden
                />
              )}

              {/* Dot */}
              <span
                className={`absolute left-0 top-1 -ml-[5px] h-2.5 w-2.5 rounded-full ring-4 ring-zinc-900 ${s.dot}`}
                aria-hidden
              />

              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.text}`} />
                <div>
                  <p className={`text-sm font-medium ${s.text}`}>{m.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {m.description}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">{m.date}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
