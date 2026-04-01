import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAgentById } from "@/lib/agents/mock-agents";
import { createMockSession } from "@/lib/training/mock-session";
import type {
  StartTrainingBody,
  StartTrainingResponse,
  GetTrainingStatusResponse,
  ApiError,
} from "@/lib/api/types";

type RouteParams = { params: Promise<{ agentId: string }> };

/** In-memory store of the most recent training session per agent. */
const sessions = new Map<string, ReturnType<typeof createMockSession>>();

/** POST /api/agents/[agentId]/train – start a training session */
export async function POST(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<StartTrainingResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  let body: StartTrainingBody = {};
  try {
    body = (await request.json()) as StartTrainingBody;
  } catch {
    // body is optional — default domain comes from agent
  }

  const domain = body.domain ?? agent.domain;
  const session = createMockSession(domain);
  session.agentId = agentId;
  session.agentName = agent.name;
  sessions.set(agentId, session);

  return NextResponse.json(
    { sessionId: session.id, status: session.status, session },
    { status: 201 },
  );
}

/** GET /api/agents/[agentId]/train – get latest training status */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<GetTrainingStatusResponse | ApiError>> {
  const { agentId } = await params;

  const session = sessions.get(agentId);
  if (!session) {
    return NextResponse.json(
      { error: `No training session found for agent "${agentId}"` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    sessionId: session.id,
    status: session.status,
    session,
  });
}
