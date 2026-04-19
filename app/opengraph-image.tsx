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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 40%, #ffedd5 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* 背景デコレーション：大きな円 */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(251,146,60,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(245,158,11,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(251,146,60,0.08)",
          }}
        />

        {/* ドットパターン風のデコ（左上） */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.3)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* ブランドラベル */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(251,146,60,0.15)",
              border: "1.5px solid rgba(251,146,60,0.35)",
              borderRadius: 999,
              padding: "8px 24px",
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 18, color: "#d97706" }}>🌱</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#b45309",
                letterSpacing: "0.04em",
              }}
            >
              教科書には載っていない学びがある
            </span>
          </div>

          {/* サービス名 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#f59e0b",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              itoito
            </span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#78716c",
                letterSpacing: "0.06em",
              }}
            >
              イトイト
            </span>
          </div>

          {/* メインコピー */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#292524",
                letterSpacing: "0.01em",
                lineHeight: 1.3,
              }}
            >
              子どもの「やってみたい」を、
            </span>
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#f59e0b",
                letterSpacing: "0.01em",
                lineHeight: 1.3,
              }}
            >
              本物の体験に変える。
            </span>
          </div>

          {/* サブコピー */}
          <p
            style={{
              fontSize: 20,
              color: "#78716c",
              lineHeight: 1.6,
              maxWidth: 700,
              margin: 0,
            }}
          >
            教師・職人・クリエイターが開く体験の場。
            子どもの好奇心をプロと一緒に解き放とう。
          </p>
        </div>

        {/* 下部：カテゴリバッジ */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            gap: 12,
          }}
        >
          {["🍳 料理・ものづくり", "🌿 自然・アウトドア", "🎨 アート・表現", "🔍 探究・学び"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "white",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#78716c",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* 右下：URL */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 56,
            fontSize: 15,
            color: "#a8a29e",
            fontWeight: 500,
          }}
        >
          itoito4.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
