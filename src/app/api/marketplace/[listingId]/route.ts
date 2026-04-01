import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MOCK_LISTINGS } from "@/lib/marketplace/mock-listings";
import type { ApiError } from "@/lib/api/types";
import type { MarketplaceListing } from "@/lib/marketplace/types";

type RouteParams = { params: Promise<{ listingId: string }> };

/** GET /api/marketplace/[listingId] – single listing detail */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<{ listing: MarketplaceListing } | ApiError>> {
  const { listingId } = await params;

  const listing = MOCK_LISTINGS.find((l) => l.id === listingId);
  if (!listing) {
    return NextResponse.json(
      { error: `Listing "${listingId}" not found` },
      { status: 404 },
    );
  }

  return NextResponse.json({ listing });
}
