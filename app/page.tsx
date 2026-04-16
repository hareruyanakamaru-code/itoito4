import { getAllExperiences } from "@/lib/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";

export default function HomePage() {
  const experiences = getAllExperiences();

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-600 text-sm font-medium mb-3 tracking-wide">
            ✨ 新しい体験が、あなたを待っています
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 leading-snug mb-4">
            やってみたい体験が
            <br />
            きっと見つかる
          </h1>
          <p className="text-stone-500 text-base max-w-md mx-auto mb-8">
            料理・ものづくり・自然探究など、ユニークな体験を提供するホストと
            ゲストをつなぐプラットフォームです。
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="#experiences"
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              体験を見てみる
            </a>
            <Link
              href="/host"
              className="bg-white hover:bg-amber-50 text-amber-700 font-medium px-6 py-2.5 rounded-full border border-amber-200 transition-colors"
            >
              体験を投稿する
            </Link>
          </div>
        </div>
      </section>

      {/* Category badges */}
      <section className="border-b border-stone-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 flex-wrap">
          <span className="text-xs text-stone-400 self-center mr-1">
            カテゴリ:
          </span>
          {["🍳 料理・ものづくり", "🔍 探究・学び", "🌿 自然・アウトドア"].map(
            (cat) => (
              <span
                key={cat}
                className="text-sm text-stone-600 bg-stone-100 hover:bg-amber-100 hover:text-amber-700 px-3 py-1 rounded-full cursor-pointer transition-colors"
              >
                {cat}
              </span>
            )
          )}
        </div>
      </section>

      {/* Experience list */}
      <section id="experiences" className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-800">
            開催予定の体験
            <span className="ml-2 text-sm font-normal text-stone-400">
              {experiences.length}件
            </span>
          </h2>
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

      {/* CTA section */}
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
            href="/host"
            className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-2.5 rounded-full transition-colors shadow-sm"
          >
            体験を投稿する
          </Link>
        </div>
      </section>
    </div>
  );
}
