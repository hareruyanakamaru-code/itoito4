"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── 選択肢 ── */
const CATEGORIES = [
  { value: "",               label: "すべてのカテゴリー" },
  { value: "自然・アウトドア",   label: "🌿 自然・アウトドア" },
  { value: "アート・ものづくり", label: "🎨 アート・ものづくり" },
  { value: "社会・お仕事探究",   label: "💼 社会・お仕事探究" },
  { value: "サイエンス・実験",   label: "🔬 サイエンス・実験" },
  { value: "ライフスキル・料理", label: "🍳 ライフスキル・料理" },
];

const AREAS = [
  { value: "",       label: "すべてのエリア" },
  { value: "江東区", label: "江東区" },
  { value: "東京",   label: "東京都内" },
  { value: "千葉",   label: "千葉県" },
];

const AGES = [
  { value: "",           label: "すべての年齢" },
  { value: "未就学児",     label: "未就学児（〜5歳）" },
  { value: "小学校低学年", label: "小学校低学年（6〜8歳）" },
  { value: "小学校中学年", label: "小学校中学年（9〜10歳）" },
  { value: "小学校高学年", label: "小学校高学年（11〜12歳）" },
  { value: "中学生",       label: "中学生（13〜15歳）" },
  { value: "高校生",       label: "高校生（16〜18歳）" },
];

const MONTHS = [
  { value: "",        label: "すべての月" },
  { value: "2026-04", label: "4月" },
  { value: "2026-05", label: "5月" },
  { value: "2026-06", label: "6月" },
  { value: "2026-07", label: "7月" },
  { value: "2026-08", label: "8月" },
];

/* ── Props ── */
interface DefaultValues {
  category?: string;
  area?: string;
  age?: string;
  month?: string;
  date?: string;
  q?: string;
}

/* ── スタイル共通 ── */
const fieldClass =
  "w-full text-sm text-stone-700 bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 transition appearance-none";

/* ── コンポーネント ── */
export default function SearchBar({ defaultValues }: { defaultValues?: DefaultValues }) {
  const router = useRouter();

  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [area,     setArea    ] = useState(defaultValues?.area     ?? "");
  const [age,      setAge     ] = useState(defaultValues?.age      ?? "");
  const [month,    setMonth   ] = useState(defaultValues?.month    ?? "");
  const [date,     setDate    ] = useState(defaultValues?.date     ?? "");
  const [query,    setQuery   ] = useState(defaultValues?.q        ?? "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (area)     params.set("area",     area);
    if (age)      params.set("age",      age);
    if (month)    params.set("month",    month);
    if (date)     params.set("date",     date);
    if (query)    params.set("q",        query);
    const qs = params.toString();
    router.push(`/${qs ? `?${qs}` : ""}#experiences`);
  }

  return (
    <section className="px-4 py-5 bg-stone-50 border-b border-stone-100">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-sm border border-stone-100 px-5 py-4"
        >
          {/* ラベル */}
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
            🔍 体験を絞り込む
          </p>

          {/* 1行目：カテゴリー・エリア・対象年齢 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
            {/* カテゴリー */}
            <div className="relative">
              <select value={category} onChange={e => setCategory(e.target.value)} className={fieldClass}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-[10px]">▾</span>
            </div>

            {/* エリア */}
            <div className="relative">
              <select value={area} onChange={e => setArea(e.target.value)} className={fieldClass}>
                {AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-[10px]">▾</span>
            </div>

            {/* 対象年齢 */}
            <div className="relative">
              <select value={age} onChange={e => setAge(e.target.value)} className={fieldClass}>
                {AGES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-[10px]">▾</span>
            </div>
          </div>

          {/* 2行目：開催月・開催日・フリーワード＋検索ボタン */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 開催月 */}
            <div className="relative">
              <select value={month} onChange={e => setMonth(e.target.value)} className={fieldClass}>
                {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-[10px]">▾</span>
            </div>

            {/* 開催日（ネイティブ日付ピッカー） */}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={`${fieldClass} ${date ? "text-stone-700" : "text-stone-400"}`}
              style={{ colorScheme: "light" }}
            />

            {/* フリーワード＋検索ボタン */}
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="キーワード（例：パン）"
                className="flex-1 text-sm text-stone-700 bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 transition placeholder:text-stone-300"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors shadow-sm whitespace-nowrap"
              >
                検索
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
