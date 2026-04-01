// ---------------------------------------------------------------------------
// LLM Provider Configurations
// ---------------------------------------------------------------------------

export interface LLMProvider {
  name: string;
  baseUrl: string;
  models: string[];
  /** Name of the environment variable that holds the API key. */
  authEnvVar: string;
}

export const providers: Record<string, LLMProvider> = {
  openai: {
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    models: ["gpt-4o-mini", "gpt-4o", "gpt-o3"],
    authEnvVar: "OPENAI_API_KEY",
  },
  anthropic: {
    name: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    models: ["claude-haiku", "claude-sonnet", "claude-opus"],
    authEnvVar: "ANTHROPIC_API_KEY",
  },
  google: {
    name: "Google",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    models: ["gemini-flash", "gemini-pro"],
    authEnvVar: "GOOGLE_AI_API_KEY",
  },
};

/** Look up the provider that owns a given model id. */
export function getProviderForModel(modelId: string): LLMProvider | undefined {
  return Object.values(providers).find((p) => p.models.includes(modelId));
}
