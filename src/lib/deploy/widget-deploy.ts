import type { DeployConfig, DeployStatus } from "./types";
import { DeployChannel } from "./types";

export function getEmbedSnippet(agentId: string): string {
  const slug = agentId.replace(/\s+/g, "-").toLowerCase();
  return `<script src="https://cdn.agents.academy/widget.js" data-agent="${slug}"></script>`;
}

export async function deployToWidget(
  agentConfig: DeployConfig,
): Promise<DeployStatus> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const agentSlug = agentConfig.agentId.replace(/\s+/g, "-").toLowerCase();

  return {
    id: `deploy-widget-${Date.now()}`,
    channel: DeployChannel.WEB_WIDGET,
    status: "live",
    url: `https://widget.agents.academy/embed/${agentSlug}`,
    createdAt: new Date(),
  };
}
