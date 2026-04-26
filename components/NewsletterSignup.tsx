"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Vercel KV or Resend audience に保存
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
        <span className="text-4xl">✅</span>
        <p className="font-bold text-stone-800">ご登録ありがとうございます！</p>
        <p className="text-sm text-stone-500">最新の体験情報をお届けします。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレスを入力"
        className="flex-1 px-4 py-3 rounded-full border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white shadow-sm"
        required
      />
      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors shadow-sm shrink-0"
      >
        登録する
      </button>
    </form>
  );
}
