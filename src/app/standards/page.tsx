"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { getAllDomainPacks } from "@/lib/standards";
import type { DomainPack, Standard, Severity } from "@/lib/standards";

/* ------------------------------------------------------------------ */
/*  Severity badge colours                                             */
/* ------------------------------------------------------------------ */

const SEVERITY_STYLES: Record<Severity, string> = {
  must: "bg-red-950 text-red-400 border-red-900",
  should: "bg-amber-950 text-amber-400 border-amber-900",
  may: "bg-sky-950 text-sky-400 border-sky-900",
};

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${SEVERITY_STYLES[severity]}`}
    >
      {severity}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Standard card (expandable)                                         */
/* ------------------------------------------------------------------ */

function StandardCard({ standard }: { standard: Standard }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 transition-colors hover:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-emerald-400">
              {standard.id}
            </span>
            <span className="text-[11px] text-zinc-600">v{standard.version}</span>
          </div>
          <h3 className="mt-0.5 text-sm font-semibold text-zinc-100">
            {standard.name}
          </h3>
        </div>
        <div className="hidden shrink-0 items-center gap-3 text-xs text-zinc-500 sm:flex">
          <span>{standard.requirements.length} requirements</span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span>{standard.kataCount} katas</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-zinc-800 px-5 pb-5 pt-4">
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">
            {standard.description}
          </p>

          <ul className="space-y-3">
            {standard.requirements.map((req) => (
              <li key={req.id} className="flex items-start gap-3">
                <SeverityBadge severity={req.severity} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-300">{req.text}</p>
                  <span className="mt-0.5 inline-block rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                    {req.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Domain section                                                     */
/* ------------------------------------------------------------------ */

function DomainSection({
  pack,
  searchQuery,
}: {
  pack: DomainPack;
  searchQuery: string;
}) {
  const filtered = useMemo(() => {
    if (!searchQuery) return pack.standards;
    const q = searchQuery.toLowerCase();
    return pack.standards.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.requirements.some(
          (r) =>
            r.text.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q),
        ),
    );
  }, [pack.standards, searchQuery]);

  if (filtered.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{pack.emoji}</span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">{pack.name}</h2>
          <p className="text-xs text-zinc-500">
            {pack.totalRequirements} requirements &middot;{" "}
            {pack.certificationThreshold}% certification threshold
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((standard) => (
          <StandardCard key={standard.id} standard={standard} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const ALL_DOMAIN = "__all__";

export default function StandardsPage() {
  const packs = useMemo(() => getAllDomainPacks(), []);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState(ALL_DOMAIN);

  const visiblePacks = useMemo(
    () =>
      domainFilter === ALL_DOMAIN
        ? packs
        : packs.filter((p) => p.domain === domainFilter),
    [packs, domainFilter],
  );

  const totalStandards = packs.reduce((s, p) => s + p.standards.length, 0);
  const totalReqs = packs.reduce((s, p) => s + p.totalRequirements, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Domain Standards Library
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Standards &amp; Requirements
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-400">
            The compliance backbone for every AI agent. Browse domain-specific
            standards, requirements, and scoring rules that power certification.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <p className="text-2xl font-bold text-emerald-400">{packs.length}</p>
            <p className="text-xs text-zinc-500">Domains</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <p className="text-2xl font-bold text-emerald-400">{totalStandards}</p>
            <p className="text-xs text-zinc-500">Standards</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <p className="text-2xl font-bold text-emerald-400">{totalReqs}</p>
            <p className="text-xs text-zinc-500">Requirements</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search standards, requirements, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          >
            <option value={ALL_DOMAIN}>All Domains</option>
            {packs.map((p) => (
              <option key={p.domain} value={p.domain}>
                {p.emoji} {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Domain sections */}
        <div className="space-y-10">
          {visiblePacks.map((pack) => (
            <DomainSection
              key={pack.domain}
              pack={pack}
              searchQuery={search}
            />
          ))}

          {visiblePacks.length === 0 && (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto mb-3 h-10 w-10 text-zinc-700" />
              <p className="text-zinc-500">
                No standards match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
