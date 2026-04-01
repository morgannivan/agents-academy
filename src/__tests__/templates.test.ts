import { describe, it, expect } from "vitest";
import { templates } from "@/lib/templates";

describe("templates.ts", () => {
  it("exports an array of exactly 10 templates", () => {
    expect(Array.isArray(templates)).toBe(true);
    expect(templates).toHaveLength(10);
  });

  it.each(templates)("template '$name' has all required fields", (template) => {
    expect(template).toHaveProperty("id");
    expect(template).toHaveProperty("name");
    expect(template).toHaveProperty("emoji");
    expect(template).toHaveProperty("description");
    expect(template).toHaveProperty("domain");
    expect(template).toHaveProperty("defaultConfig");

    expect(typeof template.id).toBe("string");
    expect(typeof template.name).toBe("string");
    expect(typeof template.emoji).toBe("string");
    expect(typeof template.description).toBe("string");
    expect(typeof template.domain).toBe("string");
    expect(typeof template.defaultConfig).toBe("object");
  });

  it("each template has a unique id", () => {
    const ids = templates.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each template defaultConfig has systemPrompt, tools, channel, and standards", () => {
    for (const template of templates) {
      const cfg = template.defaultConfig;
      expect(typeof cfg.systemPrompt).toBe("string");
      expect(cfg.systemPrompt.length).toBeGreaterThan(0);
      expect(Array.isArray(cfg.tools)).toBe(true);
      expect(cfg.tools.length).toBeGreaterThan(0);
      expect(typeof cfg.channel).toBe("string");
      expect(Array.isArray(cfg.standards)).toBe(true);
      expect(cfg.standards.length).toBeGreaterThan(0);
    }
  });
});
