import { describe, it, expect } from "vitest";
import { getAvailableModels, isModelAllowed, ModelTier } from "../lib/models/tiers";

describe("models/tiers.ts", () => {
  it("FREE tier includes budget models", () => {
    const models = getAvailableModels(ModelTier.FREE);
    expect(models.length).toBeGreaterThan(0);
  });

  it("PRO tier includes more models than FREE", () => {
    const free = getAvailableModels(ModelTier.FREE);
    const pro = getAvailableModels(ModelTier.PRO);
    expect(pro.length).toBeGreaterThan(free.length);
  });

  it("gating prevents free users from accessing pro models", () => {
    const proModels = getAvailableModels(ModelTier.PRO);
    const freeModels = getAvailableModels(ModelTier.FREE);
    const proOnly = proModels.filter(
      (m) => !freeModels.some((f) => f.id === m.id)
    );
    if (proOnly.length > 0) {
      expect(isModelAllowed(proOnly[0].id, ModelTier.FREE)).toBe(false);
    }
  });
});
