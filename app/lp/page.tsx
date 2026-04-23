import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "itoito — やってみたい体験が、きっと見つかる",
  description:
    "料理・ものづくり・自然探究など、ユニークな体験を提供するパートナーと参加者をつなぐプラットフォーム itoito。",
};

export default function LpPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-24 px-4 text-center">
        {/* 背景デコ */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl"
        />

        <p className="relative text-amber-600 text-sm font-medium tracking-widest mb-4 uppercase">
          Experience Matching Platform
        </p>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight mb-6">
          子どもの「やってみたい」を、
          <br className="hidden sm:block" />
          <span className="text-amber-500">本物の体験に。</span>
        </h1>
        <p className="relative text-stone-500 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          料理・ものづくり・自然探究……
          <br />
          プロや職人と出会う、リアルな体験プラットフォーム
        </p>
        <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md text-base"
          >
            体験をさがす
          </Link>
          <Link
            href="/for-host"
            className="bg-white hover:bg-amber-50 text-amber-700 font-bold px-8 py-3 rounded-full border border-amber-200 transition-colors text-base"
          >
            パートナーになる
          </Link>
        </div>

        {/* 体験件数バッジ */}
        <p className="relative mt-8 text-xs text-stone-400">
          現在 <span className="font-bold text-amber-600">5件</span>{" "}
          の体験を掲載中
        </p>
      </section>

      {/* ── 3つの特徴 ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Features
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            itoito が選ばれる3つの理由
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#fdfaf6] rounded-2xl p-7 border border-stone-100 flex flex-col items-center text-center gap-4"
              >
                <div className="text-4xl">{f.icon}</div>
                <h3 className="text-base font-bold text-stone-800">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 体験カテゴリ ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Categories
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-4">
            どんな体験が見つかるの？
          </h2>
          <p className="text-center text-stone-500 text-sm mb-12">
            探究・ものづくり・自然……ジャンルを超えた体験が集まっています。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {categories.map((c) => (
              <div
                key={c.label}
                className={`rounded-2xl p-7 flex flex-col gap-3 ${c.bg}`}
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="text-base font-bold text-stone-800">{c.label}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-white/60 text-stone-600 px-2.5 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
            >
              すべての体験を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ── パートナー募集 ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
            {/* 背景デコ */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10"
            />
            <p className="relative text-amber-100 text-sm font-medium mb-3">
              🌱 パートナー募集中
            </p>
            <h2 className="relative text-2xl md:text-3xl font-extrabold mb-4 leading-snug">
              あなたの体験を、
              <br />
              誰かの宝物にしませんか？
            </h2>
            <p className="relative text-amber-100 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              掲載は無料。料理・ものづくり・自然案内など、
              あなたの得意なことで素敵な体験を届けましょう。
            </p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/for-host"
                className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
              >
                パートナーページを見る
              </Link>
              <Link
                href="/host"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full border border-amber-400/50 transition-colors"
              >
                今すぐ体験を投稿する
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── データ ── */

const features = [
  {
    icon: "🤝",
    title: "パートナー × 参加者をつなぐ",
    body: "体験を提供したいパートナーと、新しいことに挑戦したい参加者を安心・簡単にマッチングします。",
  },
  {
    icon: "🎒",
    title: "参加者はすぐ申し込める",
    body: "気になった体験はワンクリックで申し込み。メッセージでパートナーに直接質問もできます。",
  },
  {
    icon: "🛡️",
    title: "安心して使える設計",
    body: "パートナーのプロフィール・体験詳細を事前にしっかり確認。透明性のある情報で安心して参加できます。",
  },
];

const categories = [
  {
    icon: "🔍",
    label: "探究・学び",
    desc: "天体観測、自然観察、サイエンス体験……「なぜ？」を大切にする知的好奇心の旅。",
    tags: ["天文", "理科", "自然観察", "フィールドワーク"],
    bg: "bg-emerald-50 border border-emerald-100",
  },
  {
    icon: "🍳",
    label: "料理・ものづくり",
    desc: "味噌・陶芸・料理教室……手を動かして何かをつくる喜びを一緒に体感しましょう。",
    tags: ["発酵", "陶芸", "クッキング", "手仕事"],
    bg: "bg-orange-50 border border-orange-100",
  },
  {
    icon: "🌿",
    label: "自然・アウトドア",
    desc: "森のハイク、農業体験、野外料理……自然の中で身体を動かす体験が揃っています。",
    tags: ["ハイキング", "農業", "里山", "キャンプ"],
    bg: "bg-lime-50 border border-lime-100",
  },
];
