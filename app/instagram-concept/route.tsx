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
          background: "linear-gradient(150deg, #fff7ed 0%, #ffedd5 45%, #fef3c7 100%)",
          padding: "80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景デコ */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 650, height: 650, borderRadius: "50%", background: "rgba(251,146,60,0.15)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(245,158,11,0.10)", display: "flex" }} />
        <div style={{ position: "absolute", top: 380, left: 50, width: 200, height: 200, borderRadius: "50%", background: "rgba(251,146,60,0.08)", display: "flex" }} />

        {/* TOP: バッジ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(90deg, #f59e0b, #fb923c)",
            borderRadius: 999,
            padding: "14px 40px",
          }}
        >
          <span style={{ fontSize: 28, color: "white", fontWeight: 700, letterSpacing: "0.06em" }}>
            🌱 itoitoってなに？
          </span>
        </div>

        {/* CENTER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* ロゴ */}
          <span
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#f59e0b",
              letterSpacing: "0.08em",
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            itoito
          </span>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 48 }}>
            <span style={{ fontSize: 46, fontWeight: 900, color: "#292524", letterSpacing: "-0.01em", lineHeight: 1.35 }}>
              習い事でもない。
            </span>
            <span style={{ fontSize: 46, fontWeight: 900, color: "#292524", letterSpacing: "-0.01em", lineHeight: 1.35 }}>
              テーマパークでもない。
            </span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                「やってみたい」から始まる、
              </span>
              <span style={{ fontSize: 38, fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                本物の「学び体験」。
              </span>
            </div>
          </div>

          {/* カテゴリ chips */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { emoji: "🍳", label: "料理・ものづくり", bg: "#fef3c7", color: "#92400e" },
              { emoji: "🌿", label: "自然・アウトドア", bg: "#d1fae5", color: "#065f46" },
              { emoji: "🎨", label: "アート・表現", bg: "#fce7f3", color: "#9d174d" },
              { emoji: "🔍", label: "探究・学び", bg: "#dbeafe", color: "#1e40af" },
            ].map(({ emoji, label, bg, color }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: bg,
                  borderRadius: 999,
                  padding: "12px 26px",
                }}
              >
                <span style={{ fontSize: 26 }}>{emoji}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, color: "#d97706", letterSpacing: "0.06em", marginBottom: 4 }}>
            現場が、究極の学び場。
          </span>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#f59e0b", letterSpacing: "0.04em" }}>
            @itoito_tankyu
          </span>
          <span style={{ fontSize: 18, color: "#fbbf24", letterSpacing: "0.04em" }}>
            itoito4.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
