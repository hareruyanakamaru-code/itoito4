import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(150deg, #e0f2fe 0%, #bae6fd 45%, #e0f7fa 100%)",
          padding: "80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景デコ */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 700, height: 700, borderRadius: "50%", background: "rgba(14,165,233,0.15)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(6,182,212,0.10)", display: "flex" }} />
        <div style={{ position: "absolute", top: 400, left: 60, width: 200, height: 200, borderRadius: "50%", background: "rgba(125,211,252,0.12)", display: "flex" }} />

        {/* TOP: バッジ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(90deg, #0284c7, #06b6d4)",
            borderRadius: 999,
            padding: "12px 36px",
          }}
        >
          <span style={{ fontSize: 26, color: "white", fontWeight: 700, letterSpacing: "0.06em" }}>
            👨‍🏫 パートナー募集中
          </span>
        </div>

        {/* CENTER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* ロゴ */}
          <span
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#0284c7",
              letterSpacing: "0.08em",
              lineHeight: 1,
              marginBottom: 40,
            }}
          >
            itoito
          </span>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 48 }}>
            <span style={{ fontSize: 62, fontWeight: 900, color: "#0c4a6e", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              あなたの「本物」を、
            </span>
            <span style={{ fontSize: 62, fontWeight: 900, color: "#0284c7", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              子どもたちへ。
            </span>
          </div>

          {/* 特徴リスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            {[
              { icon: "✌️", text: "1回からOK・資格も実績も不要" },
              { icon: "🌱", text: "好きなことが、子どもの一生の記憶に" },
              { icon: "🤝", text: "企画作りはitoitoがサポート" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  background: "rgba(255,255,255,0.6)",
                  border: "1.5px solid rgba(6,182,212,0.3)",
                  borderRadius: 18,
                  padding: "18px 28px",
                }}
              >
                <span style={{ fontSize: 28 }}>{icon}</span>
                <span style={{ fontSize: 26, color: "#0c4a6e", fontWeight: 700 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, color: "#7dd3fc", letterSpacing: "0.06em", marginBottom: 4 }}>
            現場が、究極の学び場。
          </span>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#0284c7", letterSpacing: "0.04em" }}>
            @itoito_tankyu
          </span>
          <span style={{ fontSize: 18, color: "#7dd3fc", letterSpacing: "0.04em" }}>
            itoito4.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
