import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAgentById } from "@/lib/agents/mock-agents";
import { DeployChannel } from "@/lib/deploy/types";
import type { DeployStatus } from "@/lib/deploy/types";
import type { DeployAgentBody, DeployAgentResponse, ApiError } from "@/lib/api/types";

type RouteParams = { params: Promise<{ agentId: string }> };

const CHANNEL_URLS: Record<DeployChannel, string> = {
  [DeployChannel.API]: "https://api.agents.academy/v1/agents",
  [DeployChannel.WEB_WIDGET]: "https://widget.agents.academy/embed",
  [DeployChannel.SLACK]: "https://slack.agents.academy",
  [DeployChannel.TELEGRAM]: "https://telegram.agents.academy",
  [DeployChannel.DISCORD]: "https://discord.agents.academy",
  [DeployChannel.SMS]: "https://sms.agents.academy",
  [DeployChannel.WHATSAPP]: "https://whatsapp.agents.academy",
  [DeployChannel.MCP_SERVER]: "https://mcp.agents.academy",
};

const validChannels = new Set(Object.values(DeployChannel));

/** POST /api/agents/[agentId]/deploy – deploy agent to a channel */
export async function POST(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<DeployAgentResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  let body: DeployAgentBody;
  try {
    body = (await request.json()) as DeployAgentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.channel || !validChannels.has(body.channel)) {
    return NextResponse.json(
      {
        error: `Invalid channel. Must be one of: ${[...validChannels].join(", ")}`,
      },
      { status: 400 },
    );
  }

  const baseUrl = CHANNEL_URLS[body.channel];
  const slug = agentId.replace(/\s+/g, "-").toLowerCase();

  const deployment: DeployStatus = {
    id: `deploy-${body.channel.toLowerCase()}-${Date.now()}`,
    channel: body.channel,
    status: "deploying",
    url: `${baseUrl}/${slug}`,
    createdAt: new Date(),
  };

  return NextResponse.json({ deployment }, { status: 201 });
}
