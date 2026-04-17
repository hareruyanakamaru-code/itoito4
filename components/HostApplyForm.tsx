"use client";

import { useState } from "react";
import { submitHostApplication } from "@/lib/actions";

export default function HostApplyForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await submitHostApplication(formData);
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      {/* 氏名 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-stone-700">
          氏名（本名）<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <input
          type="text" id="name" name="name" required
          placeholder="山田 花子"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
        />
      </div>

      {/* メールアドレス */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-stone-700">
          メールアドレス<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <input
          type="email" id="email" name="email" required
          placeholder="hanako@example.com"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
        />
      </div>

      {/* 電話番号 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-stone-700">
          電話番号<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <input
          type="tel" id="phone" name="phone" required
          placeholder="090-0000-0000"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
        />
      </div>

      {/* 体験の概要 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="experienceOverview" className="text-sm font-medium text-stone-700">
          提供したい体験の概要<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <p className="text-xs text-stone-400">どんな体験を、どこで、どのくらいの時間で提供したいかを書いてください。</p>
        <textarea
          id="experienceOverview" name="experienceOverview" required rows={4}
          placeholder="例：自宅の庭で行う野菜の種まき・収穫体験。約2時間。土に触れながら食の大切さを伝えたい。"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
        />
      </div>

      {/* 対象年齢 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="targetAge" className="text-sm font-medium text-stone-700">
          体験の対象年齢<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <input
          type="text" id="targetAge" name="targetAge" required
          placeholder="例：小学生〜大人、6歳〜12歳"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
        />
      </div>

      {/* 子どもとの関わり経験 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="childExperience" className="text-sm font-medium text-stone-700">
          子どもとの関わり経験<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <p className="text-xs text-stone-400">教員・保育士・部活顧問・ボランティアなど、子どもと関わった経験を教えてください。</p>
        <textarea
          id="childExperience" name="childExperience" required rows={3}
          placeholder="例：小学校で10年間担任を務めました。放課後の農園活動を主催し、毎年20名の生徒が参加しています。"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
        />
      </div>

      {/* 活動実績・SNS（任意） */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="achievements" className="text-sm font-medium text-stone-700">
          活動実績・SNSアカウント
          <span className="text-stone-400 text-xs font-normal ml-1">任意</span>
        </label>
        <p className="text-xs text-stone-400">Instagramアカウント、ブログURL、資格、メディア掲載など自由にご記入ください。</p>
        <textarea
          id="achievements" name="achievements" rows={3}
          placeholder="例：Instagram @hanako_farm（フォロワー2,000人）/ 野菜ソムリエ資格取得"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
        />
      </div>

      {/* 安全への配慮 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="safetyConsideration" className="text-sm font-medium text-stone-700">
          安全への配慮<span className="text-red-400 text-xs ml-1">必須</span>
        </label>
        <p className="text-xs text-stone-400">怪我・アレルギー・緊急時の対応など、参加者の安全についてどう考えているか教えてください。</p>
        <textarea
          id="safetyConsideration" name="safetyConsideration" required rows={3}
          placeholder="例：作業前に安全説明を行います。救急セットを常備し、アレルギーは事前アンケートで確認します。"
          className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
        />
      </div>

      <p className="text-xs text-stone-400 leading-relaxed">
        送信することで、
        <a href="/privacy" className="text-amber-700 hover:underline">プライバシーポリシー</a>
        および
        <a href="/terms" className="text-amber-700 hover:underline">利用規約</a>
        に同意したものとみなされます。
      </p>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-2 font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base flex items-center justify-center gap-2 ${
          submitting
            ? "bg-stone-300 text-stone-500 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 text-white"
        }`}
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
            送信中...
          </>
        ) : (
          "申請を送信する →"
        )}
      </button>
    </form>
  );
}
