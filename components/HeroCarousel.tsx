"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── チラ見え幅 ──────────────────────────────────────────────
// PEEK: コンテンツ幅の外側に何px隣画像を見せるか
// メイン画像の横幅 = max-w-5xl コンテンツ幅そのまま
const PEEK = 96;
const GAP  = 10;  // スライド間の隙間（px）

const slides = [
  { img: "/images/hero/hero-1.jpg", fallbackBg: "from-amber-400 to-orange-500" },
  { img: "/images/hero/hero-2.jpg", fallbackBg: "from-lime-400 to-green-600" },
  { img: "/images/hero/hero-3.jpg", fallbackBg: "from-blue-400 to-cyan-600" },
  { img: "/images/hero/hero-4.jpg", fallbackBg: "from-rose-400 to-pink-600" },
];
const N = slides.length;

// 無限ループ用クローン配列: [clone_last, s0, s1, s2, s3, clone_first]
const extSlides = [slides[N - 1], ...slides, slides[0]];

function toRealIdx(e: number): number {
  if (e === 0)     return N - 1;
  if (e === N + 1) return 0;
  return e - 1;
}

export default function HeroCarousel() {
  const [extIdx,   setExtIdx]   = useState(1);
  const [animated, setAnimated] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [slideW,   setSlideW]   = useState(0);

  // ── ポイント: ref はコンテンツ幅より PEEK*2 広いコンテナを計測 ──
  // → slideW = wrapRef.offsetWidth - PEEK*2 = コンテンツ幅ぴったり
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        setSlideW(wrapRef.current.offsetWidth - PEEK * 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── 無限ループ: クローン位置で瞬間スナップ ── */
  const handleTransitionEnd = useCallback(() => {
    if (extIdx === 0) {
      setAnimated(false);
      setExtIdx(N);
    } else if (extIdx === N + 1) {
      setAnimated(false);
      setExtIdx(1);
    }
  }, [extIdx]);

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const goNext = useCallback(() => { setAnimated(true); setExtIdx((i) => i + 1); }, []);
  const goPrev = useCallback(() => { setAnimated(true); setExtIdx((i) => i - 1); }, []);

  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  // ── offset: extIdx スライドの左端が wrapRef 内の PEEK px に来る
  const offset = slideW > 0 ? PEEK - extIdx * (slideW + GAP) : 0;

  const currentReal = toRealIdx(extIdx);

  return (
    // section に overflow-hidden → PEEK 分のはみ出しをここでクリップ
    <section className="py-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">

        {/*
          ── カルーセル本体 ──────────────────────────────────────
          margin: 0 -${PEEK}px でコンテンツ幅より左右 PEEK px 広い領域を確保
          → wrapRef.offsetWidth = contentWidth + PEEK*2
          → slideW = contentWidth（メイン画像 = コンテンツ幅ぴったり）
          → 両サイドに PEEK px のチラ見えがコンテンツ外に表示
          ────────────────────────────────────────────────────── */}
        <div
          ref={wrapRef}
          className="relative"
          style={{ margin: `0 -${PEEK}px` }}
        >
          {/* スライドトラック */}
          <div
            className="flex"
            style={{
              gap:        `${GAP}px`,
              transform:  `translateX(${offset}px)`,
              transition: animated ? "transform 700ms ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extSlides.map((slide, i) => {
              const ri = toRealIdx(i);
              return (
                <div
                  key={i}
                  className="shrink-0 rounded-2xl overflow-hidden"
                  style={{
                    width:       slideW > 0 ? `${slideW}px` : `calc(100% - ${PEEK * 2}px)`,
                    aspectRatio: "4/3",
                  }}
                >
                  {!imgErrors[ri] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.img}
                      alt=""
                      aria-hidden="true"
                      onError={() => setImgErrors((e) => ({ ...e, [ri]: true }))}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${slide.fallbackBg}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── 矢印: PEEK+10px でメイン画像の内側 10px に配置 ── */}
          <button
            onClick={goPrev}
            style={{ left: `${PEEK + 10}px` }}
            className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-stone-600 text-2xl transition-all"
            aria-label="前のスライド"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            style={{ right: `${PEEK + 10}px` }}
            className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-stone-600 text-2xl transition-all"
            aria-label="次のスライド"
          >
            ›
          </button>
        </div>

        {/* ── ドット（コンテンツ幅内・中央揃え） ── */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setExtIdx(i + 1); }}
              className={`transition-all duration-300 rounded-full ${
                i === currentReal
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
