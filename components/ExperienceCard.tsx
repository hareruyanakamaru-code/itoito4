import Link from "next/link";
import Image from "next/image";
import { Experience, hostName } from "@/lib/experiences";

const categoryColors: Record<string, string> = {
  "料理・ものづくり": "bg-orange-100 text-orange-700",
  "ものづくり・アート": "bg-orange-100 text-orange-700",
  "探究・学び": "bg-emerald-100 text-emerald-700",
};

const categoryEmoji: Record<string, string> = {
  "料理・ものづくり": "🍳",
  "ものづくり・アート": "🎨",
  "探究・学び": "🔍",
};

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const colorClass =
    categoryColors[exp.category] ?? "bg-stone-100 text-stone-600";
  const emoji = categoryEmoji[exp.category] ?? "✨";

  /* 日付表示：dateTo があれば「〜」でつなぐ */
  const dateLabel = exp.dateTo
    ? `${exp.date} 〜 ${exp.dateTo}`
    : exp.date;

  return (
    <Link href={`/experiences/${exp.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-100 overflow-hidden h-full flex flex-col">
        {/* Photo area */}
        <div className="relative h-44 w-full overflow-hidden bg-amber-50">
          <Image
            src={exp.image && exp.image !== "null" ? exp.image : "/images/placeholder.svg"}
            alt={exp.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${exp.image && exp.image !== "null" ? "group-hover:scale-105" : ""}`}
          />
          {/* Category badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${colorClass}`}
          >
            {emoji} {exp.category}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Title */}
          <h2 className="text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
            {exp.title}
          </h2>

          {/* Description preview */}
          <p className="text-sm text-stone-500 line-clamp-2 flex-1">
            {exp.description}
          </p>

          {/* Info row */}
          <div className="flex flex-col gap-1.5 text-sm text-stone-600 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-1.5">
              <span>📅</span>
              <span>{dateLabel}　{exp.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📍</span>
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="flex items-center gap-1.5">
                <span>👥</span>
                <span>定員 {exp.capacity}名</span>
              </span>
              <span className="font-bold text-amber-700 text-base">
                ¥{exp.price.toLocaleString()}
                <span className="text-xs font-normal text-stone-500"> / 人</span>
              </span>
            </div>
          </div>

          {/* Host */}
          <div className="text-xs text-stone-400 flex items-center gap-1">
            <span>🌿</span>
            <span>ホスト: {hostName(exp.host)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
