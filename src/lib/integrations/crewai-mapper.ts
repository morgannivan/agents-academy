/* ------------------------------------------------------------------
 *  CrewAI → AATS Mapper
 *
 *  Parses a CrewAI crew YAML config (as a string) and converts it into
 *  the AATS AgentConfig format used by agents.academy.
 * ------------------------------------------------------------------ */

import type { AgentConfig } from "@/lib/import/types";

/* ---- CrewAI types ---- */

export interface CrewAIAgent {
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  allow_delegation: boolean;
  verbose: boolean;
  llm?: string;
}

export interface CrewAITask {
  description: string;
  expected_output: string;
  agent: string;
}

export interface CrewAIConfig {
  agents: CrewAIAgent[];
  tasks: CrewAITask[];
}

/* ---- AATS output types ---- */

export interface AATSAgentConfig extends AgentConfig {
  katas: AATSKata[];
  mcpTools: string[];
  teamName: string;
}

export interface AATSKata {
  name: string;
  description: string;
  expectedOutput: string;
  assignedAgent: string;
}

export interface AATSTeamConfig {
  teamName: string;
  agents: AATSAgentConfig[];
  katas: AATSKata[];
}

/* ---- Concept mapping ---- */

export const CREWAI_TO_AATS_MAP = {
  Crew: "AgentTeam",
  Agent: "Agent",
  Task: "Kata",
  Tool: "MCPTool",
  Process: "Pipeline",
  "allow_delegation": "canCollaborate",
  backstory: "systemPrompt",
  goal: "objective",
  role: "name",
} as const;

/* ---- Minimal YAML key-value parser (avoids external deps) ---- */

function parseSimpleYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split("\n");
  let currentKey = "";
  let currentList: string[] | null = null;

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Skip comments and blanks
    if (line.trim().startsWith("#") || line.trim() === "") continue;

    // List item
    const listMatch = line.match(/^\s+-\s+(.+)/);
    if (listMatch && currentList) {
      currentList.push(listMatch[1].trim().replace(/^['"]|['"]$/g, ""));
      continue;
    }

    // Flush any pending list
    if (currentList) {
      result[currentKey] = currentList;
      currentList = null;
    }

    // Key: value pair
    const kvMatch = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      currentKey = key;
      const trimmed = value.trim().replace(/^['"]|['"]$/g, "");
      if (trimmed === "" || trimmed === "[]") {
        // Next lines might be a list
        currentList = [];
      } else if (trimmed === "true") {
        result[key] = true;
      } else if (trimmed === "false") {
        result[key] = false;
      } else {
        result[key] = trimmed;
      }
    }
  }

  // Flush trailing list
  if (currentList) {
    result[currentKey] = currentList;
  }

  return result;
}

/* ---- Parsers for the multi-agent YAML blocks ---- */

function parseAgentsYaml(yaml: string): CrewAIAgent[] {
  // Split by top-level agent keys (indentation = 0, ends with ":")
  const blocks = yaml.split(/^(?=\w[\w_]*:\s*$)/m).filter(Boolean);

  return blocks.map((block) => {
    const parsed = parseSimpleYaml(block);
    return {
      role: (parsed.role as string) ?? Object.keys(parsed)[0] ?? "Agent",
      goal: (parsed.goal as string) ?? "",
      backstory: (parsed.backstory as string) ?? "",
      tools: Array.isArray(parsed.tools) ? (parsed.tools as string[]) : [],
      allow_delegation: parsed.allow_delegation === true,
      verbose: parsed.verbose === true,
      llm: parsed.llm as string | undefined,
    };
  });
}

function parseTasksYaml(yaml: string): CrewAITask[] {
  const blocks = yaml.split(/^(?=\w[\w_]*:\s*$)/m).filter(Boolean);

  return blocks.map((block) => {
    const parsed = parseSimpleYaml(block);
    return {
      description: (parsed.description as string) ?? "",
      expected_output: (parsed.expected_output as string) ?? "",
      agent: (parsed.agent as string) ?? "",
    };
  });
}

/* ---- Main mapper ---- */

/**
 * Convert a CrewAI YAML configuration string into an AATS team config.
 *
 * Accepts either a combined crew.yaml (with `agents:` and `tasks:` top-level
 * keys) or a standalone agents.yaml.  Returns mock-enriched AATS output.
 */
export function mapCrewAIToAATS(crewYaml: string): AATSTeamConfig {
  const agents = parseAgentsYaml(crewYaml);
  const tasks = parseTasksYaml(crewYaml);

  const aatsAgents: AATSAgentConfig[] = agents.map((a) => ({
    name: a.role,
    systemPrompt: a.backstory || `You are ${a.role}. ${a.goal}`,
    model: a.llm ?? "gpt-4o",
    tools: a.tools,
    standards: [],
    domain: "general",
    channel: "web",
    katas: tasks
      .filter((t) => t.agent === a.role)
      .map((t) => ({
        name: t.description.slice(0, 60),
        description: t.description,
        expectedOutput: t.expected_output,
        assignedAgent: a.role,
      })),
    mcpTools: a.tools.map((tool) => `mcp:${tool}`),
    teamName: "Imported CrewAI Crew",
  }));

  const aatsKatas: AATSKata[] = tasks.map((t) => ({
    name: t.description.slice(0, 60),
    description: t.description,
    expectedOutput: t.expected_output,
    assignedAgent: t.agent,
  }));

  return {
    teamName: "Imported CrewAI Crew",
    agents: aatsAgents,
    katas: aatsKatas,
  };
}
