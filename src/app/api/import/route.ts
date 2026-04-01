import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { importAgent, ImportSource } from "@/lib/import";
import type { ImportAgentBody, ImportAgentResponse, ApiError } from "@/lib/api/types";

const VALID_SOURCES = new Set(Object.values(ImportSource));

/** POST /api/import – import agent from external source */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImportAgentResponse | ApiError>> {
  let body: ImportAgentBody;
  try {
    body = (await request.json()) as ImportAgentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.source || !VALID_SOURCES.has(body.source)) {
    return NextResponse.json(
      {
        error: `Invalid source. Must be one of: ${[...VALID_SOURCES].join(", ")}`,
      },
      { status: 400 },
    );
  }

  // Determine the input for the importer
  const input: string | Record<string, unknown> = body.url ?? body.config ?? {};

  try {
    const agent = await importAgent(body.source, input);
    return NextResponse.json({ agent }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Import failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
