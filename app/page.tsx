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

      {/* ── メインメッセージ ── */}
      <section className="py-14 sm:py-20 px-4" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
            現場が、究極の学び場。
          </p>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
            "本物の現場"を体験することで、本物の"学び"が生まれる。
          </p>
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

      {/* ── ホスト向けCTA ── */}
      <section className="py-16 px-4 bg-stone-900">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            For Partners
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
            あなたの得意が、
            <br />
            <span className="text-amber-400">子どもたちの学びの種になる。</span>
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            料理・ものづくり・自然体験・専門知識…<br />
            スキルを持つ大人の方、ホストとして体験を届けませんか？
          </p>
          <Link
            href="/for-host"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-md"
          >
            ホストになる →
          </Link>
        </div>
      </section>

      {/* ── 利用者の声 ── */}
      <section className="py-16 sm:py-20 px-4 bg-[#fdfaf6]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Reviews
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-2">
            参加者の声
          </h2>
          <p className="text-center text-sm text-stone-400 mb-10">
            実際に体験した方からいただいたコメントです。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4 shadow-sm">
                {/* 星 */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-base">★</span>
                  ))}
                </div>
                {/* 感想 */}
                <p className="text-stone-700 text-sm leading-relaxed flex-1">
                  「{r.comment}」
                </p>
                {/* 体験名・参加者 */}
                <div className="border-t border-stone-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 mb-0.5">{r.experience}</p>
                  <p className="text-xs text-stone-400">{r.participant}</p>
                </div>
              </div>
            ))}
          </div>
          {/* もっと見るボタン（disabled） */}
          <div className="text-center mt-8">
            <button
              disabled
              className="text-sm text-stone-400 border border-stone-200 px-6 py-2 rounded-full cursor-not-allowed opacity-60"
            >
              もっと見る（準備中）
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── データ ── */

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

const reviews = [
  {
    experience: "竹あかり設営体験",
    participant: "小学5年生（10歳）の保護者より",
    comment: "竹に穴を開けて光が灯った瞬間、感動して泣いてしまいました。自分の手で何かを作れるって、こんなに嬉しいんだと初めて知りました。",
  },
  {
    experience: "パン職人と学ぶ天然酵母パン作り",
    participant: "中学1年生（12歳）",
    comment: "発酵のしくみを実際に見て触って学べた。学校の授業より100倍面白かったし、理科が好きになりました。",
  },
  {
    experience: "川の生き物を探せ！フィールド生態観察",
    participant: "小学3年生（8歳）と保護者",
    comment: "子どもが生き物に夢中になる姿を久しぶりに見ました。スマホを一切触らず3時間没頭していたのが印象的でした。",
  },
];
