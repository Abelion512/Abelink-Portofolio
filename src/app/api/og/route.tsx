import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get("title") || "Ihsanuddin Salav";
    const subtitle = searchParams.get("subtitle") || "Fullstack Engineer • Builder • Learner";
    const type = searchParams.get("type") || "portfolio"; // 'project', 'achievement', 'portfolio'

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0A0A0A", // bg-base
            padding: "80px",
            fontFamily: "Inter, sans-serif",
            backgroundImage: "radial-gradient(circle at 20% 120%, rgba(108, 99, 255, 0.2) 0%, transparent 60%), radial-gradient(circle at 80% -20%, rgba(255, 101, 132, 0.2) 0%, transparent 60%)",
          }}
        >
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6C63FF, #FF6584)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "900",
              fontStyle: "italic"
            }}>
              IS
            </div>
            <div style={{ 
              fontSize: "32px", 
              fontWeight: 700, 
              color: "#EDEDED",
              letterSpacing: "-0.05em"
            }}>
              ihsanuddinsalav.me
            </div>
          </div>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px" }}>
            <div style={{ 
              fontSize: "24px", 
              color: "#6C63FF", // text-primary
              textTransform: "uppercase", 
              letterSpacing: "0.2em",
              fontWeight: 600
            }}>
              {type === "project" ? "Featured Project" : type === "achievement" ? "Milestone" : "Portfolio"}
            </div>
            <div style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              whiteSpace: "pre-wrap"
            }}>
              {title}
            </div>
            <div style={{
              fontSize: "32px",
              color: "#A1A1AA", // text-secondary
              lineHeight: 1.4,
              marginTop: "16px"
            }}>
              {subtitle}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    const error = e instanceof Error ? e : new Error("Unknown error");
    console.error("OG Image Error:", error.message);
    return new Response(`Failed to generate OG image: ${error.message}`, { status: 500 });
  }
}
