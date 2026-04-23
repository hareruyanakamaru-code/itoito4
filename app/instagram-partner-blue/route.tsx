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
          background: "linear-gradient(150deg, #0f2027 0%, #0c1a3a 50%, #0a1628 100%)",
          padding: "80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景デコ：ブルーグロー */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 700, height: 700, borderRadius: "50%", background: "rgba(59,130,246,0.15)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(96,165,250,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", top: 420, left: 60, width: 200, height: 200, borderRadius: "50%", background: "rgba(147,197,253,0.06)", display: "flex" }} />

        {/* TOP: バッジ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(59,130,246,0.18)",
            border: "1.5px solid rgba(96,165,250,0.5)",
            borderRadius: 999,
            padding: "12px 36px",
          }}
        >
          <span style={{ fontSize: 26, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.06em" }}>
            👨‍🏫 パートナー募集中
          </span>
        </div>

        {/* CENTER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* ロゴ */}
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#60a5fa",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 40,
            }}
          >
            itoito
          </span>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 48 }}>
            <span style={{ fontSize: 62, fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              あなたの「本物」を、
            </span>
            <span style={{ fontSize: 62, fontWeight: 900, color: "#60a5fa", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              子どもたちへ。
            </span>
          </div>

          {/* 特徴リスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            {[
              { icon: "📅", text: "1回からOK・場所はどこでもOK" },
              { icon: "💰", text: "初期費用ゼロ・手数料も今なら無料" },
              { icon: "🕐", text: "自分のペースで企画・開催" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(96,165,250,0.2)",
                  borderRadius: 18,
                  padding: "18px 28px",
                }}
              >
                <span style={{ fontSize: 28 }}>{icon}</span>
                <span style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, color: "rgba(147,197,253,0.5)", letterSpacing: "0.06em", marginBottom: 4 }}>
            現場が、究極の学び場。
          </span>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#60a5fa", letterSpacing: "0.04em" }}>
            @itoito_tankyu
          </span>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            itoito4.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
