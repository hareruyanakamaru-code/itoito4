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
          background: "linear-gradient(160deg, #fef3c7 0%, #fdf8f0 40%, #fff7ed 100%)",
          padding: "80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景デコ：大きな円 */}
        <div style={{ position: "absolute", top: -180, right: -180, width: 600, height: 600, borderRadius: "50%", background: "rgba(245,158,11,0.10)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -120, left: -120, width: 400, height: 400, borderRadius: "50%", background: "rgba(251,146,60,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", top: 300, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(245,158,11,0.06)", display: "flex" }} />

        {/* TOP: バッジ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(90deg, #f59e0b, #fb923c)",
            borderRadius: 999,
            padding: "12px 32px",
          }}
        >
          <span style={{ fontSize: 28, color: "white", fontWeight: 700, letterSpacing: "0.06em" }}>
            🌱 子ども向け体験マッチング
          </span>
        </div>

        {/* CENTER: メインコンテンツ */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* ロゴ */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 52 }}>
            <span
              style={{
                fontSize: 148,
                fontWeight: 900,
                color: "#f59e0b",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              itoito
            </span>
          </div>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 52 }}>
            <span style={{ fontSize: 58, fontWeight: 900, color: "#292524", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
              現場が究極の学び場。
            </span>
            <span style={{ fontSize: 30, color: "#78716c", marginTop: 14, lineHeight: 1.6, textAlign: "center" }}>
              「本物」を届けるプラットフォーム
            </span>
          </div>

          {/* カテゴリ chips */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
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
                  padding: "10px 24px",
                }}
              >
                <span style={{ fontSize: 26 }}>{emoji}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: アカウント情報 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#f59e0b", letterSpacing: "0.04em" }}>
            @itoito_tankyu
          </span>
          <span style={{ fontSize: 20, color: "#a8a29e", letterSpacing: "0.04em" }}>
            itoito4.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
