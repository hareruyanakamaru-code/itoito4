"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type Props = {
  index: number; // 1, 2, 3
  label: string;
  required?: boolean;
  onUploaded: (url: string) => void;
};

export default function ImageUpload({ index, label, required, onUploaded }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // ImgBBにアップロード
    setUploading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        // APIキー未設定の場合はローカルプレビューのみ
        setError("写真のアップロードには管理者設定が必要です。URLを直接入力してください。");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onUploaded(data.data.url);
        setError(null);
      } else {
        setError("アップロードに失敗しました。URLを直接入力してください。");
      }
    } catch {
      setError("アップロードに失敗しました。URLを直接入力してください。");
    }

    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-stone-600">
        {label}
        {required && <span className="text-amber-500 ml-1">（メイン）</span>}
        {!required && <span className="text-stone-400 font-normal ml-1">（任意）</span>}
      </label>

      {/* ドロップゾーン */}
      <div
        className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
          preview ? "border-amber-300" : "border-stone-200 hover:border-amber-300"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <div className="relative h-32">
            <Image src={preview} alt="プレビュー" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
                タップして変更
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 gap-1">
            <span className="text-2xl">📷</span>
            <span className="text-xs text-stone-500">
              {uploading ? "アップロード中..." : "タップして写真を選択"}
            </span>
            <span className="text-xs text-stone-400">スマホのカメラロールからも選べます</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
