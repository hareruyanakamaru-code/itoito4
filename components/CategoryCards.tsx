"use client";

import { useState } from "react";
import { Leaf, Palette, Briefcase, FlaskConical, UtensilsCrossed } from "lucide-react";

type Category = {
  label: string;
  keywords: string;
  img: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  fallbackBg: string;
  fallbackText: string;
  value: string;
};

const categories: Category[] = [
  {
    label: "自然・アウトドア",
    keywords: "森・川・生き物観察",
    img: "/images/category-nature.jpg",
    icon: Leaf,
    fallbackBg: "from-lime-400 to-green-500",
    fallbackText: "text-green-900",
    value: "自然・アウトドア",
  },
  {
    label: "アート・ものづくり",
    keywords: "創作・表現・職人技",
    img: "/images/category-art.jpg",
    icon: Palette,
    fallbackBg: "from-orange-400 to-amber-500",
    fallbackText: "text-amber-900",
    value: "アート・ものづくり",
  },
  {
    label: "社会・お仕事探究",
    keywords: "プロの技術・社会の仕組み",
    img: "/images/category-work.jpg",
    icon: Briefcase,
    fallbackBg: "from-blue-400 to-cyan-500",
    fallbackText: "text-blue-900",
    value: "社会・お仕事探究",
  },
  {
    label: "サイエンス・実験",
    keywords: "仮説・観察・発見",
    img: "/images/category-science.jpg",
    icon: FlaskConical,
    fallbackBg: "from-emerald-400 to-teal-500",
    fallbackText: "text-emerald-900",
    value: "サイエンス・実験",
  },
  {
    label: "ライフスキル・料理",
    keywords: "食・暮らし・生きる力",
    img: "/images/category-life.jpg",
    icon: UtensilsCrossed,
    fallbackBg: "from-rose-400 to-pink-500",
    fallbackText: "text-rose-900",
    value: "ライフスキル・料理",
  },
];

function CategoryCard({ cat }: { cat: Category }) {
  const [imgError, setImgError] = useState(false);
  const Icon = cat.icon;

  const handleClick = () => {
    const el = document.getElementById("experiences");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="group shrink-0 w-40 sm:w-48 flex flex-col items-center gap-2 text-left focus:outline-none"
    >
      {/* 画像エリア */}
      <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden shadow-sm">
        {!imgError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.img}
              alt={cat.label}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* 暗オーバーレイ */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            {/* アイコン */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={32} className="text-white drop-shadow-md" />
            </div>
          </>
        ) : (
          /* 画像なしフォールバック */
          <div className={`w-full h-full bg-gradient-to-br ${cat.fallbackBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
            <Icon size={36} className="text-white/90" />
          </div>
        )}
      </div>
      {/* テキスト */}
      <div className="px-1">
        <p className="text-sm font-bold text-stone-800 group-hover:text-amber-600 transition-colors leading-snug text-center">
          {cat.label}
        </p>
        <p className="text-[10px] text-stone-400 mt-0.5 text-center">{cat.keywords}</p>
      </div>
    </button>
  );
}

export default function CategoryCards() {
  return (
    <section className="py-10 sm:py-12 px-4 bg-[#fdfaf6]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-amber-500 tracking-widest uppercase mb-6">
          カテゴリーから探す
        </p>
        {/* 横スクロール */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-5 sm:overflow-visible">
          {categories.map((cat) => (
            <CategoryCard key={cat.value} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
