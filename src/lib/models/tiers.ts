// ---------------------------------------------------------------------------
// Model Tier Gating
// ---------------------------------------------------------------------------

export enum ModelTier {
  FREE = "FREE",
  PRO = "PRO",
  CERTIFIED = "CERTIFIED",
  ENTERPRISE = "ENTERPRISE",
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "google";
  tier: ModelTier;
  costPer1kTokens: number;
  maxContext: number;
}

// ---- Model catalog --------------------------------------------------------

const MODEL_CATALOG: ModelConfig[] = [
  // FREE tier
  { id: "gpt-4o-mini",    name: "GPT-4o Mini",     provider: "openai",    tier: ModelTier.FREE,       costPer1kTokens: 0.15,  maxContext: 128_000 },
  { id: "claude-haiku",   name: "Claude Haiku",     provider: "anthropic", tier: ModelTier.FREE,       costPer1kTokens: 0.25,  maxContext: 200_000 },
  { id: "gemini-flash",   name: "Gemini Flash",     provider: "google",    tier: ModelTier.FREE,       costPer1kTokens: 0.10,  maxContext: 1_000_000 },

  // PRO tier
  { id: "gpt-4o",         name: "GPT-4o",           provider: "openai",    tier: ModelTier.PRO,        costPer1kTokens: 2.50,  maxContext: 128_000 },
  { id: "claude-sonnet",  name: "Claude Sonnet",    provider: "anthropic", tier: ModelTier.PRO,        costPer1kTokens: 3.00,  maxContext: 200_000 },
  { id: "gemini-pro",     name: "Gemini Pro",       provider: "google",    tier: ModelTier.PRO,        costPer1kTokens: 1.25,  maxContext: 2_000_000 },

  // CERTIFIED tier
  { id: "claude-opus",    name: "Claude Opus",      provider: "anthropic", tier: ModelTier.CERTIFIED,  costPer1kTokens: 15.00, maxContext: 200_000 },
  { id: "gpt-o3",         name: "GPT-o3",           provider: "openai",    tier: ModelTier.CERTIFIED,  costPer1kTokens: 12.00, maxContext: 200_000 },

  // ENTERPRISE tier (all above + custom)
  { id: "custom-model",   name: "Custom Model",     provider: "openai",    tier: ModelTier.ENTERPRISE, costPer1kTokens: 0,     maxContext: 0 },
];

// ---- Tier ordering helper -------------------------------------------------

const TIER_RANK: Record<ModelTier, number> = {
  [ModelTier.FREE]: 0,
  [ModelTier.PRO]: 1,
  [ModelTier.CERTIFIED]: 2,
  [ModelTier.ENTERPRISE]: 3,
};

// ---- Public API -----------------------------------------------------------

/**
 * Return every model the given tier is allowed to use.
 * Higher tiers include all models from lower tiers.
 */
export function getAvailableModels(tier: ModelTier): ModelConfig[] {
  return MODEL_CATALOG.filter((m) => TIER_RANK[m.tier] <= TIER_RANK[tier]);
}

/**
 * Check whether a specific model is allowed for the given tier.
 */
export function isModelAllowed(modelId: string, tier: ModelTier): boolean {
  const model = MODEL_CATALOG.find((m) => m.id === modelId);
  if (!model) return false;
  return TIER_RANK[model.tier] <= TIER_RANK[tier];
}

/**
 * Get full configuration for a model by id. Returns undefined if not found.
 */
export function getModelConfig(modelId: string): ModelConfig | undefined {
  return MODEL_CATALOG.find((m) => m.id === modelId);
}
