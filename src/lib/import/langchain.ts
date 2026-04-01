import { ImportSource, type ImportedAgent } from "./types";

/**
 * Import an agent from a LangChain chain / agent JSON configuration.
 *
 * Maps LangChain-specific fields (llm, tools, prompt template, memory) to the
 * platform AgentConfig format.
 */
export async function importFromLangChain(
  config: Record<string, unknown>,
): Promise<ImportedAgent> {
  // TODO: implement real conversion of LangChain config
  // For now, return a realistic mock derived from the incoming config shape
  await new Promise((resolve) => setTimeout(resolve, 500));

  const name =
    (config.name as string) ??
    (config.agent_name as string) ??
    "LangChain Agent";

  const tools = Array.isArray(config.tools)
    ? (config.tools as string[])
    : ["serpapi", "llm_math"];

  return {
    id: `lc-${Date.now()}`,
    name,
    description: `Agent imported from a LangChain configuration`,
    source: ImportSource.LANGCHAIN,
    sourceUrl: "",
    originalConfig: config,
    convertedConfig: {
      name,
      systemPrompt:
        (config.prompt_template as string) ??
        "You are a helpful AI assistant built with LangChain. Use available tools to answer questions accurately.",
      model: (config.llm as string) ?? "gpt-4o",
      tools,
      standards: [],
      domain: (config.domain as string) ?? "general",
      channel: "web",
    },
  };
}
