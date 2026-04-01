// ---------------------------------------------------------------------------
// MCP Server Registry — curated catalog of popular servers users can connect.
// ---------------------------------------------------------------------------

export type MCPCategory = "search" | "compute" | "storage" | "communication" | "devtools" | "productivity";

export interface MCPRegistryEntry {
  id: string;
  name: string;
  description: string;
  category: MCPCategory;
  /** Lucide icon name (used by the UI to render the correct icon). */
  icon: string;
  /** Default endpoint URL template. */
  defaultUrl: string;
}

export const mcpRegistry: MCPRegistryEntry[] = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for real-time information and return structured results.",
    category: "search",
    icon: "Globe",
    defaultUrl: "https://mcp.example.com/web-search",
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute code in a sandboxed environment supporting multiple languages.",
    category: "compute",
    icon: "Terminal",
    defaultUrl: "https://mcp.example.com/code-executor",
  },
  {
    id: "file-system",
    name: "File System",
    description: "Read, write, and manage files in a secure virtual file system.",
    category: "storage",
    icon: "FolderOpen",
    defaultUrl: "https://mcp.example.com/file-system",
  },
  {
    id: "database",
    name: "Database",
    description: "Query and manage SQL and NoSQL databases with natural language.",
    category: "storage",
    icon: "Database",
    defaultUrl: "https://mcp.example.com/database",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, read channels, and manage Slack workspace interactions.",
    category: "communication",
    icon: "MessageSquare",
    defaultUrl: "https://mcp.example.com/slack",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Manage repositories, issues, pull requests, and GitHub Actions workflows.",
    category: "devtools",
    icon: "GitBranch",
    defaultUrl: "https://mcp.example.com/github",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    description: "Access Gmail, Google Docs, Sheets, Calendar, and Drive resources.",
    category: "productivity",
    icon: "Mail",
    defaultUrl: "https://mcp.example.com/google-workspace",
  },
];

/** Look up a registry entry by id. */
export function getRegistryEntry(id: string): MCPRegistryEntry | undefined {
  return mcpRegistry.find((entry) => entry.id === id);
}

/** Filter registry entries by category. */
export function getEntriesByCategory(category: MCPCategory): MCPRegistryEntry[] {
  return mcpRegistry.filter((entry) => entry.category === category);
}
