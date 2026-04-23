"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { finalizeApplication } from "@/lib/actions";
import type { Experience } from "@/lib/types";
import { hostName } from "@/lib/types";

const payjpEnabled = Boolean(process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY);

type Step = 1 | 2 | 3;

type FormValues = {
  name: string;
  email: string;
  adults: string;
  children: string;
  childAge: string;
  allergy: string;
  message: string;
};

export default function ApplyForm({ exp }: { exp: Experience }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    adults: "1",
    children: "0",
    childAge: "",
    allergy: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [confirming, setConfirming] = useState(false);

  function validate(): boolean {
    const e: Partial<FormValues> = {};
    if (!values.name.trim()) e.name = "お名前を入力してください";
    if (!values.email.trim()) e.email = "メールアドレスを入力してください";
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "正しいメールアドレスを入力してください";
    if (Number(values.adults) + Number(values.children) === 0) {
      e.adults = "参加人数を1名以上入力してください";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStep(2);
  }

  function handleConfirm() {
    setStep(3);
  }

  async function handleBankTransferConfirm() {
    setConfirming(true);
    const fullMessage = [
      values.allergy ? `【アレルギー・配慮事項】${values.allergy}` : "",
      values.message ? `【メッセージ】${values.message}` : "",
    ].filter(Boolean).join("\n\n");

    await finalizeApplication({
      experienceId: exp.id,
      name: values.name,
      email: values.email,
      childAge: values.childAge,
      adults: Number(values.adults),
      children: Number(values.children),
      message: fullMessage,
    });

    router.push(`/experiences/${exp.id}/apply/done`);
  }

  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;
  const totalPrice = (Number(values.adults) + Number(values.children)) * exp.price;
  const stepLabel = payjpEnabled ? "お支払い" : "振込案内";

  return (
    <>
      {/* ステップインジケーター */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: "参加者情報" },
          { n: 2, label: "確認" },
          { n: 3, label: stepLabel },
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
          {/* お名前 */}
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

          {/* メール */}
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
            {errors.adults && <p className="text-xs text-red-500">{errors.adults}</p>}
          </div>

          {/* お子さまの年齢 */}
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

          {/* アレルギー・配慮事項（新規追加） */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              アレルギー・配慮事項
              <span className="text-stone-400 text-xs font-normal ml-1">任意</span>
            </label>
            <textarea value={values.allergy}
              onChange={(e) => setValues({ ...values, allergy: e.target.value })}
              rows={2}
              placeholder="食物アレルギー、身体的配慮が必要な点など"
              className="border border-amber-200 bg-amber-50/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none" />
            <p className="text-xs text-stone-400">ホストが事前に確認・準備するために使用します</p>
          </div>

          {/* メッセージ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              ホストへのメッセージ <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <textarea value={values.message}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              rows={3}
              placeholder="参加の動機・質問・その他気になることなど"
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
          <p className="text-sm text-stone-500">内容をご確認のうえ、次へ進んでください。</p>

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
            {values.allergy && <ConfirmRow label="アレルギー・配慮" value={values.allergy} />}
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
            {payjpEnabled ? "お支払いへ進む →" : "申し込みを確認する →"}
          </button>

          <button type="button" onClick={() => setStep(1)}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center">
            ← 入力内容を修正する
          </button>
        </div>
      )}

      {/* ステップ3A：銀行振込フロー（PAY.JP未設定時） */}
      {step === 3 && !payjpEnabled && (
        <div className="flex flex-col gap-5">
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
            <h2 className="font-bold text-emerald-800 mb-1 flex items-center gap-2">
              🏦 お振込みについて
            </h2>
            <p className="text-sm text-emerald-700 leading-relaxed">
              申し込み確定後、振込先口座をメールでお送りします。
              メール受信から<strong>3営業日以内</strong>にお振込みをお願いします。
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 flex flex-col gap-2">
            <p className="text-xs text-stone-400 mb-1">お支払い金額</p>
            <p className="text-2xl font-extrabold text-amber-700">¥{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-stone-500 mt-1">
              大人 {values.adults}名 + 子ども {values.children}名 × ¥{exp.price.toLocaleString()}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 text-sm text-stone-600 leading-relaxed">
            <p className="font-semibold text-stone-800 mb-2">📋 申し込みの流れ</p>
            <ol className="flex flex-col gap-2 list-none">
              {[
                "「申し込みを確定する」を押す",
                "確認メールが届く（振込先口座が記載）",
                "3営業日以内にお振込み",
                "振込確認後、ホストより詳細連絡",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <button type="button" onClick={handleBankTransferConfirm} disabled={confirming}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base">
            {confirming ? "送信中…" : "申し込みを確定する ✓"}
          </button>

          <button type="button" onClick={() => setStep(2)}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center">
            ← 確認画面に戻る
          </button>
        </div>
      )}

      {/* ステップ3B：クレジットカード（PAY.JP有効時） */}
      {step === 3 && payjpEnabled && (
        <PayjpPaymentStep
          exp={exp}
          values={values}
          totalPrice={totalPrice}
          onBack={() => setStep(2)}
        />
      )}
    </>
  );
}

function PayjpPaymentStep({
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
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);

  const numberRef = useRef<HTMLDivElement>(null);
  const expiryRef = useRef<HTMLDivElement>(null);
  const cvcRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payjpRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberElRef = useRef<any>(null);

  useEffect(() => {
    function init() {
      const pubKey = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payjp = (window as any).Payjp(pubKey);
      payjpRef.current = payjp;
      const elements = payjp.elements();
      const style = {
        base: {
          color: "#292524",
          fontFamily: "sans-serif",
          fontSize: "15px",
          "::placeholder": { color: "#a8a29e" },
        },
      };
      const numEl = elements.create("cardNumber", { style });
      const expEl = elements.create("cardExpiry", { style });
      const cvcEl = elements.create("cardCvc", { style });
      if (numberRef.current) numEl.mount(numberRef.current);
      if (expiryRef.current) expEl.mount(expiryRef.current);
      if (cvcRef.current) cvcEl.mount(cvcRef.current);
      numberElRef.current = numEl;
      setReady(true);
    }

    if (document.getElementById("payjp-js")) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.id = "payjp-js";
    script.src = "https://js.pay.jp/v2/pay.js";
    script.onload = init;
    document.head.appendChild(script);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!payjpRef.current || !numberElRef.current || processing) return;

    setProcessing(true);
    setError(null);

    const { token, error: tokenErr } = await payjpRef.current.createToken(
      numberElRef.current
    );
    if (tokenErr) {
      setError(tokenErr.message || "カード情報が正しくありません");
      setProcessing(false);
      return;
    }

    const fullMessage = [
      values.allergy ? `【アレルギー・配慮事項】${values.allergy}` : "",
      values.message ? `【メッセージ】${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const res = await fetch("/api/payjp/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token.id,
        amount: totalPrice,
        applicationData: {
          experienceId: exp.id,
          name: values.name,
          email: values.email,
          childAge: values.childAge,
          adults: Number(values.adults),
          children: Number(values.children),
          message: fullMessage,
        },
      }),
    });

    const result = await res.json();
    if (!result.success) {
      setError(result.error || "決済に失敗しました");
      setProcessing(false);
      return;
    }

    router.push(`/experiences/${exp.id}/apply/done`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-stone-500">お支払い合計</span>
        <span className="text-xl font-extrabold text-amber-700">
          ¥{totalPrice.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-stone-500">
            カード番号
          </label>
          <div
            ref={numberRef}
            className="border border-stone-200 rounded-xl px-4 py-3 min-h-[46px] bg-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500">
              有効期限
            </label>
            <div
              ref={expiryRef}
              className="border border-stone-200 rounded-xl px-4 py-3 min-h-[46px] bg-white"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500">
              セキュリティコード
            </label>
            <div
              ref={cvcRef}
              className="border border-stone-200 rounded-xl px-4 py-3 min-h-[46px] bg-white"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!ready || processing}
        className={`font-bold py-3.5 rounded-xl transition-all shadow-sm text-base flex items-center justify-center gap-2 ${
          processing || !ready
            ? "bg-stone-300 text-stone-500 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 text-white"
        }`}
      >
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
        <span>🔒</span> PAY.JPの安全な決済システムを使用しています
      </p>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-stone-500 hover:text-amber-700 transition-colors text-center"
      >
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
