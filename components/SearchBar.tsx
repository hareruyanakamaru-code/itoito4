"use client";

import { useState, useRef } from "react";
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
  { value: "",           label: "すべてのエリア" },
  { value: "江東区",     label: "江東区" },
  { value: "東京",       label: "東京都内" },
  { value: "千葉",       label: "千葉県" },
  { value: "埼玉",       label: "埼玉県" },
  { value: "神奈川",     label: "神奈川県" },
  { value: "オンライン", label: "オンライン" },
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

/* ── Props ── */
interface DefaultValues {
  category?: string;
  area?: string;
  age?: string;
  date?: string;
  format?: string; // FormatTabs と連携（SearchBar 送信時に引き継ぐ）
}

/* ── SearchIcon ── */
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

/* ── コンポーネント ── */
export default function SearchBar({ defaultValues }: { defaultValues?: DefaultValues }) {
  const router      = useRouter();
  const dateRef     = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [area,     setArea    ] = useState(defaultValues?.area     ?? "");
  const [age,      setAge     ] = useState(defaultValues?.age      ?? "");
  const [date,     setDate    ] = useState(defaultValues?.date     ?? "");

  /* 開催日の表示ラベル */
  const dateLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString("ja-JP", { month: "long", day: "numeric" })
    : "日付を選ぶ";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (area)     params.set("area",     area);
    if (age)      params.set("age",      age);
    if (date)     params.set("date",     date);
    // format タブの状態を引き継ぐ
    if (defaultValues?.format) params.set("format", defaultValues.format);
    const qs = params.toString();
    router.push(`/${qs ? `?${qs}` : ""}#experiences`);
  }

  /* 共通の field ラッパースタイル */
  const fieldCls =
    "flex-1 px-5 py-3.5 flex flex-col gap-0.5 border-b sm:border-b-0 sm:border-r border-stone-100 last:border-0 min-w-0 cursor-pointer hover:bg-amber-50/40 transition-colors";

  return (
    <section className="px-4 py-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSearch}>
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-stone-100 flex flex-col sm:flex-row items-stretch overflow-hidden">

            {/* ── カテゴリー ── */}
            <label className={fieldCls}>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">カテゴリー</span>
              <div className="relative">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full text-sm text-stone-700 bg-transparent border-none outline-none appearance-none pr-4 cursor-pointer font-medium"
                >
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-[10px] pointer-events-none">▾</span>
              </div>
            </label>

            {/* ── エリア ── */}
            <label className={fieldCls}>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">エリア</span>
              <div className="relative">
                <select
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full text-sm text-stone-700 bg-transparent border-none outline-none appearance-none pr-4 cursor-pointer font-medium"
                >
                  {AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-[10px] pointer-events-none">▾</span>
              </div>
            </label>

            {/* ── 開催日（クリック展開） ── */}
            <div
              className={fieldCls}
              onClick={() => dateRef.current?.showPicker?.()}
            >
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">開催日</span>
              <div className="relative">
                <p className={`text-sm font-medium ${date ? "text-stone-700" : "text-stone-400"}`}>
                  {dateLabel}
                </p>
                <input
                  ref={dateRef}
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ colorScheme: "light" }}
                />
              </div>
            </div>

            {/* ── 対象年齢 ── */}
            <label className={fieldCls}>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">対象年齢</span>
              <div className="relative">
                <select
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full text-sm text-stone-700 bg-transparent border-none outline-none appearance-none pr-4 cursor-pointer font-medium"
                >
                  {AGES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 text-[10px] pointer-events-none">▾</span>
              </div>
            </label>

            {/* ── 検索ボタン ── */}
            <div className="flex items-center justify-end sm:justify-center p-3 sm:px-4">
              <button
                type="submit"
                className="w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-md transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                aria-label="検索"
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
