import { ImageResponse } from "next/og";

export const alt = "yooo wasssupp — just a few questions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(165deg, #e8f6ff 0%, #b8e4ff 45%, #d4efff 75%, #ffd6e8 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 80,
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#ff4d6d",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 100,
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#ff4d6d",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 140,
            width: 20,
            height: 20,
            borderRadius: 999,
            background: "#ff4d6d",
            opacity: 0.28,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 110,
            right: 130,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: "#ff4d6d",
            opacity: 0.32,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 64px",
            borderRadius: 40,
            background: "rgba(255, 255, 255, 0.72)",
            border: "3px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 24px 64px rgba(94, 184, 240, 0.25)",
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 16 }}>🌤️</div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#2d5a7b",
              marginBottom: 12,
              letterSpacing: -1,
            }}
          >
            yooo wasssupp
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#4a7a9b",
              marginBottom: 20,
            }}
          >
            i made you something kinda silly
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 52,
            }}
          >
            <span style={{ color: "#ff4d6d" }}>❤️</span>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#7aa3c4",
              }}
            >
              answer honestly cooool?
            </span>
            <span style={{ color: "#ff4d6d" }}>❤️</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
