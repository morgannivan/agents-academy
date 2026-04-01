"use client";

import { useState, useCallback } from "react";
import {
  Globe,
  Terminal,
  FolderOpen,
  Database,
  MessageSquare,
  GitBranch,
  Mail,
  Plug,
  Check,
} from "lucide-react";
import { mcpRegistry, type MCPRegistryEntry } from "@/lib/mcp/registry";
import type { MCPTool } from "@/lib/mcp/client";
import { discoverTools } from "@/lib/mcp/client";

// Map icon name strings from the registry to actual Lucide components.
const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Globe,
  Terminal,
  FolderOpen,
  Database,
  MessageSquare,
  GitBranch,
  Mail,
};

interface ConnectedServer {
  entry: MCPRegistryEntry;
  tools: MCPTool[];
  /** Per-tool enabled/disabled state, keyed by tool name. */
  enabledTools: Record<string, boolean>;
}

interface MCPToolPickerProps {
  /** Callback when the set of enabled tools changes. */
  onToolsChange?: (tools: { serverId: string; toolName: string; enabled: boolean }[]) => void;
}

export default function MCPToolPicker({ onToolsChange }: MCPToolPickerProps) {
  const [connected, setConnected] = useState<Map<string, ConnectedServer>>(
    new Map(),
  );
  const [connecting, setConnecting] = useState<string | null>(null);

  // Emit current enabled-tool snapshot
  const emitChange = useCallback(
    (next: Map<string, ConnectedServer>) => {
      const tools: { serverId: string; toolName: string; enabled: boolean }[] =
        [];
      next.forEach((server, id) => {
        server.tools.forEach((t) => {
          tools.push({
            serverId: id,
            toolName: t.name,
            enabled: server.enabledTools[t.name] ?? true,
          });
        });
      });
      onToolsChange?.(tools);
    },
    [onToolsChange],
  );

  const handleConnect = async (entry: MCPRegistryEntry) => {
    if (connected.has(entry.id)) return;
    setConnecting(entry.id);
    try {
      const tools = await discoverTools(entry.defaultUrl);
      const enabled: Record<string, boolean> = {};
      tools.forEach((t) => {
        enabled[t.name] = true;
      });
      const next = new Map(connected);
      next.set(entry.id, { entry, tools, enabledTools: enabled });
      setConnected(next);
      emitChange(next);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = (id: string) => {
    const next = new Map(connected);
    next.delete(id);
    setConnected(next);
    emitChange(next);
  };

  const toggleTool = (serverId: string, toolName: string) => {
    const server = connected.get(serverId);
    if (!server) return;
    const next = new Map(connected);
    next.set(serverId, {
      ...server,
      enabledTools: {
        ...server.enabledTools,
        [toolName]: !server.enabledTools[toolName],
      },
    });
    setConnected(next);
    emitChange(next);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-zinc-100">
        MCP Tool Servers
      </h3>

      {/* ---- Available servers ---- */}
      <ul className="space-y-2">
        {mcpRegistry.map((entry) => {
          const isConnected = connected.has(entry.id);
          const isConnecting = connecting === entry.id;
          const Icon = ICON_MAP[entry.icon] ?? Globe;

          return (
            <li
              key={entry.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                  <Icon className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">
                    {entry.name}
                  </p>
                  <p className="text-xs text-zinc-500">{entry.description}</p>
                </div>
              </div>

              {isConnected ? (
                <button
                  type="button"
                  onClick={() => handleDisconnect(entry.id)}
                  className="mt-0.5 flex shrink-0 items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Check className="h-3 w-3" />
                  Connected
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleConnect(entry)}
                  disabled={isConnecting}
                  className="mt-0.5 flex shrink-0 items-center gap-1 rounded-md border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-50"
                >
                  <Plug className="h-3 w-3" />
                  {isConnecting ? "Connecting…" : "Connect"}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* ---- Connected tools with toggles ---- */}
      {connected.size > 0 && (
        <div className="mt-4 border-t border-zinc-800 pt-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Active Tools
          </h4>
          <ul className="space-y-1.5">
            {Array.from(connected.entries()).flatMap(([serverId, server]) =>
              server.tools.map((tool) => (
                <li
                  key={`${serverId}-${tool.name}`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-zinc-800/50"
                >
                  <div className="min-w-0">
                    <span className="text-zinc-200">{tool.name}</span>
                    <span className="ml-2 text-xs text-zinc-600">
                      {server.entry.name}
                    </span>
                  </div>

                  {/* Toggle switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={server.enabledTools[tool.name]}
                    onClick={() => toggleTool(serverId, tool.name)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                      server.enabledTools[tool.name]
                        ? "bg-emerald-500"
                        : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${
                        server.enabledTools[tool.name]
                          ? "translate-x-4"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </li>
              )),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
