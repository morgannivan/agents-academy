/* ------------------------------------------------------------------
 *  LangChain → AATS Mapper
 *
 *  Converts a LangChain agent / chain JSON configuration into the AATS
 *  AgentConfig format used by agents.academy.
 * ------------------------------------------------------------------ */

import type { AgentConfig } from "@/lib/import/types";

/* ---- LangChain types ---- */

export interface LangChainTool {
  name: string;
  description: string;
  type: "tool" | "toolkit" | "retriever";
}

export interface LangChainMemory {
  type: "buffer" | "summary" | "vector" | "conversation" | "entity";
  max_token_limit?: number;
  return_messages?: boolean;
  k?: number;
}

export interface LangChainLLM {
  model_name: string;
  temperature: number;
  max_tokens?: number;
  provider: "openai" | "anthropic" | "google" | "huggingface" | "custom";
}

export interface LangChainAgentConfig {
  name: string;
  agent_type:
    | "zero-shot-react"
    | "conversational-react"
    | "openai-functions"
    | "openai-tools"
    | "structured-chat"
    | "plan-and-execute"
    | "custom";
  llm: LangChainLLM;
  tools: LangChainTool[];
  memory?: LangChainMemory;
  prompt_template?: string;
  system_message?: string;
  max_iterations?: number;
  verbose?: boolean;
}

/* ---- AATS output types ---- */

export interface AATSPipelineConfig extends AgentConfig {
  pipelineType: string;
  context: AATSContext;
  mcpTools: string[];
}

export interface AATSContext {
  type: string;
  maxTokens: number;
  returnMessages: boolean;
}

/* ---- Concept mapping ---- */

export const LANGCHAIN_TO_AATS_MAP = {
  Chain: "AgentPipeline",
  Agent: "Agent",
  Tool: "MCPTool",
  Memory: "Context",
  "PromptTemplate": "SystemPrompt",
  "LLM": "Model",
  "VectorStore": "KnowledgeBase",
  "Retriever": "ContextRetriever",
} as const;

/* ---- Main mapper ---- */

/**
 * Convert a LangChain agent configuration object into an AATS pipeline config.
 *
 * Accepts a plain object (parsed from JSON) matching the LangChain agent
 * export schema.  Returns mock-enriched AATS output.
 */
export function mapLangChainToAATS(
  config: Record<string, unknown>,
): AATSPipelineConfig {
  const lc = config as unknown as Partial<LangChainAgentConfig>;

  const name = lc.name ?? (config.agent_name as string) ?? "LangChain Agent";
  const llmModel = lc.llm?.model_name ?? (config.llm as string) ?? "gpt-4o";
  const agentType = lc.agent_type ?? "openai-functions";

  // Map tools
  const rawTools: string[] = Array.isArray(lc.tools)
    ? lc.tools.map((t) =>
        typeof t === "string" ? t : (t as LangChainTool).name,
      )
    : Array.isArray(config.tools)
      ? (config.tools as string[])
      : ["serpapi", "llm_math"];

  // Map memory → context
  const memory = lc.memory;
  const context: AATSContext = {
    type: memory?.type ?? "buffer",
    maxTokens: memory?.max_token_limit ?? 4096,
    returnMessages: memory?.return_messages ?? true,
  };

  // System prompt
  const systemPrompt =
    lc.system_message ??
    lc.prompt_template ??
    (config.prompt_template as string) ??
    `You are ${name}, an AI assistant. Use available tools to answer questions accurately.`;

  return {
    name,
    systemPrompt,
    model: llmModel,
    tools: rawTools,
    standards: [],
    domain: (config.domain as string) ?? "general",
    channel: "web",
    pipelineType: agentType,
    context,
    mcpTools: rawTools.map((tool) => `mcp:${tool}`),
  };
}
