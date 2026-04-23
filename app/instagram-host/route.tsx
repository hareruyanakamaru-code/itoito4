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
          background: "linear-gradient(160deg, #292524 0%, #1c1917 60%, #0c0a09 100%)",
          padding: "80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景デコ：グロー円 */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 700, height: 700, borderRadius: "50%", background: "rgba(245,158,11,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(251,146,60,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", top: 400, left: 80, width: 160, height: 160, borderRadius: "50%", background: "rgba(245,158,11,0.06)", display: "flex" }} />

        {/* TOP: バッジ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(245,158,11,0.15)",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 999,
            padding: "12px 32px",
          }}
        >
          <span style={{ fontSize: 26, color: "#f59e0b", fontWeight: 700, letterSpacing: "0.06em" }}>
            👨‍🏫 先生・職人・クリエイター募集
          </span>
        </div>

        {/* CENTER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* ロゴ */}
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#f59e0b",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 40,
            }}
          >
            itoito
          </span>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 48 }}>
            <span style={{ fontSize: 64, fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              あなたの「本物」を、
            </span>
            <span style={{ fontSize: 64, fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              子どもたちへ。
            </span>
          </div>

          {/* 特徴リスト */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            {[
              "1回からOK・場所はどこでもOK",
              "初期費用ゼロ・手数料も今なら無料",
              "自分のペースで企画・開催",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "16px 24px",
                }}
              >
                <span style={{ fontSize: 24, color: "#f59e0b", fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 26, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", marginBottom: 4 }}>
            現場が、究極の学び場。
          </span>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#f59e0b", letterSpacing: "0.04em" }}>
            @itoito_tankyu
          </span>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
            itoito4.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
