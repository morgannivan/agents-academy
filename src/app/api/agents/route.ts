import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MOCK_AGENTS } from "@/lib/agents/mock-agents";
import type {
  CreateAgentBody,
  CreateAgentResponse,
  ListAgentsResponse,
  ApiError,
} from "@/lib/api/types";
import type { AgentProfile } from "@/lib/agents/types";

/** GET /api/agents – list all agents */
export async function GET(): Promise<NextResponse<ListAgentsResponse>> {
  return NextResponse.json({ agents: MOCK_AGENTS });
}

/** POST /api/agents – create a new agent */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateAgentResponse | ApiError>> {
  let body: CreateAgentBody;
  try {
    body = (await request.json()) as CreateAgentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json(
      { error: "\"name\" is required and must be a string" },
      { status: 400 },
    );
  }
  if (!body.domain || typeof body.domain !== "string") {
    return NextResponse.json(
      { error: "\"domain\" is required and must be a string" },
      { status: 400 },
    );
  }

  const id = `agent-${Date.now()}`;
  const now = new Date().toISOString().slice(0, 10);

  const agent: AgentProfile = {
    id,
    name: body.name,
    description: body.config?.description ?? "",
    domain: body.domain,
    creator: "Current User",
    model: body.config?.model ?? "gpt-4o",
    tools: body.config?.tools ?? [],
    certifications: [],
    deployments: [],
    stats: {
      totalTrainingRuns: 0,
      katasCompleted: 0,
      averageScore: 0,
      rankInDomain: 0,
      createdAt: now,
      lastTrained: now,
    },
    agentCard: {
      agent_id: id,
      name: body.name,
      description: body.config?.description ?? "",
      capabilities: [],
      certified_by: "",
      cert_tier: "bronze",
      cert_seal: "",
      cert_issued: "",
      cert_expires: "",
      consistency_score: 0,
      url: `https://agents.academy/profile/${id}`,
    },
  };

  return NextResponse.json({ agent }, { status: 201 });
}
