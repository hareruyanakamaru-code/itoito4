"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  { img: "/images/hero/hero-1.jpg", fallbackBg: "from-amber-400 to-orange-500" },
  { img: "/images/hero/hero-2.jpg", fallbackBg: "from-lime-400 to-green-600" },
  { img: "/images/hero/hero-3.jpg", fallbackBg: "from-blue-400 to-cyan-600" },
  { img: "/images/hero/hero-4.jpg", fallbackBg: "from-rose-400 to-pink-600" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[540px] sm:h-[620px] overflow-hidden bg-stone-900">
      {/* ── スライド ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {!imgErrors[i] ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.img}
                alt=""
                aria-hidden="true"
                onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
            </>
          ) : (
            <>
              <div className={`w-full h-full bg-gradient-to-br ${slide.fallbackBg}`} />
              <div className="absolute inset-0 bg-black/30" />
            </>
          )}
        </div>
      ))}

      {/* ── コンテンツ ── */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-16 max-w-5xl mx-auto">
        <p className="text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 drop-shadow">
          ✦ 子どもの「やってみたい！」をプロと叶える
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
          現場が、
          <br />
          <span className="text-amber-400">究極の学び場。</span>
        </h1>
        <p className="text-white/80 text-base sm:text-lg max-w-md mb-8 leading-relaxed drop-shadow">
          元教師が審査した、本物の体験だけを届けます。
        </p>
        <a
          href="#experiences"
          className="self-start bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg text-base"
        >
          体験をさがす →
        </a>

        {/* ── 吹き出し装飾 ── */}
        <div className="absolute bottom-14 right-6 sm:right-0 max-w-[180px] sm:max-w-[210px]">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-xl relative">
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              子どもの「やってみたい！」が<br />未来をひらく。
            </p>
            {/* 吹き出し角 */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/95 rotate-45" />
          </div>
          <p className="text-right mt-3 text-2xl select-none">🌱</p>
        </div>
      </div>

      {/* ── 左右矢印 ── */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white text-3xl transition-all font-thin"
        aria-label="前のスライド"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white text-3xl transition-all font-thin"
        aria-label="次のスライド"
      >
        ›
      </button>

      {/* ── ドットインジケーター ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`スライド${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
