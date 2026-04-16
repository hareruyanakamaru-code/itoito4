import Link from "next/link";

export const metadata = { title: "送信完了 | itoito" };

export default function ContactDonePage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">✉️</div>
      <h1 className="text-2xl font-bold text-stone-800 mb-3">
        お問い合わせを受け付けました
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        お送りいただきありがとうございます。
        <br />
        通常2〜3営業日以内にご返信いたします。
      </p>
      <Link
        href="/"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
