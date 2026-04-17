import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-8 transition-colors"
      >
        ← トップに戻る
      </Link>

      <h1 className="text-2xl font-bold text-stone-800 mb-8">運営者情報</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8 flex flex-col gap-4">
        <Row label="サービス名" value="itoito（イトイト）" />
        <Row label="運営者" value="中丸晴留哉" />
        <Row label="プロフィール" value="元公立中学校教師。「学校の外にも学びがある」という想いから itoito を立ち上げる。探究・ものづくり・自然体験を通じて、子どもたちと本物の大人をつなぐことを目指している。" />
        <Row label="所在地" value="東京都江東区" />
        <Row label="お問い合わせ" value="お問い合わせフォームよりご連絡ください。" />
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/contact"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm shadow-sm"
        >
          お問い合わせはこちら
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-stone-100 pb-4 last:border-0 last:pb-0">
      <span className="text-xs text-stone-400 sm:w-28 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-stone-700 leading-relaxed">{value}</span>
    </div>
  );
}
