import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type {
  UserProfile,
  UpdateProfileBody,
  UpdateProfileResponse,
  ApiError,
} from "@/lib/api/types";

/** In-memory mock user profile. */
let mockProfile: UserProfile = {
  id: "user-001",
  name: "Alex Morgan",
  email: "alex@agents.academy",
  avatar: "https://agents.academy/avatars/alex.png",
  bio: "AI agent builder & trainer. Passionate about certified, trustworthy agents.",
  company: "AgentWorks Inc.",
  agentCount: 6,
  joinedAt: "2025-03-01",
};

/** GET /api/user/profile – current user profile */
export async function GET(): Promise<NextResponse<{ profile: UserProfile }>> {
  return NextResponse.json({ profile: mockProfile });
}

/** PATCH /api/user/profile – update profile fields */
export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<UpdateProfileResponse | ApiError>> {
  let body: UpdateProfileBody;
  try {
    body = (await request.json()) as UpdateProfileBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: "\"name\" must be a non-empty string" },
        { status: 400 },
      );
    }
    mockProfile = { ...mockProfile, name: body.name.trim() };
  }

  if (body.bio !== undefined) {
    if (typeof body.bio !== "string") {
      return NextResponse.json(
        { error: "\"bio\" must be a string" },
        { status: 400 },
      );
    }
    mockProfile = { ...mockProfile, bio: body.bio };
  }

  if (body.company !== undefined) {
    if (typeof body.company !== "string") {
      return NextResponse.json(
        { error: "\"company\" must be a string" },
        { status: 400 },
      );
    }
    mockProfile = { ...mockProfile, company: body.company };
  }

  return NextResponse.json({ profile: mockProfile });
}
