// ---------------------------------------------------------------------------
// MCP (Model Context Protocol) Client
// Stub implementation — interfaces are the contract; functions return mock data.
// ---------------------------------------------------------------------------

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
}

export interface MCPServer {
  url: string;
  name: string;
  description: string;
  tools: MCPTool[];
}

// ---- Stub helpers ---------------------------------------------------------

const MOCK_SERVERS: MCPServer[] = [
  {
    url: "https://mcp.example.com/web-search",
    name: "web-search",
    description: "Search the web for real-time information",
    tools: [
      {
        name: "search",
        description: "Perform a web search and return results",
        inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
        outputSchema: { type: "array", items: { type: "object" } },
      },
    ],
  },
  {
    url: "https://mcp.example.com/code-executor",
    name: "code-executor",
    description: "Execute code in a sandboxed environment",
    tools: [
      {
        name: "run",
        description: "Run a code snippet and return stdout/stderr",
        inputSchema: {
          type: "object",
          properties: { language: { type: "string" }, code: { type: "string" } },
          required: ["language", "code"],
        },
        outputSchema: { type: "object", properties: { stdout: { type: "string" }, stderr: { type: "string" } } },
      },
    ],
  },
];

// ---- Public API -----------------------------------------------------------

/**
 * Discover the tools exposed by an MCP server.
 * Stub: returns mock tools for known URLs, empty array otherwise.
 */
export async function discoverTools(serverUrl: string): Promise<MCPTool[]> {
  const server = MOCK_SERVERS.find((s) => s.url === serverUrl);
  return server?.tools ?? [];
}

/**
 * Invoke a specific tool on a remote MCP server.
 * Stub: returns a placeholder result object.
 */
export async function invokeTool(
  serverUrl: string,
  toolName: string,
  input: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  // In a real implementation this would POST to the server's tool endpoint.
  return {
    ok: true,
    serverUrl,
    toolName,
    input,
    result: `Mock result for ${toolName}`,
  };
}

/**
 * List all MCP servers that are currently connected / registered.
 * Stub: returns the built-in mock servers.
 */
export async function listConnectedServers(): Promise<MCPServer[]> {
  return MOCK_SERVERS;
}
