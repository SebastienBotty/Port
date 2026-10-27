import { ImageResponse } from "next/og";
import Arrow from "../../portfolio/Arrow";
import { getProject, languageKey } from "../../portfolio/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "en" ? "en" : "fr";
  const project = getProject(searchParams.get("project") || "");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#edf0f2", color: "#20272e", padding: "65px 75px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23 }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}>sb <Arrow size={24} /></span><span>{lang === "fr" ? "DÉVELOPPEUR FULL STACK / BELGIQUE" : "FULL STACK DEVELOPER / BELGIUM"}</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: project ? 79 : 105, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-5px" }}><span>{project ? project.projectName[languageKey(lang)] : "SÉBASTIEN"}</span><span style={{ color: "#466273" }}>{project ? "SÉBASTIEN BOTTY." : "BOTTY."}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #c8d0d6", paddingTop: 24, fontSize: 23 }}><span>{lang === "fr" ? "Code, idées & projets qui prennent vie." : "Code, ideas & projects coming to life."}</span><span style={{ display: "flex", alignItems: "center", gap: 8 }}>sebastienbotty.com <Arrow size={24} /></span></div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } },
  );
}
