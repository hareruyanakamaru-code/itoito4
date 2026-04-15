import Link from "next/link";

export default function ApplyDonePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold text-stone-800 mb-3">
        申し込みが完了しました！
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        お申し込みいただきありがとうございます。
        <br />
        ホストから確認のご連絡をお待ちください。
      </p>
      <Link
        href="/"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
      >
        体験一覧に戻る
      </Link>
    </div>
  );
}
