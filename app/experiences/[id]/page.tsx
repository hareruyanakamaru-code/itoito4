import { getAllExperiences, getExperienceById, hostName, hostBio } from "@/lib/experiences";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const experiences = getAllExperiences();
  return experiences.map((e) => ({ id: e.id }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = getExperienceById(id);

  if (!exp) notFound();

  const categoryEmoji: Record<string, string> = {
    "料理・ものづくり": "🍳",
    "ものづくり・アート": "🎨",
    "探究・学び": "🔍",
  };
  const emoji = categoryEmoji[exp.category] ?? "✨";

  /* 日付表示 */
  const dateLabel = exp.dateTo
    ? `${exp.date} 〜 ${exp.dateTo}`
    : exp.date;

  const bio = hostBio(exp.host);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← 体験一覧に戻る
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {/* Hero image */}
        <div className="relative h-56 md:h-72 w-full overflow-hidden bg-amber-50">
          <Image
            src={exp.image && exp.image !== "null" ? exp.image : "/images/placeholder.svg"}
            alt={exp.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
          {exp.image && exp.image !== "null" && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          )}
        </div>

        <div className="p-6 md:p-8">
          {/* Category */}
          <span className="inline-block text-sm font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full mb-4">
            {emoji} {exp.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-snug mb-4">
            {exp.title}
          </h1>

          {/* Description */}
          <p className="text-stone-600 leading-relaxed mb-8 whitespace-pre-line">
            {exp.description}
          </p>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <InfoItem emoji="📅" label="開催日" value={dateLabel} />
            <InfoItem emoji="🕐" label="所要時間" value={exp.time} />
            <InfoItem emoji="📍" label="場所" value={exp.location} />
            <InfoItem emoji="👥" label="定員" value={`${exp.capacity}名`} />
            {exp.target && (
              <InfoItem emoji="🙋" label="対象" value={exp.target} />
            )}
            <InfoItem
              emoji="💴"
              label="参加費"
              value={`¥${exp.price.toLocaleString()} / 人`}
              highlight
            />
          </div>

          {/* Tags */}
          {exp.tags && exp.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Apply button */}
          <Link
            href={`/experiences/${exp.id}/apply`}
            className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
          >
            この体験に申し込む
          </Link>
        </div>
      </div>

      {/* Host card */}
      <div className="mt-6 bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <h2 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-1">
          🌿 ホストについて
        </h2>
        <p className="font-semibold text-stone-800 mb-1">{hostName(exp.host)}</p>
        {bio && (
          <p className="text-sm text-stone-600 leading-relaxed">{bio}</p>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  emoji,
  label,
  value,
  highlight,
}: {
  emoji: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3.5">
      <span className="text-lg">{emoji}</span>
      <div>
        <p className="text-xs text-stone-400 mb-0.5">{label}</p>
        <p
          className={`font-medium ${highlight ? "text-amber-700 text-lg" : "text-stone-800"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
