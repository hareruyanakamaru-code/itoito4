"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden bg-stone-100 rounded-b-none">
      {/* メイン画像 */}
      <div className="relative h-56 md:h-80 w-full">
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <Image
              src={src}
              alt={`${title} - 写真${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none" />

        {/* 左右ボタン（複数枚のときだけ表示） */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="前の写真"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="次の写真"
            >
              ›
            </button>
          </>
        )}

        {/* 枚数インジケーター */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white w-4" : "bg-white/50"}`}
                aria-label={`写真${i + 1}を表示`}
              />
            ))}
          </div>
        )}

        {/* 枚数バッジ */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-30 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* サムネイル一覧 */}
      {images.length > 1 && (
        <div className="flex gap-1.5 p-2 bg-stone-900/5 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all ${i === current ? "ring-2 ring-amber-500" : "opacity-60 hover:opacity-100"}`}
            >
              <Image
                src={src}
                alt={`サムネイル${i + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
