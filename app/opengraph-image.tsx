import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "itoito（イトイト）— 子どもの「やってみたい」をかなえる体験マッチング";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
          background: "#fdf8f0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* === 左パネル（アンバーグラデーション） === */}
        <div
          style={{
            width: 660,
            height: "100%",
            background: "linear-gradient(145deg, #f59e0b 0%, #fb923c 60%, #ea580c 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 背景デコ：大きな半透明円 */}
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 200,
              right: 40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          {/* ロゴ部分 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* バッジ */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.22)",
                borderRadius: 999,
                padding: "6px 18px",
                width: "fit-content",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 14, color: "white", fontWeight: 600, letterSpacing: "0.06em" }}>
                🌱 子ども向け体験マッチング
              </span>
            </div>

            {/* サービス名 */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  fontSize: 108,
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 4px 24px rgba(0,0,0,0.15)",
                }}
              >
                itoito
              </span>
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.15em",
                marginTop: 4,
              }}
            >
              イトイト
            </span>
          </div>

          {/* メインコピー */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.35,
                textShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              子どもの「やってみたい」を
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.35,
                textShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              本物の体験に変える。
            </span>
            <span
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.80)",
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              教師・職人・クリエイターが開く、
              <br />
              教科書にない学びの場。
            </span>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.65)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            itoito4.vercel.app
          </div>
        </div>

        {/* === 右パネル（クリーム） === */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "48px 48px",
            gap: 24,
            position: "relative",
          }}
        >
          {/* 右上デコ：ドットグリッド */}
          <div
            style={{
              position: "absolute",
              top: 32,
              right: 32,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[0, 1, 2, 3].map((row) => (
              <div key={row} style={{ display: "flex", gap: 10 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div
                    key={col}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "rgba(245,158,11,0.25)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* 見出し */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#a8a29e",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            EXPERIENCE CATEGORIES
          </div>

          {/* カテゴリカード */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              width: "100%",
            }}
          >
            {[
              { emoji: "🍳", label: "料理・ものづくり", color: "#fef3c7", border: "#fcd34d" },
              { emoji: "🌿", label: "自然・アウトドア", color: "#d1fae5", border: "#6ee7b7" },
              { emoji: "🎨", label: "アート・表現", color: "#fce7f3", border: "#f9a8d4" },
              { emoji: "🔍", label: "探究・学び", color: "#dbeafe", border: "#93c5fd" },
            ].map(({ emoji, label, color, border }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: color,
                  border: `1.5px solid ${border}`,
                  borderRadius: 16,
                  padding: "14px 20px",
                }}
              >
                <span style={{ fontSize: 32 }}>{emoji}</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#292524" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* 下部：キャッチ */}
          <div
            style={{
              fontSize: 14,
              color: "#a8a29e",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            江東区・東東京エリアから、全国へ
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
