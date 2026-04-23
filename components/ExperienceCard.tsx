import Link from "next/link";
import Image from "next/image";
import { Experience, hostName } from "@/lib/types";

const categoryColors: Record<string, string> = {
  "料理・ものづくり": "bg-orange-100 text-orange-700",
  "ものづくり・アート": "bg-orange-100 text-orange-700",
  "アート・表現": "bg-purple-100 text-purple-700",
  "探究・学び": "bg-emerald-100 text-emerald-700",
  "自然・アウトドア": "bg-lime-100 text-lime-700",
};

const categoryEmoji: Record<string, string> = {
  "料理・ものづくり": "🍳",
  "ものづくり・アート": "🎨",
  "アート・表現": "🖌️",
  "探究・学び": "🔍",
  "自然・アウトドア": "🌿",
};

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const colorClass =
    categoryColors[exp.category] ?? "bg-stone-100 text-stone-600";
  const emoji = categoryEmoji[exp.category] ?? "✨";
  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const imgSrc =
    exp.image && exp.image !== "null" ? exp.image : "/images/placeholder.svg";
  const hasRealImage = !!(exp.image && exp.image !== "null");

  return (
    <Link href={`/experiences/${exp.id}`} className="group block h-full">
      {/* ① hover: shadow-xl + -translate-y-1 */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">

        {/* 写真エリア */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-amber-50 shrink-0">
          <Image
            src={imgSrc}
            alt={exp.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${hasRealImage ? "group-hover:scale-110" : ""}`}
          />
          {hasRealImage && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          )}
          {/* カテゴリバッジ */}
          <span className={`absolute top-2.5 left-2.5 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${colorClass}`}>
            {emoji} {exp.category}
          </span>
          {/* 対象年齢バッジ */}
          {exp.targetAge && (
            <span className="absolute top-2.5 right-2.5 text-xs font-medium px-2 py-0.5 rounded-full bg-white/90 text-stone-700 shadow-sm backdrop-blur-sm">
              {exp.targetAge}
            </span>
          )}
          {/* ① 価格：「¥3,000 / 人」形式を画像下部に統一表示 */}
          {hasRealImage && (
            <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
              <span className="font-bold text-amber-700 text-sm">¥{exp.price.toLocaleString()}</span>
              <span className="text-xs text-stone-500"> / 人</span>
            </div>
          )}
        </div>

        {/* ① モバイルのpaddingを p-3 に最適化、sm以上はp-5 */}
        <div className="p-3 sm:p-5 flex flex-col gap-2 flex-1">
          {/* タイトル */}
          <h2 className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
            {exp.title}
          </h2>

          {/* スキルタグ */}
          {exp.skillTags && exp.skillTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {exp.skillTags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 日時・場所 */}
          <div className="flex flex-col gap-1 border-t border-stone-100 pt-2 mt-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">📅</span>
              <span className="text-xs text-stone-500">{dateLabel}　{exp.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">📍</span>
              <span className="text-xs text-stone-500">{exp.location}</span>
            </div>
          </div>

          {/* パートナー名＋定員 */}
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-100 flex items-center justify-center text-[9px]">🌿</span>
              <span>{hostName(exp.host)}</span>
            </span>
            <span>定員 {exp.capacity}名</span>
          </div>

          {/* 価格（画像がない場合のフォールバック） */}
          {!hasRealImage && (
            <div className="flex items-baseline justify-end gap-0.5">
              <span className="font-bold text-amber-700 text-base">¥{exp.price.toLocaleString()}</span>
              <span className="text-xs text-stone-500"> / 人</span>
            </div>
          )}

          {/* CTA */}
          <div className="bg-amber-50 group-hover:bg-amber-500 text-amber-700 group-hover:text-white text-sm font-medium text-center py-2 rounded-xl transition-all border border-amber-100 group-hover:border-amber-500">
            この体験を見る →
          </div>
        </div>
      </div>
    </Link>
  );
}
