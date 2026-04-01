import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MOCK_LISTINGS } from "@/lib/marketplace/mock-listings";
import type { MarketplaceListing, CertificationTier, MarketplaceSort } from "@/lib/marketplace/types";

const VALID_SORTS: Set<string> = new Set(["popular", "newest", "rating", "price"]);
const VALID_TIERS: Set<string> = new Set(["community", "verified", "certified", "enterprise"]);

/** GET /api/marketplace – list marketplace listings with optional filters */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const domain = sp.get("domain") ?? undefined;
  const tier = sp.get("tier") ?? undefined;
  const sort = (sp.get("sort") ?? "popular") as MarketplaceSort;
  const search = sp.get("search") ?? undefined;

  // Validate sort
  if (!VALID_SORTS.has(sort)) {
    return NextResponse.json(
      { error: `Invalid sort. Must be one of: ${[...VALID_SORTS].join(", ")}` },
      { status: 400 },
    );
  }

  // Validate tier if provided
  if (tier && !VALID_TIERS.has(tier)) {
    return NextResponse.json(
      { error: `Invalid tier. Must be one of: ${[...VALID_TIERS].join(", ")}` },
      { status: 400 },
    );
  }

  let results: MarketplaceListing[] = [...MOCK_LISTINGS];

  // Filter by domain
  if (domain) {
    results = results.filter(
      (l) => l.domain.toLowerCase() === domain.toLowerCase(),
    );
  }

  // Filter by certification tier
  if (tier) {
    results = results.filter(
      (l) => l.certificationTier === (tier as CertificationTier),
    );
  }

  // Search by name/description/tags
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  // Sort
  switch (sort) {
    case "popular":
      results.sort((a, b) => b.downloads - a.downloads);
      break;
    case "newest":
      results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "price":
      results.sort((a, b) => a.price.amount - b.price.amount);
      break;
  }

  return NextResponse.json({ listings: results, total: results.length });
}
