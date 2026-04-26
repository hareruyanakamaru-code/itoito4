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
    <section className="bg-white border-b border-stone-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-[44%_56%] min-h-[420px] sm:min-h-[500px]">

          {/* ── 左：テキストエリア ── */}
          <div className="relative flex flex-col justify-center px-8 lg:px-14 py-10 md:py-14 order-2 md:order-1">
            {/* 装飾：星 */}
            <span className="absolute top-6 right-6 text-amber-200 text-2xl pointer-events-none select-none hidden md:block">✦</span>
            <span className="absolute bottom-14 right-2 text-amber-100 text-lg pointer-events-none select-none hidden md:block">✧</span>
            {/* 装飾：SVG曲線 */}
            <svg className="absolute bottom-0 left-0 w-32 h-32 opacity-[0.06] pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path d="M 10 80 Q 50 20 90 60" stroke="#f59e0b" strokeWidth="3"/>
            </svg>

            <p className="text-amber-500 text-[11px] font-bold tracking-widest uppercase mb-4">
              ✦ 子どもの「やってみたい！」をプロと叶える
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-800 leading-tight mb-4">
              現場が、
              <br />
              <span className="text-amber-500">究極の学び場。</span>
            </h1>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-[260px]">
              元教師が審査した、<br />本物の体験だけを届けます。
            </p>
            <a
              href="#experiences"
              className="self-start bg-amber-500 hover:bg-amber-600 text-white font-bold px-7 py-3 rounded-full transition-all shadow-md text-sm"
            >
              体験をさがす →
            </a>

            {/* ── 吹き出し ── */}
            <div className="mt-8 max-w-[180px]">
              <div className="bg-stone-50 border border-stone-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm relative">
                <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                  子どもの「やってみたい！」が<br />未来をひらく。
                </p>
                <div className="absolute -bottom-2 left-5 w-3 h-3 bg-stone-50 border-b border-l border-stone-100 rotate-[-45deg]" />
              </div>
              <p className="mt-2 text-lg select-none">🌱</p>
            </div>
          </div>

          {/* ── 右：カルーセル ── */}
          <div className="relative overflow-hidden md:rounded-l-3xl min-h-[260px] order-1 md:order-2">
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

            {/* ── 左右矢印（白丸） ── */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center text-stone-700 text-2xl transition-all shadow-sm font-thin"
              aria-label="前のスライド"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center text-stone-700 text-2xl transition-all shadow-sm font-thin"
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
                      ? "w-5 h-2 bg-amber-400"
                      : "w-2 h-2 bg-white/60 hover:bg-white/90"
                  }`}
                  aria-label={`スライド${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
