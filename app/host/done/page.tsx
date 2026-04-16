import Link from "next/link";

export default function HostDonePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🌱</div>
      <h1 className="text-2xl font-bold text-stone-800 mb-3">
        体験を投稿しました！
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        素敵な体験の投稿ありがとうございます。
        <br />
        一覧ページに掲載されましたので、ゲストからの申し込みをお待ちください。
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-sm"
        >
          体験一覧を見る
        </Link>
        <Link
          href="/host"
          className="inline-block bg-white hover:bg-amber-50 text-amber-700 font-bold px-6 py-3 rounded-full border border-amber-200 transition-colors"
        >
          もう1件投稿する
        </Link>
      </div>
    </div>
  );
}
