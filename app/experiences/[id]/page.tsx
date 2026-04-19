import {
  getAllExperiences,
  getExperienceById,
  hostName,
  hostBio,
} from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import StickyApply from "@/components/StickyApply";
import ImageSlider from "@/components/ImageSlider";
import type { Experience, FlowStep } from "@/lib/types";

export const dynamicParams = true; // KV由来のIDも動的に受け付ける

export async function generateStaticParams() {
  const experiences = getAllExperiences();
  return experiences.map((e) => ({ id: e.id }));
}

async function getExperienceByIdWithKV(id: string): Promise<Experience | undefined> {
  // まずJSONファイルから検索
  const fromFile = getExperienceById(id);
  if (fromFile) return fromFile;
  // なければKVから検索
  const kvExps = await kvGetAddedExperiences();
  return kvExps.find((e) => e.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exp = await getExperienceByIdWithKV(id);
  if (!exp) return {};

  const BASE_URL = "https://itoito4.vercel.app";
  const ogImage =
    exp.images?.[0] ?? exp.image ?? "/images/bamboo-light.jpg";
  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const description = `${dateLabel} / ${exp.location} / ¥${exp.price.toLocaleString()}〜。${exp.description.slice(0, 80)}...`;

  return {
    title: exp.title,
    description,
    openGraph: {
      type: "article",
      url: `${BASE_URL}/experiences/${id}`,
      title: exp.title,
      description,
      images: [{ url: ogImage, alt: exp.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: exp.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = await getExperienceByIdWithKV(id);
  if (!exp) notFound();

  const categoryEmoji: Record<string, string> = {
    "料理・ものづくり": "🍳",
    "ものづくり・アート": "🎨",
    "アート・表現": "🖌️",
    "探究・学び": "🔍",
    "自然・アウトドア": "🌿",
  };
  const emoji = categoryEmoji[exp.category] ?? "✨";
  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const imgSrc =
    exp.image && exp.image !== "null" ? exp.image : "/images/placeholder.svg";
  const bio = exp.hostProfile ?? hostBio(exp.host);

  // 複数画像：imagesフィールドがあればそれを使い、なければimageをフォールバック
  const allImages: string[] =
    exp.images && exp.images.length > 0
      ? exp.images
      : exp.image && exp.image !== "null"
      ? [exp.image]
      : [];

  return (
    <>
      {/* スクロールで固定されるCTAボタン */}
      <StickyApply id={exp.id} title={exp.title} />

      <div className="max-w-3xl mx-auto px-4 py-10 pb-24">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
        >
          ← 体験一覧に戻る
        </Link>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {/* ヒーロー画像スライダー */}
          {allImages.length > 0 ? (
            <ImageSlider images={allImages} title={exp.title} />
          ) : (
            <div className="relative h-56 md:h-72 w-full overflow-hidden bg-amber-50">
              <Image
                src="/images/placeholder.svg"
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* カテゴリ */}
            <span className="inline-block text-sm font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full mb-4">
              {emoji} {exp.category}
            </span>

            {/* タイトル */}
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-snug mb-4">
              {exp.title}
            </h1>

            {/* 説明 */}
            <p className="text-stone-600 leading-relaxed mb-8 whitespace-pre-line">
              {exp.description}
            </p>

            {/* 基本情報グリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <InfoItem emoji="📅" label="開催日" value={dateLabel} />
              <InfoItem emoji="🕐" label="所要時間" value={exp.time} />
              <InfoItem emoji="📍" label="場所" value={exp.location} />
              <InfoItem emoji="👥" label="定員" value={`${exp.capacity}名`} />
              {exp.targetAge && (
                <InfoItem emoji="👤" label="対象年齢" value={exp.targetAge} />
              )}
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

            {/* この体験で得られること */}
            {exp.benefits && exp.benefits.length > 0 && (
              <div className="mb-8 bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <h2 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-1.5">
                  ✨ この体験で得られること
                </h2>
                <ul className="flex flex-col gap-2">
                  {exp.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="mt-0.5 shrink-0 text-emerald-500 font-bold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* タグ */}
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

            {/* 当日の流れ */}
            {exp.flow && exp.flow.length > 0 && (
              <div className="mb-8">
                <h2 className="text-base font-bold text-stone-800 mb-4 flex items-center gap-2">
                  🕐 当日の流れ
                </h2>
                <FlowTimeline steps={exp.flow} />
              </div>
            )}

            {/* 申し込みボタン（インライン） */}
            <Link
              href={`/experiences/${exp.id}/apply`}
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
            >
              この体験に申し込む
            </Link>
          </div>
        </div>

        {/* ホストプロフィール */}
        <div className="mt-6 bg-amber-50 rounded-2xl p-6 border border-amber-100">
          <h2 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-1.5">
            🌿 ホストのプロフィール
          </h2>
          <p className="font-semibold text-stone-800 mb-2">{hostName(exp.host)}</p>
          {bio && (
            <p className="text-sm text-stone-600 leading-relaxed">{bio}</p>
          )}
        </div>

        {/* 保護者へのご案内 */}
        {exp.parentNote && (
          <div className="mt-4 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-1.5">
              👨‍👩‍👧 保護者へのご案内
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
              {exp.parentNote}
            </p>
          </div>
        )}

        {/* よくある質問 */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-stone-800 mb-5 flex items-center gap-2">
            💬 よくある質問
          </h2>
          <div className="flex flex-col divide-y divide-stone-100">
            <FaqItem
              q="対象年齢はありますか？"
              a={
                exp.targetAge
                  ? `この体験の対象は「${exp.targetAge}」です。対象外の方もお気軽にお問い合わせください。`
                  : "特に年齢制限はありません。詳しくはホストにお問い合わせください。"
              }
            />
            <FaqItem
              q="雨天の場合はどうなりますか？"
              a="屋内開催の体験はそのまま実施します。屋外体験の場合、荒天時はホストから事前にご連絡いたします。"
            />
            <FaqItem
              q="キャンセルはできますか？"
              a="開催日の3日前までは無料でキャンセル可能です。それ以降のキャンセルについてはホストにご相談ください。"
            />
          </div>
        </div>
      </div>
    </>
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
        <p className={`font-medium ${highlight ? "text-amber-700 text-lg" : "text-stone-800"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <p className="text-sm font-semibold text-stone-800 mb-1.5 flex items-start gap-2">
        <span className="text-amber-500 font-bold shrink-0">Q.</span>
        {q}
      </p>
      <p className="text-sm text-stone-600 leading-relaxed pl-6">
        {a}
      </p>
    </div>
  );
}

function FlowTimeline({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative border-l-2 border-amber-200 ml-3 flex flex-col gap-0">
      {steps.map((step, i) => (
        <li key={i} className="pl-6 pb-5 last:pb-0 relative">
          {/* ドット */}
          <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            {/* 時間バッジ */}
            <span className="shrink-0 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 w-fit">
              {step.time}
            </span>
            {/* ラベル */}
            <span className="text-sm font-semibold text-stone-800">
              {step.label}
            </span>
          </div>

          {/* 補足メモ */}
          {step.note && (
            <p className="mt-1 text-xs text-stone-400 leading-relaxed">
              💬 {step.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
