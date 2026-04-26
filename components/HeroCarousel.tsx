"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const PEEK = 96;  // 両サイドにチラ見えするpx量
const GAP  = 12;  // スライド間の隙間

const slides = [
  { img: "/images/hero/hero-1.jpg", fallbackBg: "from-amber-400 to-orange-500" },
  { img: "/images/hero/hero-2.jpg", fallbackBg: "from-lime-400 to-green-600" },
  { img: "/images/hero/hero-3.jpg", fallbackBg: "from-blue-400 to-cyan-600" },
  { img: "/images/hero/hero-4.jpg", fallbackBg: "from-rose-400 to-pink-600" },
];

export default function HeroCarousel() {
  const [current,   setCurrent]   = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [slideW,    setSlideW]    = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ── コンテナ幅を測ってスライド幅を計算 ── */
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setSlideW(wrapRef.current.offsetWidth - PEEK * 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── 自動再生 ── */
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  /* ── 位置計算（中央スライドがPEEK分ずれた位置に） ── */
  const offset = slideW > 0 ? PEEK - current * (slideW + GAP) : 0;

  return (
    <section className="py-6 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* ── カルーセル本体：overflow-hidden でチラ見えをクリップ ── */}
        <div ref={wrapRef} className="relative overflow-hidden">
        {/* スライドトラック */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ gap: `${GAP}px`, transform: `translateX(${offset}px)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl overflow-hidden"
              style={{
                width:       slideW > 0 ? `${slideW}px` : `calc(100% - ${PEEK * 2}px)`,
                aspectRatio: "4/3",
              }}
            >
              {!imgErrors[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.img}
                  alt=""
                  aria-hidden="true"
                  onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${slide.fallbackBg}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── 左右矢印（スライドの上に重ねる） ── */}
        <button
          onClick={prev}
          style={{ left: `${PEEK + 10}px` }}
          className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-stone-600 text-2xl transition-all"
          aria-label="前のスライド"
        >
          ‹
        </button>
        <button
          onClick={next}
          style={{ right: `${PEEK + 10}px` }}
          className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-stone-600 text-2xl transition-all"
          aria-label="次のスライド"
        >
          ›
        </button>
      </div>

        {/* ── ドットインジケーター ── */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-amber-400"
                  : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`スライド${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
