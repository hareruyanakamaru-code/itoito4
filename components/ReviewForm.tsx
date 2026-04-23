"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Role = "guest" | "host";

function StarInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`text-2xl transition-transform hover:scale-110 ${
              n <= value ? "text-amber-400" : "text-stone-200"
            }`}
            aria-label={`${n}星`}
          >
            ★
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm text-stone-400 self-center">{value}/5</span>
        )}
      </div>
    </div>
  );
}

export default function ReviewForm({
  experienceId,
  experienceTitle,
}: {
  experienceId: string;
  experienceTitle: string;
}) {
  const router = useRouter();
  const [role, setRole] = useState<Role>("guest");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Guest ratings
  const [overallRating, setOverallRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);
  const [contentRating, setContentRating] = useState(0);
  const [goodPoints, setGoodPoints] = useState("");
  const [improvements, setImprovements] = useState("");
  const [allowSnsShare, setAllowSnsShare] = useState(false);

  // Host ratings
  const [guestImpression, setGuestImpression] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [nextEventPlan, setNextEventPlan] = useState<"yes" | "maybe" | "no">("maybe");
  const [comment, setComment] = useState("");

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setPhotoUrl(data.url);
      else setError("写真のアップロードに失敗しました");
    } catch {
      setError("写真のアップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (role === "guest") {
      if (overallRating === 0 || hostRating === 0 || contentRating === 0) {
        setError("すべての星評価を選択してください");
        return;
      }
      if (!goodPoints.trim()) {
        setError("よかった点を入力してください");
        return;
      }
    } else {
      if (guestImpression === 0 || satisfaction === 0) {
        setError("すべての星評価を選択してください");
        return;
      }
    }

    setSubmitting(true);
    try {
      const body =
        role === "guest"
          ? {
              experienceId,
              type: "guest",
              overallRating,
              hostRating,
              contentRating,
              goodPoints,
              improvements,
              photoUrl,
              allowSnsShare,
            }
          : {
              experienceId,
              type: "host",
              guestImpression,
              satisfaction,
              nextEventPlan,
              comment,
            };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("送信に失敗しました");
      router.push(`/experiences/${experienceId}/review/done`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* 体験名 */}
      <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-100 mb-6">
        <p className="text-xs text-amber-600 mb-0.5">対象体験</p>
        <p className="font-bold text-stone-800 text-sm leading-snug">{experienceTitle}</p>
      </div>

      {/* ロール切り替えタブ */}
      <div className="flex gap-1 mb-8 bg-stone-100 rounded-xl p-1">
        {(["guest", "host"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              role === r
                ? "bg-white text-amber-700 shadow-sm"
                : "text-stone-400 hover:text-stone-600"
            }`}
          >
            {r === "guest" ? "👧 参加者として回答" : "🌿 パートナーとして回答"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {role === "guest" ? (
          <>
            {/* 参加者：星評価 */}
            <div className="bg-stone-50 rounded-2xl p-5 flex flex-col gap-5">
              <StarInput label="総合評価" name="overall" value={overallRating} onChange={setOverallRating} />
              <StarInput label="パートナーへの評価" name="host" value={hostRating} onChange={setHostRating} />
              <StarInput label="体験内容への評価" name="content" value={contentRating} onChange={setContentRating} />
            </div>

            {/* 参加者：テキスト */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">
                よかった点 <span className="text-red-400">*</span>
              </label>
              <textarea
                value={goodPoints}
                onChange={(e) => setGoodPoints(e.target.value)}
                rows={4}
                placeholder="体験を通じてよかったこと、印象に残ったことを教えてください"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">
                改善してほしい点
                <span className="text-stone-400 font-normal ml-1">（任意）</span>
              </label>
              <textarea
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={3}
                placeholder="改善を希望する点があれば教えてください"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            {/* 写真アップロード */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-stone-700">
                体験の写真
                <span className="text-stone-400 font-normal ml-1">（任意）</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 text-sm border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? "アップロード中…" : "📷 写真を選択"}
                </button>
                {photoUrl && (
                  <span className="text-xs text-emerald-600 font-medium">✓ アップロード済み</span>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* SNSシェア許可 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowSnsShare}
                onChange={(e) => setAllowSnsShare(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-amber-500"
              />
              <div>
                <span className="text-sm font-medium text-stone-700">
                  SNSシェアを許可する
                </span>
                <p className="text-xs text-stone-400 mt-0.5">
                  itoitoのInstagramなどでこの体験を紹介する際に、写真・コメントを使用することを許可します（名前は匿名化）
                </p>
              </div>
            </label>
          </>
        ) : (
          <>
            {/* パートナー：星評価 */}
            <div className="bg-stone-50 rounded-2xl p-5 flex flex-col gap-5">
              <StarInput label="参加者の印象" name="guest" value={guestImpression} onChange={setGuestImpression} />
              <StarInput label="体験の満足度" name="sat" value={satisfaction} onChange={setSatisfaction} />
            </div>

            {/* 次回開催 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-stone-700">次回開催の意向</label>
              <div className="flex gap-3">
                {([
                  { value: "yes", label: "はい" },
                  { value: "maybe", label: "未定" },
                  { value: "no", label: "いいえ" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setNextEventPlan(opt.value)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                      nextEventPlan === opt.value
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* コメント */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">コメント</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="今回の体験を振り返って、感想や気づきを教えてください"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
          </>
        )}

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
        >
          {submitting ? "送信中…" : "フィードバックを送信する"}
        </button>
      </form>
    </div>
  );
}
