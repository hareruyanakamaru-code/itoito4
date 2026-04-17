"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, finalizeApplication } from "@/lib/actions";
import type { Experience } from "@/lib/types";
import { hostName } from "@/lib/types";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

type Step = 1 | 2 | 3;

type FormValues = {
  name: string;
  email: string;
  adults: string;
  children: string;
  childAge: string;
  message: string;
};

export default function ApplyForm({ exp }: { exp: Experience }) {
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    adults: "1",
    children: "0",
    childAge: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [clientSecret, setClientSecret] = useState<string | null>(null);

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

  async function handleConfirm() {
    const total = (Number(values.adults) + Number(values.children)) * exp.price;

    // Stripe設定あり → 埋め込み決済へ
    if (stripePromise && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      const { clientSecret } = await createPaymentIntent(total);
      setClientSecret(clientSecret);
      setStep(3);
      return;
    }

    // Stripe未設定 → 直接確定
    await finalizeApplication({
      experienceId: exp.id,
      name: values.name,
      email: values.email,
      childAge: values.childAge,
      adults: Number(values.adults),
      children: Number(values.children),
      message: values.message,
    });
  }

  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const totalPrice = (Number(values.adults) + Number(values.children)) * exp.price;

  return (
    <>
      {/* ステップインジケーター */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: "参加者情報" },
          { n: 2, label: "確認" },
          { n: 3, label: "お支払い" },
        ].map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-2">
            {i > 0 && <div className="w-6 h-px bg-stone-200" />}
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= n ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-400"}`}>
                {n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= n ? "text-stone-700" : "text-stone-400"}`}>
                {label}
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-stone-200" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-stone-100 text-stone-400">✓</div>
            <span className="text-xs font-medium text-stone-400 hidden sm:block">完了</span>
          </div>
        </div>
      </div>

      {/* ステップ1：入力 */}
      {step === 1 && (
        <form onSubmit={handleNext} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              申し込み者のお名前 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input type="text" value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="山田 太郎"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              メールアドレス <span className="text-red-400 text-xs">必須</span>
            </label>
            <input type="email" value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              placeholder="taro@example.com"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition" />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* 参加人数 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              参加人数 <span className="text-red-400 text-xs">必須</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "adults", label: "大人" },
                { key: "children", label: "子ども" },
              ].map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-xs text-stone-500">{label}</span>
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                    <button type="button"
                      onClick={() => setValues({ ...values, [key]: String(Math.max(0, Number(values[key as keyof FormValues]) - 1)) })}
                      className="px-3 py-2.5 text-stone-500 hover:bg-stone-50 transition-colors text-lg">−</button>
                    <span className="flex-1 text-center text-sm font-medium">{values[key as keyof FormValues]}名</span>
                    <button type="button"
                      onClick={() => setValues({ ...values, [key]: String(Number(values[key as keyof FormValues]) + 1) })}
                      className="px-3 py-2.5 text-stone-500 hover:bg-stone-50 transition-colors text-lg">＋</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              お子さまの年齢 <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <select value={values.childAge}
              onChange={(e) => setValues({ ...values, childAge: e.target.value })}
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition bg-white">
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

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              ホストへのメッセージ <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <textarea value={values.message}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              rows={4}
              placeholder="参加の動機・質問・アレルギーなどがあればご記入ください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none" />
          </div>

          <button type="submit"
            className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base">
            確認画面へ進む →
          </button>
        </form>
      )}

      {/* ステップ2：確認 */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <p className="text-sm text-stone-500">内容をご確認のうえ、お支払いへ進んでください。</p>

          <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
            <ConfirmRow label="体験" value={exp.title} />
            <ConfirmRow label="開催日" value={`${dateLabel}　${exp.time}`} />
            <ConfirmRow label="場所" value={exp.location} />
            <ConfirmRow label="参加費" value={`¥${exp.price.toLocaleString()} / 人`} />
            <ConfirmRow label="参加人数" value={`大人 ${values.adults}名・子ども ${values.children}名`} />
            <ConfirmRow label="ホスト" value={hostName(exp.host)} />
            <div className="border-t border-stone-100" />
            <ConfirmRow label="お名前" value={values.name} />
            <ConfirmRow label="メールアドレス" value={values.email} />
            {values.childAge && <ConfirmRow label="お子さまの年齢" value={values.childAge} />}
            {values.message && <ConfirmRow label="メッセージ" value={values.message} />}
          </div>

          {/* 合計金額 */}
          <div className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
            <span className="text-sm font-medium text-stone-700">お支払い合計</span>
            <span className="text-xl font-extrabold text-amber-700">
              ¥{totalPrice.toLocaleString()}
            </span>
          </div>

          <button type="button" onClick={handleConfirm}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base">
            お支払いへ進む →
          </button>

          <button type="button" onClick={() => setStep(1)}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center">
            ← 入力内容を修正する
          </button>
        </div>
      )}

      {/* ステップ3：カード入力（Stripe Elements） */}
      {step === 3 && clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, locale: "ja" }}>
          <PaymentStep
            exp={exp}
            values={values}
            totalPrice={totalPrice}
            onBack={() => setStep(2)}
          />
        </Elements>
      )}
    </>
  );
}

function PaymentStep({
  exp,
  values,
  totalPrice,
  onBack,
}: {
  exp: Experience;
  values: FormValues;
  totalPrice: number;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "決済に失敗しました");
      setProcessing(false);
      return;
    }

    // 決済成功 → 申し込みを確定
    await finalizeApplication({
      experienceId: exp.id,
      name: values.name,
      email: values.email,
      childAge: values.childAge,
      adults: Number(values.adults),
      children: Number(values.children),
      message: values.message,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-stone-500">お支払い合計</span>
        <span className="text-xl font-extrabold text-amber-700">¥{totalPrice.toLocaleString()}</span>
      </div>

      {/* Stripe カード入力フォーム */}
      <div className="border border-stone-200 rounded-xl p-4">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      <button type="submit" disabled={!stripe || processing}
        className={`font-bold py-3.5 rounded-xl transition-all shadow-sm text-base flex items-center justify-center gap-2 ${
          processing || !stripe
            ? "bg-stone-300 text-stone-500 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 text-white"
        }`}>
        {processing ? (
          <>
            <span className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
            処理中...
          </>
        ) : (
          `¥${totalPrice.toLocaleString()} を支払う`
        )}
      </button>

      <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1">
        <span>🔒</span> Stripeの安全な決済システムを使用しています
      </p>

      <button type="button" onClick={onBack}
        className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center">
        ← 確認画面に戻る
      </button>
    </form>
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
