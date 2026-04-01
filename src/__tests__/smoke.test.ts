import { describe, it, expect } from "vitest";

describe("Page smoke tests — each page module imports without error", () => {
  it("src/app/page.tsx exports a default component", async () => {
    const mod = await import("@/app/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/auth/signin/page.tsx exports a default component", async () => {
    const mod = await import("@/app/auth/signin/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/build/page.tsx exports a default component", async () => {
    const mod = await import("@/app/build/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/certify/page.tsx exports a default component", async () => {
    const mod = await import("@/app/certify/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/courses/page.tsx exports a default component", async () => {
    const mod = await import("@/app/courses/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/marketplace/page.tsx exports a default component", async () => {
    const mod = await import("@/app/marketplace/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/profile/page.tsx exports a default component", async () => {
    const mod = await import("@/app/profile/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });

  it("src/app/train/page.tsx exports a default component", async () => {
    const mod = await import("@/app/train/page");
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe("function");
  });
});
