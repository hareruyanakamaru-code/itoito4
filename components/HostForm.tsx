"use client";

import { useState } from "react";
import { submitExperience } from "@/lib/actions";
import Image from "next/image";

type ImageState = { preview: string | null; url: string };

const emptyImage = (): ImageState => ({ preview: null, url: "" });

export default function HostForm() {
  const [images, setImages] = useState<[ImageState, ImageState, ImageState]>([
    emptyImage(), emptyImage(), emptyImage(),
  ]);
  const [uploading, setUploading] = useState<[boolean, boolean, boolean]>([false, false, false]);

  async function handleFile(file: File, index: number) {
    // プレビュー
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => {
        const next = [...prev] as typeof prev;
        next[index] = { ...next[index], preview: e.target?.result as string };
        return next;
      });
    };
    reader.readAsDataURL(file);

    // サーバー経由でImgBBにアップロード（APIキーをクライアントに露出しない）
    setUploading((prev) => {
      const next = [...prev] as typeof prev;
      next[index] = true;
      return next;
    });

    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setImages((prev) => {
          const next = [...prev] as typeof prev;
          next[index] = { ...next[index], url: data.url };
          return next;
        });
      }
    } finally {
      setUploading((prev) => {
        const next = [...prev] as typeof prev;
        next[index] = false;
        return next;
      });
    }
  }

  const hints = [
    { emoji: "📷", title: "1枚目（メイン）", desc: "体験中の笑顔・作業中のカット" },
    { emoji: "📷", title: "2枚目", desc: "完成品・成果物のアップ" },
    { emoji: "📷", title: "3枚目", desc: "会場・空間の雰囲気がわかる写真" },
  ];

  return (
    <form action={submitExperience} className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-stone-700">
          体験タイトル <span className="text-red-400 text-xs">必須</span>
        </label>
        <input type="text" id="title" name="title" required
          placeholder="例：親子で楽しむ手前味噌づくり体験"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-stone-700">
          カテゴリ <span className="text-red-400 text-xs">必須</span>
        </label>
        <select id="category" name="category" required
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition bg-white">
          <option value="">選択してください</option>
          <option value="料理・ものづくり">🍳 料理・ものづくり</option>
          <option value="探究・学び">🔍 探究・学び</option>
          <option value="自然・アウトドア">🌿 自然・アウトドア</option>
          <option value="アート・表現">🎨 アート・表現</option>
          <option value="その他">✨ その他</option>
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-stone-700">
          体験の説明 <span className="text-red-400 text-xs">必須</span>
        </label>
        <textarea id="description" name="description" required rows={5}
          placeholder="体験の内容・楽しみ方・対象者などを詳しく書いてください。"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none" />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-sm font-medium text-stone-700">
            開催日 <span className="text-red-400 text-xs">必須</span>
          </label>
          <input type="date" id="date" name="date" required
            className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="time" className="text-sm font-medium text-stone-700">時間帯</label>
          <input type="text" id="time" name="time" placeholder="例：10:00〜13:00"
            className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className="text-sm font-medium text-stone-700">
          開催場所 <span className="text-red-400 text-xs">必須</span>
        </label>
        <input type="text" id="location" name="location" required
          placeholder="例：東京都世田谷区三軒茶屋"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
      </div>

      {/* Capacity and Price */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="capacity" className="text-sm font-medium text-stone-700">定員（人）</label>
          <input type="number" id="capacity" name="capacity" min={1} defaultValue={10}
            className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-medium text-stone-700">参加費（円）</label>
          <input type="number" id="price" name="price" min={0} defaultValue={3000}
            className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
        </div>
      </div>

      {/* Host info */}
      <div className="border-t border-stone-100 pt-4">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">パートナー情報</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="hostName" className="text-sm font-medium text-stone-700">
              パートナー名 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input type="text" id="hostName" name="hostName" required placeholder="例：田中 花子"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="hostBio" className="text-sm font-medium text-stone-700">自己紹介</label>
            <textarea id="hostBio" name="hostBio" rows={3}
              placeholder="あなたの経歴や体験への想いを書いてください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tags" className="text-sm font-medium text-stone-700">
          タグ <span className="text-stone-400 text-xs font-normal">カンマ区切りで入力</span>
        </label>
        <input type="text" id="tags" name="tags" placeholder="例：親子, 発酵, 食育"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
      </div>

      {/* 写真アップロード */}
      <div className="flex flex-col gap-3 border-t border-stone-100 pt-4">
        <div>
          <p className="text-sm font-medium text-stone-700 mb-0.5">体験の写真 <span className="text-stone-400 text-xs font-normal">最大3枚</span></p>
        </div>

        {/* ヒント */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-xs text-stone-600 flex flex-col gap-2">
          <p className="font-semibold text-amber-700">📸 どんな写真が効果的？</p>
          {hints.map((h, i) => (
            <div key={i} className="flex gap-2">
              <span>{h.emoji} {h.title}</span>
              <span className="text-stone-400">{h.desc}</span>
            </div>
          ))}
          <p className="text-stone-400 mt-1">推奨：横1200px以上 / 横長 / 明るく鮮明な写真</p>
        </div>

        {/* アップロードエリア × 3 */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs text-stone-500 font-medium">
                {i === 0 ? "メイン" : `写真${i + 1}`}
              </span>
              <label className={`relative border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-colors ${img.preview ? "border-amber-300" : "border-stone-200 hover:border-amber-300"}`}>
                {img.preview ? (
                  <div className="relative h-24">
                    <Image src={img.preview} alt={`写真${i + 1}`} fill className="object-cover" />
                    {uploading[i] && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-24 flex flex-col items-center justify-center gap-1">
                    <span className="text-xl">📷</span>
                    <span className="text-xs text-stone-400 text-center">タップして選択</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], i)} />
              </label>
              {/* 隠しフィールドでURLを送信 */}
              <input type="hidden" name={`image${i + 1}`} value={img.url} />
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-400">
          ※ 写真はスマホのカメラロールからも選べます
        </p>
      </div>

      <button type="submit"
        className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base">
        体験を投稿する
      </button>
    </form>
  );
}
