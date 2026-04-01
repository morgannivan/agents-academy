// ---------------------------------------------------------------------------
// Marketplace Types
// ---------------------------------------------------------------------------

export type PricePeriod = "monthly" | "yearly" | "one_time" | "per_task";

export type CertificationTier = "community" | "verified" | "certified" | "enterprise";

export interface MarketplacePrice {
  amount: number;
  currency: string;
  period: PricePeriod;
}

export interface MarketplaceListing {
  id: string;
  agentId: string;
  name: string;
  description: string;
  domain: string;
  creator: string;
  price: MarketplacePrice;
  rating: number;
  reviews: number;
  downloads: number;
  certificationTier: CertificationTier;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export type MarketplaceSort = "popular" | "newest" | "rating" | "price";

export interface MarketplaceFilter {
  domain?: string;
  tier?: CertificationTier;
  priceRange?: { min: number; max: number };
  sort: MarketplaceSort;
}
