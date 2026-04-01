import { ImportSource, type ImportedAgent } from "./types";

/**
 * Import an agent from a CrewAI crew YAML configuration (parsed to an object).
 *
 * Maps CrewAI fields (role, goal, backstory, tools, llm) to the platform
 * AgentConfig format.
 */
export async function importFromCrewAI(
  crewConfig: Record<string, unknown>,
): Promise<ImportedAgent> {
  // TODO: implement real YAML-to-AgentConfig conversion
  // For now, return a realistic mock based on typical CrewAI crew structure
  await new Promise((resolve) => setTimeout(resolve, 550));

  const role = (crewConfig.role as string) ?? "Crew Agent";
  const goal = (crewConfig.goal as string) ?? "";
  const backstory = (crewConfig.backstory as string) ?? "";

  const tools = Array.isArray(crewConfig.tools)
    ? (crewConfig.tools as string[])
    : ["search_tool", "scrape_tool"];

  return {
    id: `ca-${Date.now()}`,
    name: role,
    description: goal || `CrewAI agent: ${role}`,
    source: ImportSource.CREWAI,
    sourceUrl: "",
    originalConfig: crewConfig,
    convertedConfig: {
      name: role,
      systemPrompt:
        backstory ||
        `You are ${role}. ${goal} Collaborate with your crew to deliver high-quality results.`,
      model: (crewConfig.llm as string) ?? "gpt-4o",
      tools,
      standards: [],
      domain: (crewConfig.domain as string) ?? "general",
      channel: "web",
    },
  };
}
