import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import path from "path";

describe("models/tiers.ts", () => {
  const tiersPath = path.resolve(__dirname, "../lib/models/tiers.ts");

  it("src/lib/models/tiers.ts does not exist yet — tests skipped", () => {
    expect(existsSync(tiersPath)).toBe(false);
  });
});
