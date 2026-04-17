import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import ExperienceGrid from "@/components/ExperienceGrid";
import Link from "next/link";

export const dynamic = "force-dynamic"; // KVから最新データを常に取得

export default async function HomePage() {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  // JSONファイルの体験 + KVに追加された体験をマージ
  const fileExperiences = getAllExperiences();
  const kvExperiences = await kvGetAddedExperiences();
  const allExperiences = [...fileExperiences, ...kvExperiences];

  const experiences = allExperiences.filter((exp) => {
    const endDate = exp.dateTo ?? exp.date;
    return endDate >= today;
  });

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-14 sm:py-20 px-4">
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
            教科書では出会えない、本物の現場へ。
            <br />
            子どもの好奇心を、プロと一緒に解き放とう。
          </p>
          {/* ③ モバイルはボタン横幅いっぱい */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4 sm:px-0">
            <a
              href="#experiences"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-md text-base text-center"
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
      <section className="bg-white border-b border-stone-100 py-10 sm:py-12 px-4">
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

        </div>
      </section>

      {/* ── 体験一覧（カテゴリフィルター付き） ── */}
      <ExperienceGrid experiences={experiences} />

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
