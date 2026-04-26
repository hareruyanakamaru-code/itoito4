import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ApplyDonePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold text-stone-800 mb-3">
        申し込みが完了しました！
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        お申し込みいただきありがとうございます。
        <br />
        パートナーより<span className="font-semibold text-stone-700">3営業日以内</span>にメールでご連絡します。
      </p>

      {/* 次のステップ */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left mb-8">
        <h2 className="text-sm font-bold text-amber-700 mb-4">📋 次のステップ</h2>
        <ol className="flex flex-col gap-3 text-sm text-stone-600">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>パートナーから確認メールが届きます（3営業日以内）</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>メールの案内に沿って参加準備をしてください</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>当日は体験を思いきり楽しんでください！</span>
          </li>
        </ol>
      </div>

      <Link
        href="/"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
      >
        体験一覧に戻る
      </Link>
    </div>
  );
}
