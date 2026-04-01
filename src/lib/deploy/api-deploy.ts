import type { DeployConfig, DeployStatus } from "./types";
import { DeployChannel } from "./types";

export async function deployToAPI(
  agentConfig: DeployConfig,
): Promise<DeployStatus> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const agentSlug = agentConfig.agentId.replace(/\s+/g, "-").toLowerCase();

  return {
    id: `deploy-api-${Date.now()}`,
    channel: DeployChannel.API,
    status: "live",
    url: `https://api.agents.academy/v1/agents/${agentSlug}`,
    createdAt: new Date(),
  };
}
