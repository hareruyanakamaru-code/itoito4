import { getAllExperiences } from "@/lib/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";

export default function HomePage() {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const experiences = getAllExperiences().filter((exp) => {
    const endDate = exp.dateTo ?? exp.date;
    return endDate >= today;
  });

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-600 text-sm font-medium mb-3 tracking-wide">
            🌱 教科書には載っていない学びがある
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-800 leading-snug mb-4">
            子どもの「やってみたい」を、
            <br />
            <span className="text-amber-500">本物の体験に変える。</span>
          </h1>
          <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            料理・ものづくり・自然探究——
            <br className="hidden sm:block" />
            プロや職人から直接学べる、少人数制の体験プラットフォーム。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#experiences"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-md text-base"
            >
              体験をさがす →
            </a>
            <Link
              href="/for-host"
              className="text-sm text-stone-500 hover:text-amber-700 transition-colors underline underline-offset-4"
            >
              体験を提供したい方はこちら
            </Link>
          </div>
        </div>
      </section>

      {/* ── 安心して使える4つの理由 ── */}
      <section className="bg-white border-b border-stone-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-8">
            安心して使える4つの理由
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((t) => (
              <div
                key={t.title}
                className="flex items-start gap-3 bg-amber-50 rounded-2xl px-5 py-4 border border-amber-100"
              >
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div>
                  <p className="text-sm font-bold text-stone-800 mb-0.5">{t.title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{t.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 運営者紹介 */}
          <div className="mt-8 bg-stone-50 rounded-2xl p-6 border border-stone-100 max-w-lg mx-auto flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-2xl shrink-0">
              🧑‍🏫
            </div>
            <div>
              <p className="text-sm font-bold text-stone-800">中丸 晴也（Nakamaru Hareruya）</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                元公立中学校教師。「学校の外にも学びがある」という想いから、itoitoを立ち上げました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── カテゴリバー ── */}
      <section className="border-b border-stone-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 flex-wrap">
          <span className="text-xs text-stone-400 self-center mr-1">カテゴリ:</span>
          {[
            "🍳 料理・ものづくり",
            "🔍 探究・学び",
            "🌿 自然・アウトドア",
            "🖌️ アート・表現",
          ].map((cat) => (
            <span
              key={cat}
              className="text-sm text-stone-600 bg-stone-100 hover:bg-amber-100 hover:text-amber-700 px-3 py-1 rounded-full cursor-pointer transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ── 体験一覧 ── */}
      <section id="experiences" className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-800">
            開催予定の体験
            <span className="ml-2 text-sm font-normal text-stone-400">
              {experiences.length}件
            </span>
          </h2>
          <p className="text-xs text-stone-400 hidden sm:block">終了済みは非表示</p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="text-4xl mb-4">🌱</p>
            <p>まだ体験が登録されていません。</p>
            <Link
              href="/host"
              className="mt-4 inline-block text-amber-600 hover:underline"
            >
              最初の体験を投稿する →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        )}
      </section>

      {/* ── itoitoについて（ストーリー）── */}
      <section className="py-16 px-4 bg-stone-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            About itoito
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-6">
            「やってみたい」が、
            <br />
            人生を変える。
          </h2>
          <p className="text-stone-300 text-base leading-relaxed">
            学校では出会えない大人、教科書には載っていない体験。
            <br className="hidden sm:block" />
            itoitoは、子どもたちの好奇心と、本物の現場をつなぐプラットフォームです。
          </p>
        </div>
      </section>

      {/* ── ホスト募集CTA ── */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-12 px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            あなたの体験をシェアしませんか？
          </h2>
          <p className="text-amber-100 text-sm mb-6">
            料理・ものづくり・自然体験など、あなたの得意なことで
            素敵な体験を提供してみましょう。
          </p>
          <Link
            href="/for-host"
            className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-2.5 rounded-full transition-colors shadow-sm"
          >
            ホストになる →
          </Link>
        </div>
      </section>
    </div>
  );
}

const trustPoints = [
  {
    icon: "✅",
    title: "ホストは全員審査済み",
    body: "掲載前にホストの経歴・体験内容を確認。安心できるホストだけを紹介しています。",
  },
  {
    icon: "👶",
    title: "少人数制で目が届く",
    body: "定員は多くても10〜12名。ホストの目が届き、一人ひとりに丁寧に関われる規模です。",
  },
  {
    icon: "👨‍👩‍👧",
    title: "保護者の同伴OK",
    body: "ほとんどの体験で保護者の同伴・参加が可能。一緒に体験できる機会も多数あります。",
  },
  {
    icon: "🏫",
    title: "元教師が運営",
    body: "元公立中学校教師が運営。教育現場の経験を活かし、安全で学びのある体験を厳選しています。",
  },
];
