import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BlueDino — 투자 계산기와 금융 가이드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0b1220 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            B
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            BlueDino
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            투자 계산기와 금융 가이드를 한곳에서
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            배당 · 복리 · FIRE · 양도세 · 절세계좌 정보를 개인 투자자 관점에서 정리
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "22px",
            color: "#cbd5f5",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(34, 211, 238, 0.12)",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              color: "#67e8f9",
            }}
          >
            복리 계산기
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#93c5fd",
            }}
          >
            FIRE · 배당
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(168, 85, 247, 0.12)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              color: "#d8b4fe",
            }}
          >
            절세계좌 · ISA · IRP
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
