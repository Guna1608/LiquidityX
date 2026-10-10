import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Branded Open Graph / Twitter card image for any page:
 *   /og?title=…&eyebrow=…&subtitle=…
 * Used automatically by `pageMetadata()`; 1200×630 PNG, cached at the edge.
 */
export const runtime = "nodejs";

// [bottom, height, up] — a rising sequence
const CANDLES = [
  [10, 60, 1], [48, 40, 0], [36, 70, 1], [78, 44, 1], [92, 36, 0], [80, 80, 1], [132, 46, 1], [150, 38, 0], [140, 84, 1], [196, 50, 1], [220, 30, 0], [210, 80, 1],
] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Go Beyond Price. Understand the Market.").slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") || "LiquidityX Academy").slice(0, 60);
  const subtitle = (searchParams.get("subtitle") || "15-day curriculum · Taught in Tamil").slice(0, 120);

  const [medium, black] = await Promise.all([
    readFile(join(process.cwd(), "app/og/Satoshi-500.ttf")),
    readFile(join(process.cwd(), "app/og/Satoshi-900.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#050505", color: "#f5f5f4", fontFamily: "Satoshi", padding: 72 }}>
        <div style={{ position: "absolute", left: -200, bottom: -420, width: 900, height: 900, borderRadius: 9999, background: "radial-gradient(closest-side, rgba(82,120,255,0.55), transparent)", display: "flex" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        {/* candles */}
        <div style={{ position: "absolute", right: 70, bottom: 90, display: "flex", alignItems: "flex-end", gap: 12, height: 300 }}>
          {CANDLES.map(([bottom, h, up], i) => (
            <div key={i} style={{ position: "relative", width: 22, height: 300, display: "flex" }}>
              <div style={{ position: "absolute", left: 10, width: 2, bottom: bottom - 14, height: h + 28, background: up ? "#5fd39a" : "#ff6a4d", opacity: 0.8 }} />
              <div style={{ position: "absolute", left: 0, width: 22, bottom, height: h, borderRadius: 4, background: up ? "#5fd39a" : "#ff6a4d" }} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "64%", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 900, letterSpacing: -0.5 }}>
              LiquidityX<span style={{ color: "#a3a3a8", fontWeight: 500, marginLeft: 8 }}>Academy</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "flex-start", padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", fontSize: 22, color: "#a9b8ff", fontWeight: 500 }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: title.length > 50 ? 64 : 78, fontWeight: 900, lineHeight: 1.0, letterSpacing: -3 }}>{title}</div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#a3a3a8", fontWeight: 500 }}>{subtitle}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Satoshi", data: medium, weight: 500, style: "normal" },
        { name: "Satoshi", data: black, weight: 900, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
