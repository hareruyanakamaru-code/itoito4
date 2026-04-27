import Link from "next/link";
import Image from "next/image";
import { Experience, hostName } from "@/lib/types";

const categoryColors: Record<string, string> = {
  "自然・アウトドア":     "bg-lime-100 text-lime-700",
  "アート・ものづくり":   "bg-orange-100 text-orange-700",
  "社会・お仕事探究":     "bg-blue-100 text-blue-700",
  "サイエンス・実験":     "bg-emerald-100 text-emerald-700",
  "ライフスキル・料理":   "bg-amber-100 text-amber-700",
  "料理・ものづくり":     "bg-orange-100 text-orange-700",
  "ものづくり・アート":   "bg-orange-100 text-orange-700",
  "アート・表現":         "bg-purple-100 text-purple-700",
  "探究・学び":           "bg-emerald-100 text-emerald-700",
};

const categoryEmoji: Record<string, string> = {
  "自然・アウトドア":     "🌿",
  "アート・ものづくり":   "🎨",
  "社会・お仕事探究":     "💼",
  "サイエンス・実験":     "🔬",
  "ライフスキル・料理":   "🍳",
  "料理・ものづくり":     "🍳",
  "ものづくり・アート":   "🎨",
  "アート・表現":         "🖌️",
  "探究・学び":           "🔍",
};

/* 形式バッジ設定 */
const formatConfig = {
  online:  { label: "💻 オンライン",   cls: "bg-blue-500 text-white" },
  hybrid:  { label: "🌐 ハイブリッド", cls: "bg-purple-500 text-white" },
  offline: null,
};

/* 星表示 */
function StarRow({ rating, count }: { rating: number; count: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      <span className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`text-[13px] ${n <= full ? "text-amber-400" : "text-stone-200"}`}>★</span>
        ))}
      </span>
      <span className="text-[12px] font-semibold text-stone-700">{rating.toFixed(1)}</span>
      <span className="text-[11px] text-stone-400">（{count}件）</span>
    </div>
  );
}

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const colorClass   = categoryColors[exp.category] ?? "bg-stone-100 text-stone-600";
  const emoji        = categoryEmoji[exp.category] ?? "✨";
  const dateLabel    = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const imgSrc       = exp.image && exp.image !== "null" ? exp.image : "/images/placeholder.svg";
  const hasRealImage = !!(exp.image && exp.image !== "null");
  const fmtBadge     = exp.format ? formatConfig[exp.format] : null;

  return (
    <Link href={`/experiences/${exp.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">

        {/* ── 写真エリア ── */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-amber-50 shrink-0">
          <Image
            src={imgSrc}
            alt={exp.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${hasRealImage ? "group-hover:scale-105" : ""}`}
          />
          {/* グラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* 左上バッジ列（カテゴリー + NEW / 人気） */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm w-fit ${colorClass}`}>
              {emoji} {exp.category}
            </span>
            {exp.isPopular && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-sm w-fit">
                🔥 人気
              </span>
            )}
            {exp.isNew && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm w-fit">
                ✨ NEW
              </span>
            )}
          </div>

          {/* 対象年齢バッジ（右上） */}
          {exp.targetAge && (
            <span className="absolute top-2.5 right-2.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
              {exp.targetAge}
            </span>
          )}

          {/* 形式バッジ（左下・オンライン/ハイブリッドのみ） */}
          {fmtBadge && (
            <span className={`absolute bottom-2.5 left-2.5 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm ${fmtBadge.cls}`}>
              {fmtBadge.label}
            </span>
          )}

          {/* 価格バッジ（右下・常時） */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
            <span className="font-bold text-amber-700 text-sm">¥{exp.price.toLocaleString()}</span>
            <span className="text-xs text-stone-500"> / 人</span>
          </div>
        </div>

        {/* ── テキストエリア ── */}
        <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
          {/* タイトル */}
          <h2 className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
            {exp.title}
          </h2>

          {/* 日時・場所 */}
          <div className="flex flex-col gap-1 mt-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">📅</span>
              <span className="text-xs text-stone-500">{dateLabel}　{exp.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">📍</span>
              <span className="text-xs text-stone-500">{exp.location}</span>
            </div>
          </div>

          {/* 星評価 */}
          {exp.rating != null && exp.reviewCount != null && (
            <StarRow rating={exp.rating} count={exp.reviewCount} />
          )}

          {/* パートナー名＋定員 */}
          <div className="flex items-center justify-between text-xs text-stone-400 pt-1.5 border-t border-stone-100">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-[9px]">🌿</span>
              <span>{hostName(exp.host)}</span>
            </span>
            <span>定員 {exp.capacity}名</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
