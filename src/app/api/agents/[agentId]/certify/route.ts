import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAgentById } from "@/lib/agents/mock-agents";
import { generateCertification } from "@/lib/certification/mock-cert";
import { CertificationTier } from "@/lib/certification/types";
import type {
  RequestCertificationBody,
  RequestCertificationResponse,
  GetCertificationStatusResponse,
  ApiError,
} from "@/lib/api/types";

type RouteParams = { params: Promise<{ agentId: string }> };

const VALID_TIERS: Record<string, CertificationTier> = {
  community: CertificationTier.COMMUNITY,
  verified: CertificationTier.VERIFIED,
  certified: CertificationTier.CERTIFIED,
};

/** POST /api/agents/[agentId]/certify – request certification */
export async function POST(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<RequestCertificationResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  let body: RequestCertificationBody = {};
  try {
    body = (await request.json()) as RequestCertificationBody;
  } catch {
    // body is optional
  }

  const domain = body.domain ?? agent.domain;
  const tierKey = (body.tier ?? "verified").toLowerCase();
  const tier = VALID_TIERS[tierKey];

  if (!tier) {
    return NextResponse.json(
      {
        error: `Invalid tier "${body.tier}". Must be one of: ${Object.keys(VALID_TIERS).join(", ")}`,
      },
      { status: 400 },
    );
  }

  const certification = generateCertification(agentId, domain, tier);

  return NextResponse.json({ certification }, { status: 201 });
}

/** GET /api/agents/[agentId]/certify – get current certification status */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<GetCertificationStatusResponse | ApiError>> {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    return NextResponse.json(
      { error: `Agent "${agentId}" not found` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    agentId,
    certifications: agent.certifications,
  });
}
