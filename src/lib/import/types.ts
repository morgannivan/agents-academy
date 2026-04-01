export enum ImportSource {
  OPENCLAW = "openclaw",
  LANGCHAIN = "langchain",
  CREWAI = "crewai",
  GPT_STORE = "gpt_store",
  CUSTOM = "custom",
}

export interface AgentConfig {
  name: string;
  systemPrompt: string;
  model: string;
  tools: string[];
  standards: string[];
  domain: string;
  channel: string;
}

export interface ImportedAgent {
  id: string;
  name: string;
  description: string;
  source: ImportSource;
  sourceUrl: string;
  originalConfig: Record<string, unknown>;
  convertedConfig: AgentConfig;
}
