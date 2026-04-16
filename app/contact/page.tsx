import { sendContactForm } from "@/lib/actions";
import Link from "next/link";

export const metadata = {
  title: "お問い合わせ | itoito",
  description: "itoito へのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← トップに戻る
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">お問い合わせ</h1>
        <p className="text-sm text-stone-500 mt-1">
          ご質問・ご意見などはこちらからお気軽にどうぞ。
          通常2〜3営業日以内にご返信いたします。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
        <form action={sendContactForm} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-stone-700">
              お名前 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="山田 太郎"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-stone-700">
              メールアドレス <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="taro@example.com"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-stone-700">
              メッセージ <span className="text-red-400 text-xs">必須</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="お問い合わせ内容をご記入ください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition resize-none"
            />
          </div>

          <p className="text-xs text-stone-400">
            送信内容は
            <Link href="/privacy" className="text-amber-600 hover:underline">
              プライバシーポリシー
            </Link>
            に基づいて取り扱います。
          </p>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors shadow-sm text-base"
          >
            送信する
          </button>
        </form>
      </div>
    </div>
  );
}
