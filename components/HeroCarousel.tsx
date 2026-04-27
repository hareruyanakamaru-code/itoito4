"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── チラ見え設定 ──────────────────────────────────────────────
// PEEK: メイン画像の左右に何px隣の画像を見せるか（8px = 超スリム）
// GAP : スライド間の隙間（0 = なし / rounded-2xl で視覚的に分離）
const PEEK = 8;
const GAP  = 0;

const slides = [
  { img: "/images/hero/hero-1.jpg", fallbackBg: "from-amber-400 to-orange-500" },
  { img: "/images/hero/hero-2.jpg", fallbackBg: "from-lime-400 to-green-600" },
  { img: "/images/hero/hero-3.jpg", fallbackBg: "from-blue-400 to-cyan-600" },
  { img: "/images/hero/hero-4.jpg", fallbackBg: "from-rose-400 to-pink-600" },
];
const N = slides.length;

// 無限ループ用クローン配列: [clone_last, s0, s1, s2, s3, clone_first]
const extSlides = [slides[N - 1], ...slides, slides[0]];

// 拡張インデックス → 本物インデックス（0〜N-1）への変換
function toRealIdx(e: number): number {
  if (e === 0)     return N - 1;  // clone_last
  if (e === N + 1) return 0;       // clone_first
  return e - 1;
}

export default function HeroCarousel() {
  // extIdx: 1〜N が本物、0=clone_last、N+1=clone_first
  const [extIdx,    setExtIdx]    = useState(1);
  const [animated,  setAnimated]  = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [slideW,    setSlideW]    = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ── コンテナ幅 → スライド幅 ── */
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        setSlideW(wrapRef.current.offsetWidth - PEEK * 2 - GAP * 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── 無限ループ: クローン位置でアニメなし瞬間移動 ── */
  const handleTransitionEnd = useCallback(() => {
    if (extIdx === 0) {
      setAnimated(false);
      setExtIdx(N);         // clone_last → 本物 last へスナップ
    } else if (extIdx === N + 1) {
      setAnimated(false);
      setExtIdx(1);         // clone_first → 本物 first へスナップ
    }
  }, [extIdx]);

  /* アニメ無効 → 次フレームで再有効化 */
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  /* ── ナビゲーション ── */
  const goNext = useCallback(() => {
    setAnimated(true);
    setExtIdx((i) => i + 1);
  }, []);
  const goPrev = useCallback(() => {
    setAnimated(true);
    setExtIdx((i) => i - 1);
  }, []);

  /* ── 自動再生 ── */
  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  /* ── 位置計算 ──
     formula: PEEK + GAP - extIdx * (slideW + GAP)
     → extIdx スライドの左端が PEEK+GAP の位置（=可視左余白）に来る
     → 左隣スライドの右端が PEEK px（=チラ見えぴったり）に来る
  ── */
  const offset = slideW > 0
    ? PEEK + GAP - extIdx * (slideW + GAP)
    : 0;

  const currentReal = toRealIdx(extIdx);

  return (
    <section className="py-6 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* ── カルーセル本体 ── */}
        <div ref={wrapRef} className="relative overflow-hidden">

          {/* スライドトラック */}
          <div
            className="flex"
            style={{
              gap: GAP > 0 ? `${GAP}px` : undefined,
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
                    width:       slideW > 0
                      ? `${slideW}px`
                      : `calc(100% - ${(PEEK + GAP) * 2}px)`,
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

          {/* ── 矢印（メイン画像の左右内側） ── */}
          <button
            onClick={goPrev}
            style={{ left: `${PEEK + GAP + 10}px` }}
            className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-stone-600 text-2xl transition-all"
            aria-label="前のスライド"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            style={{ right: `${PEEK + GAP + 10}px` }}
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
