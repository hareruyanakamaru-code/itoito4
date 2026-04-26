import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import DateCalendar from "@/components/DateCalendar";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "日付から探す | itoito",
  description: "お子さまの予定に合わせて、ぴったりの学び体験を日付から探せます。",
};

const CATEGORIES = [
  "自然・アウトドア",
  "アート・ものづくり",
  "社会・お仕事探究",
  "サイエンス・実験",
  "ライフスキル・料理",
];

const CATEGORY_EMOJI: Record<string, string> = {
  "自然・アウトドア":   "🌿",
  "アート・ものづくり": "🎨",
  "社会・お仕事探究":   "💼",
  "サイエンス・実験":   "🔬",
  "ライフスキル・料理": "🍳",
};

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; filter?: string; category?: string }>;
}) {
  const today = new Date().toISOString().split("T")[0];

  const [fileExps, kvExps] = await Promise.all([
    Promise.resolve(getAllExperiences()),
    kvGetAddedExperiences(),
  ]);

  const allExps = [...fileExps, ...kvExps].filter(exp => {
    const endDate = exp.dateTo ?? exp.date;
    return endDate >= today;
  });

  const { date, filter, category } = await searchParams;

  // カテゴリー絞り込み
  const displayExps = category
    ? allExps.filter(e => e.category === category)
    : allExps;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* パンくず */}
      <div className="mb-6">
        <Link href="/" className="text-sm text-stone-500 hover:text-amber-700 transition-colors">
          ← トップに戻る
        </Link>
      </div>

      {/* ヘッダー */}
      <div className="mb-8">
        <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-2">
          ✦ Calendar
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
          日付から探す
        </h1>
        <p className="text-sm text-stone-500">
          お子さまの予定に合わせて、ぴったりの学び体験を見つけよう
        </p>
      </div>

      {/* カテゴリー絞り込み */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-stone-400 mb-3 uppercase tracking-widest">
          カテゴリーで絞り込む
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/experiences/calendar${date ? `?date=${date}` : filter ? `?filter=${filter}` : ""}`}
            className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-all ${
              !category
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600"
            }`}
          >
            すべて
          </Link>
          {CATEGORIES.map(cat => {
            const params = new URLSearchParams();
            if (date) params.set("date", date);
            else if (filter) params.set("filter", filter);
            params.set("category", cat);
            return (
              <Link
                key={cat}
                href={`/experiences/calendar?${params.toString()}`}
                className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-all ${
                  category === cat
                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                    : "bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600"
                }`}
              >
                {CATEGORY_EMOJI[cat] ?? "✨"} {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* カレンダー */}
      <DateCalendar
        experiences={displayExps}
        initialDate={date}
        initialFilter={
          filter === "this-weekend" ? "this-weekend" :
          filter === "next-weekend" ? "next-weekend" :
          filter === "this-month"   ? "this-month"   :
          filter === "next-month"   ? "next-month"   :
          null
        }
      />
    </div>
  );
}
