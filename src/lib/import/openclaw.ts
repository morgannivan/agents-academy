import { ImportSource, type ImportedAgent } from "./types";

/**
 * Import an agent from an OpenClaw SKILL.md URL.
 *
 * Parses the SKILL.md format, extracts metadata (name, description, tools,
 * model, and system prompt), and converts it into an AgentConfig.
 */
export async function importFromOpenClaw(
  skillUrl: string,
): Promise<ImportedAgent> {
  // TODO: fetch and parse the actual SKILL.md content from the URL
  // For now, return a realistic mock based on the SKILL.md format
  await new Promise((resolve) => setTimeout(resolve, 600));

  const skillName = new URL(skillUrl).pathname.split("/").filter(Boolean).pop()
    ?? "imported-skill";

  return {
    id: `oc-${Date.now()}`,
    name: `OpenClaw – ${skillName}`,
    description: `Agent imported from OpenClaw skill: ${skillName}`,
    source: ImportSource.OPENCLAW,
    sourceUrl: skillUrl,
    originalConfig: {
      format: "SKILL.md",
      url: skillUrl,
      metadata: {
        author: "openclaw-community",
        version: "1.0.0",
        tags: ["automation", "assistant"],
      },
    },
    convertedConfig: {
      name: skillName,
      systemPrompt:
        "You are a versatile assistant imported from an OpenClaw skill. Follow the instructions embedded in the original SKILL.md and adapt to user requests.",
      model: "gpt-4o",
      tools: ["web_search", "code_interpreter", "file_reader"],
      standards: ["OPENCLAW-SKILL-SPEC-001"],
      domain: "general",
      channel: "web",
    },
  };
}
