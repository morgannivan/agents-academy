export { ImportSource, type AgentConfig, type ImportedAgent } from "./types";
export { importFromOpenClaw } from "./openclaw";
export { importFromLangChain } from "./langchain";
export { importFromCrewAI } from "./crewai";

import { ImportSource, type ImportedAgent } from "./types";
import { importFromOpenClaw } from "./openclaw";
import { importFromLangChain } from "./langchain";
import { importFromCrewAI } from "./crewai";

/**
 * Route an import request to the appropriate importer based on the source.
 *
 * @param source - The ImportSource indicating which importer to use.
 * @param input  - Source-specific input (URL string or config object).
 */
export async function importAgent(
  source: ImportSource,
  input: string | Record<string, unknown>,
): Promise<ImportedAgent> {
  switch (source) {
    case ImportSource.OPENCLAW:
      if (typeof input !== "string") {
        throw new Error("OpenClaw import requires a skill URL string");
      }
      return importFromOpenClaw(input);

    case ImportSource.LANGCHAIN:
      if (typeof input === "string") {
        throw new Error("LangChain import requires a config object");
      }
      return importFromLangChain(input);

    case ImportSource.CREWAI:
      if (typeof input === "string") {
        throw new Error("CrewAI import requires a config object");
      }
      return importFromCrewAI(input);

    case ImportSource.GPT_STORE:
      // TODO: implement GPT Store importer
      throw new Error("GPT Store import is not yet implemented");

    case ImportSource.CUSTOM:
      // TODO: implement Custom HTTP endpoint importer
      throw new Error("Custom endpoint import is not yet implemented");

    default:
      throw new Error(`Unknown import source: ${source as string}`);
  }
}
