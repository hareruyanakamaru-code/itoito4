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

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-stone-100" style={{ aspectRatio: "16/7" }}>

      {/* ── スライド ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {!imgErrors[i] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.img}
              alt=""
              aria-hidden="true"
              onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${slide.fallbackBg}`} />
          )}
        </div>
      ))}

      {/* ── 左右矢印 ── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm flex items-center justify-center text-stone-700 text-2xl transition-all shadow-sm font-thin"
        aria-label="前のスライド"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm flex items-center justify-center text-stone-700 text-2xl transition-all shadow-sm font-thin"
        aria-label="次のスライド"
      >
        ›
      </button>

      {/* ── ドットインジケーター ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`スライド${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
