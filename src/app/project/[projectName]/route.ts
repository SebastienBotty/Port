import { NextResponse } from "next/server";
import { legacyProjectSlug, projectPath } from "../../../portfolio/projects";

export async function GET(request: Request, { params }: { params: Promise<{ projectName: string }> }) {
  const { projectName } = await params;
  const slug = legacyProjectSlug(projectName);
  if (!slug) return new Response("Project not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  return NextResponse.redirect(new URL(projectPath("fr", slug), request.url), 308);
}
