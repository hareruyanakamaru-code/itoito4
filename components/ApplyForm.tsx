"use client";

import { useState } from "react";
import { submitApplication } from "@/lib/actions";
import type { Experience } from "@/lib/types";
import { hostName } from "@/lib/types";

type Step = 1 | 2;

type FormValues = {
  name: string;
  email: string;
  childAge: string;
  message: string;
};

export default function ApplyForm({ exp }: { exp: Experience }) {
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    childAge: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  function validate(): boolean {
    const e: Partial<FormValues> = {};
    if (!values.name.trim()) e.name = "お名前を入力してください";
    if (!values.email.trim()) e.email = "メールアドレスを入力してください";
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "正しいメールアドレスを入力してください";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStep(2);
  }

  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;

  return (
    <>
      {/* ステップインジケーター */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: "参加者情報" },
          { n: 2, label: "確認" },
        ].map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-2">
            {i > 0 && <div className="w-6 h-px bg-stone-200" />}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= n
                    ? "bg-amber-500 text-white"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {n}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  step >= n ? "text-stone-700" : "text-stone-400"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-stone-200" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-stone-100 text-stone-400">
              ✓
            </div>
            <span className="text-xs font-medium text-stone-400 hidden sm:block">完了</span>
          </div>
        </div>
      </div>

      {/* ステップ1：入力 */}
      {step === 1 && (
        <form onSubmit={handleNext} className="flex flex-col gap-5">
          {/* お名前 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              申し込み者のお名前 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="text"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="山田 太郎"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* メールアドレス */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              メールアドレス <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              placeholder="taro@example.com"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* お子さまの年齢 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              お子さまの年齢{" "}
              <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <select
              value={values.childAge}
              onChange={(e) => setValues({ ...values, childAge: e.target.value })}
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition bg-white"
            >
              <option value="">選択してください（お子様なし・任意）</option>
              <option value="未就学児（〜5歳）">未就学児（〜5歳）</option>
              <option value="小学校低学年（6〜8歳）">小学校低学年（6〜8歳）</option>
              <option value="小学校中学年（9〜10歳）">小学校中学年（9〜10歳）</option>
              <option value="小学校高学年（11〜12歳）">小学校高学年（11〜12歳）</option>
              <option value="中学生（13〜15歳）">中学生（13〜15歳）</option>
              <option value="高校生（16〜18歳）">高校生（16〜18歳）</option>
              <option value="大人のみ">大人のみ</option>
            </select>
          </div>

          {/* メッセージ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              ホストへのメッセージ{" "}
              <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <textarea
              value={values.message}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              rows={4}
              placeholder="参加の動機・質問・アレルギーなどがあればご記入ください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
          >
            確認画面へ進む →
          </button>
        </form>
      )}

      {/* ステップ2：確認 */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <p className="text-sm text-stone-500">
            以下の内容でよろしければ「申し込みを確定する」を押してください。
          </p>

          {/* 確認テーブル */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
            <ConfirmRow label="体験" value={exp.title} />
            <ConfirmRow label="開催日" value={`${dateLabel}　${exp.time}`} />
            <ConfirmRow label="場所" value={exp.location} />
            <ConfirmRow label="参加費" value={`¥${exp.price.toLocaleString()} / 人`} />
            <ConfirmRow label="ホスト" value={hostName(exp.host)} />
            <div className="border-t border-stone-100" />
            <ConfirmRow label="お名前" value={values.name} />
            <ConfirmRow label="メールアドレス" value={values.email} />
            {values.childAge && (
              <ConfirmRow label="お子さまの年齢" value={values.childAge} />
            )}
            {values.message && (
              <ConfirmRow label="メッセージ" value={values.message} />
            )}
          </div>

          {/* 実際の送信フォーム（サーバーアクション） */}
          <form action={submitApplication} className="flex flex-col gap-3">
            <input type="hidden" name="experienceId" value={exp.id} />
            <input type="hidden" name="name" value={values.name} />
            <input type="hidden" name="email" value={values.email} />
            <input type="hidden" name="childAge" value={values.childAge} />
            <input type="hidden" name="message" value={values.message} />

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
            >
              申し込みを確定する ✓
            </button>
          </form>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center"
          >
            ← 入力内容を修正する
          </button>
        </div>
      )}
    </>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 px-4 py-3 odd:bg-stone-50 even:bg-white text-sm">
      <span className="text-stone-400 w-32 shrink-0">{label}</span>
      <span className="text-stone-800 font-medium break-all">{value}</span>
    </div>
  );
}
