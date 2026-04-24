"use client";

import { useState } from "react";
import type { Experience } from "@/lib/types";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";
import { Leaf, Palette, Briefcase, FlaskConical, UtensilsCrossed } from "lucide-react";

const categories = [
  { label: "すべて", icon: null, value: null },
  { label: "自然・アウトドア", icon: Leaf, value: "自然・アウトドア" },
  { label: "アート・ものづくり", icon: Palette, value: "アート・ものづくり" },
  { label: "社会・お仕事探究", icon: Briefcase, value: "社会・お仕事探究" },
  { label: "サイエンス・実験", icon: FlaskConical, value: "サイエンス・実験" },
  { label: "ライフスキル・料理", icon: UtensilsCrossed, value: "ライフスキル・料理" },
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
    <section id="experiences" className="max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
      {/* カテゴリフィルター */}
      <div className="flex gap-2 flex-wrap mb-5 sm:mb-6">
        {existingCategories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.value;
          return (
            <button
              key={cat.label}
              onClick={() => setSelected(cat.value)}
              className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full transition-all font-medium border ${
                isSelected
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {Icon ? (
                <Icon size={14} className={isSelected ? "text-white" : "text-amber-500"} />
              ) : (
                <span className="text-xs">✨</span>
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 件数 */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-stone-800">
          {selected ? `${selected}の体験` : "いま参加できる体験"}
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
