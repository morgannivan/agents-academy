"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Star, ChevronDown, Download, ArrowLeft } from "lucide-react";
import DomainBadge from "@/components/ui/DomainBadge";
import {
  MOCK_LISTINGS,
  ALL_DOMAINS,
} from "@/lib/marketplace/mock-listings";
import type {
  MarketplaceListing,
  MarketplaceSort,
  CertificationTier,
} from "@/lib/marketplace/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS: { value: MarketplaceSort; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "price", label: "Lowest Price" },
];

const TIER_COLORS: Record<CertificationTier, string> = {
  community: "border-zinc-700 text-zinc-400",
  verified: "border-blue-500/50 text-blue-400",
  certified: "border-emerald-500/50 text-emerald-400",
  enterprise: "border-amber-500/50 text-amber-400",
};

const TIER_LABELS: Record<CertificationTier, string> = {
  community: "Community",
  verified: "Verified",
  certified: "Certified",
  enterprise: "Enterprise",
};

function formatPrice(listing: MarketplaceListing): string {
  const { amount, period } = listing.price;
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
  }
}

function sortListings(
  list: MarketplaceListing[],
  sort: MarketplaceSort,
): MarketplaceListing[] {
  const copy = [...list];
  switch (sort) {
    case "popular":
      return copy.sort((a, b) => b.downloads - a.downloads);
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "price":
      return copy.sort((a, b) => a.price.amount - b.price.amount);
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [sort, setSort] = useState<MarketplaceSort>("popular");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = MOCK_LISTINGS;

    // Domain filter
    if (activeDomain !== "All") {
      list = list.filter((l) => l.domain === activeDomain);
    }

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.domain.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q)) ||
          l.description.toLowerCase().includes(q),
      );
    }

    return sortListings(list, sort);
  }, [query, activeDomain, sort]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            Agent Marketplace
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Discover production-ready agents across every industry. Deploy in
            minutes or fork and customize to fit your workflow.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 focus-within:border-emerald-500/50">
            <Search className="h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search agents by name, domain, or capability…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter & Sort Row */}
        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Domain Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_DOMAINS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  d === activeDomain
                    ? "bg-emerald-500 text-zinc-950"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600"
            >
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-zinc-800 ${
                      sort === opt.value ? "text-emerald-400" : "text-zinc-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-zinc-500">
          {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Agent Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-zinc-500">
            No agents match your search. Try a different query or filter.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/${listing.agentId}`}
                className={`group flex flex-col rounded-2xl border p-6 transition-colors hover:border-emerald-500/50 ${
                  listing.featured
                    ? "border-emerald-500/30 bg-zinc-900/80"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                {/* Featured badge */}
                {listing.featured && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    Featured
                  </span>
                )}

                {/* Avatar + Name */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-lg font-bold text-emerald-400">
                    {listing.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-zinc-100">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-zinc-500">by {listing.creator}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <DomainBadge domain={listing.domain} />
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TIER_COLORS[listing.certificationTier]}`}
                  >
                    {TIER_LABELS[listing.certificationTier]}
                  </span>
                </div>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(listing.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-700"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-zinc-500">
                    {listing.rating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-xs text-zinc-600">
                    ({listing.reviews})
                  </span>
                </div>

                {/* Downloads */}
                <div className="mb-4 flex items-center gap-1 text-xs text-zinc-500">
                  <Download className="h-3.5 w-3.5" />
                  {listing.downloads.toLocaleString()} downloads
                </div>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-zinc-100">
                    {formatPrice(listing)}
                  </span>
                  <span className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors group-hover:bg-emerald-400">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
