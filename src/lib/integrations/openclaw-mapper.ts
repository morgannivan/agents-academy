/* ------------------------------------------------------------------
 *  OpenClaw → AATS Mapper
 *
 *  Parses a SKILL.md file (as a raw string) and converts it into the
 *  AATS AgentConfig format used by agents.academy.
 *
 *  SKILL.md format:
 *    - Title line: `# Skill Name`
 *    - Body: Markdown description
 *    - YAML front-matter or inline metadata block with:
 *        openclaw.requires: [tool1, tool2]
 *        openclaw.model: gpt-4o
 *        openclaw.author: username
 * ------------------------------------------------------------------ */

import type { AgentConfig } from "@/lib/import/types";

/* ---- OpenClaw types ---- */

export interface OpenClawMetadata {
  name: string;
  author: string;
  version: string;
  model: string;
  requires: string[];
  tags: string[];
}

export interface OpenClawSkill {
  name: string;
  description: string;
  soulMd: string;
  metadata: OpenClawMetadata;
}

/* ---- AATS output types ---- */

export interface AATSOpenClawConfig extends AgentConfig {
  mcpTools: string[];
  sourceFormat: "SKILL.md";
  trustScore: number;
  certificationRequired: boolean;
}

/* ---- Concept mapping ---- */

export const OPENCLAW_TO_AATS_MAP = {
  Skill: "Agent",
  "soul.md": "SystemPrompt",
  tools: "MCPTools",
  "Claw Hub": "AgentMarketplace",
  author: "creator",
  requires: "dependencies",
} as const;

/* ---- SKILL.md parser ---- */

function extractFrontMatter(
  content: string,
): Record<string, string | string[]> {
  const meta: Record<string, string | string[]> = {};

  // Try YAML front-matter between --- delimiters
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const fmBlock = fmMatch?.[1] ?? "";

  if (fmBlock) {
    for (const line of fmBlock.split("\n")) {
      const kvMatch = line.match(/^([\w.]+):\s*(.+)/);
      if (!kvMatch) continue;

      const [, key, rawValue] = kvMatch;
      const value = rawValue.trim();

      // Parse inline arrays: [a, b, c]
      const arrayMatch = value.match(/^\[(.+)]$/);
      if (arrayMatch) {
        meta[key] = arrayMatch[1].split(",").map((s) => s.trim());
      } else {
        meta[key] = value;
      }
    }
  }

  return meta;
}

function extractTitle(content: string): string {
  // First H1 heading
  const match = content.match(/^#\s+(.+)/m);
  return match?.[1]?.trim() ?? "Unnamed Skill";
}

function extractDescription(content: string): string {
  // Everything between the title and the first ## or end-of-file,
  // excluding front-matter.
  const withoutFm = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const withoutTitle = withoutFm.replace(/^#\s+.+\n?/, "");
  const nextHeading = withoutTitle.indexOf("\n## ");
  const body =
    nextHeading > -1 ? withoutTitle.slice(0, nextHeading) : withoutTitle;
  return body.trim().slice(0, 500);
}

/**
 * Parse a raw SKILL.md string into a structured OpenClawSkill.
 */
export function parseSkillMd(skillMd: string): OpenClawSkill {
  const frontMatter = extractFrontMatter(skillMd);
  const name = extractTitle(skillMd);
  const description = extractDescription(skillMd);

  const requires = Array.isArray(frontMatter["openclaw.requires"])
    ? (frontMatter["openclaw.requires"] as string[])
    : typeof frontMatter["openclaw.requires"] === "string"
      ? [frontMatter["openclaw.requires"]]
      : [];

  const tags = Array.isArray(frontMatter["openclaw.tags"])
    ? (frontMatter["openclaw.tags"] as string[])
    : [];

  return {
    name,
    description,
    soulMd: skillMd,
    metadata: {
      name,
      author: (frontMatter["openclaw.author"] as string) ?? "community",
      version: (frontMatter["openclaw.version"] as string) ?? "1.0.0",
      model: (frontMatter["openclaw.model"] as string) ?? "gpt-4o",
      requires,
      tags,
    },
  };
}

/* ---- Main mapper ---- */

/**
 * Convert a raw SKILL.md string into an AATS agent config.
 *
 * Extracts the skill name from the title, description from the body,
 * and tools from `openclaw.requires` metadata.
 */
export function mapOpenClawToAATS(skillMd: string): AATSOpenClawConfig {
  const skill = parseSkillMd(skillMd);

  return {
    name: skill.name,
    systemPrompt: skill.soulMd,
    model: skill.metadata.model,
    tools: skill.metadata.requires,
    standards: ["OPENCLAW-SKILL-SPEC-001"],
    domain: "general",
    channel: "web",
    mcpTools: skill.metadata.requires.map((tool) => `mcp:${tool}`),
    sourceFormat: "SKILL.md",
    trustScore: 0, // No certification yet — that's the point
    certificationRequired: true,
  };
}
