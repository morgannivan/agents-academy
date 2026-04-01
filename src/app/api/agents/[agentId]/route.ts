import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAgentById, MOCK_AGENTS } from "@/lib/agents/mock-agents";
import type {
  GetAgentResponse,
  UpdateAgentBody,
  UpdateAgentResponse,
  ApiError,
} from "@/lib/api/types";

type RouteParams = { params: Promise<{ agentId: string }> };

/** GET /api/agents/[agentId] – single agent detail */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<GetAgentResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  return NextResponse.json({ agent });
}

/** PATCH /api/agents/[agentId] – update agent config */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<UpdateAgentResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  let body: UpdateAgentBody;
  try {
    body = (await request.json()) as UpdateAgentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Apply partial updates (in-memory only for mock)
  const updated = { ...agent };
  if (body.name !== undefined) updated.name = body.name;
  if (body.description !== undefined) updated.description = body.description;
  if (body.model !== undefined) updated.model = body.model;
  if (body.tools !== undefined) updated.tools = body.tools;
  if (body.domain !== undefined) updated.domain = body.domain;

  // Reflect in the mock array so subsequent GETs are consistent within session
  const idx = MOCK_AGENTS.findIndex((a) => a.id === agentId);
  if (idx !== -1) MOCK_AGENTS[idx] = updated;

  return NextResponse.json({ agent: updated });
}
