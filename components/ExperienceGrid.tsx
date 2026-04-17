"use client";

import { useState } from "react";
import type { Experience } from "@/lib/types";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";

const categories = [
  { label: "すべて", emoji: "✨", value: null },
  { label: "料理・ものづくり", emoji: "🍳", value: "料理・ものづくり" },
  { label: "探究・学び", emoji: "🔍", value: "探究・学び" },
  { label: "自然・アウトドア", emoji: "🌿", value: "自然・アウトドア" },
  { label: "アート・表現", emoji: "🖌️", value: "アート・表現" },
  { label: "ものづくり・アート", emoji: "🎨", value: "ものづくり・アート" },
];

export default function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? experiences.filter((e) => e.category === selected)
    : experiences;

  // 実際に存在するカテゴリだけ表示
  const existingCategories = categories.filter(
    (c) => c.value === null || experiences.some((e) => e.category === c.value)
  );

  return (
    <section id="experiences" className="max-w-5xl mx-auto px-4 py-10">
      {/* カテゴリフィルター */}
      <div className="flex gap-2 flex-wrap mb-6">
        {existingCategories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelected(cat.value)}
            className={`text-sm px-4 py-1.5 rounded-full transition-all font-medium border ${
              selected === cat.value
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* 件数 */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-stone-800">
          {selected ? `${selected}の体験` : "開催予定の体験"}
          <span className="ml-2 text-sm font-normal text-stone-400">
            {filtered.length}件
          </span>
        </h2>
        <p className="text-xs text-stone-400 hidden sm:block">終了済みは非表示</p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-4">🌱</p>
          <p>このカテゴリの体験はまだありません。</p>
          <button
            onClick={() => setSelected(null)}
            className="mt-4 text-amber-600 hover:underline text-sm"
          >
            すべての体験を見る →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      )}

      {experiences.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-4">🌱</p>
          <p>まだ体験が登録されていません。</p>
          <Link href="/host" className="mt-4 inline-block text-amber-600 hover:underline">
            最初の体験を投稿する →
          </Link>
        </div>
      )}
    </section>
  );
}
