import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import ExperienceGrid from "@/components/ExperienceGrid";
import CategoryCards from "@/components/CategoryCards";
import HeroImage from "@/components/HeroImage";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const today = new Date().toISOString().split("T")[0];

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
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 sm:py-28 px-4 overflow-hidden">
        {/* hero.jpg + オーバーレイ（画像がない場合はグラデーション表示） */}
        <HeroImage />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-amber-300 text-sm font-medium mb-3 tracking-wide drop-shadow">
            🌱 教科書には載っていない学びがある
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-snug mb-4 drop-shadow-md">
            教室を飛び出し、
            <br />
            <span className="text-amber-400">プロの現場へ。</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed drop-shadow">
            元教師が審査した、本物の体験だけを届けます。
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
              className="text-sm text-white/80 hover:text-white transition-colors underline underline-offset-4"
            >
              体験を提供したい方はこちら
            </Link>
          </div>
        </div>
      </section>

      {/* ── メインメッセージ ── */}
      <section
        className="py-14 sm:py-20 px-4"
        style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
      >
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

      {/* ── カテゴリー ── */}
      <CategoryCards />

      {/* ── 体験一覧 ── */}
      <ExperienceGrid experiences={experiences} />

      {/* ── About itoito ── */}
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
            スキルを持つ大人の方、ホストとして参加しませんか。
          </p>
          <Link
            href="/for-host"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-md"
          >
            ホストになる →
          </Link>
        </div>
      </section>

      {/* ── 注目のホスト（B） ── */}
      <section className="py-16 sm:py-20 px-4 bg-[#fdfaf6]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Featured Hosts
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-2">
            現場を教える、プロの師匠たち。
          </h2>
          <p className="text-center text-sm text-stone-400 mb-10">
            教科書には載っていない、本物の経験を持つ大人たち。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredHosts.map((h) => (
              <div key={h.name} className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col items-center text-center gap-4 shadow-sm">
                {/* 円形アバター */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0 overflow-hidden relative"
                  style={{ background: h.avatarBg }}
                >
                  {h.avatarImg ? (
                    <Image src={h.avatarImg} alt={h.name} fill className="object-cover" />
                  ) : (
                    <span>{h.avatarInitial}</span>
                  )}
                </div>
                {/* 名前・肩書き */}
                <div>
                  <p className="font-extrabold text-stone-800 text-base">{h.name}</p>
                  <p className="text-xs text-amber-600 mt-0.5">{h.role}</p>
                </div>
                {/* 一言 */}
                <p className="text-sm text-stone-500 leading-relaxed flex-1 italic">
                  「{h.quote}」
                </p>
                {/* ボタン */}
                <Link
                  href={h.href}
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-400 px-4 py-2 rounded-full transition-colors"
                >
                  この人の体験を見る →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 利用者の声（C 強化版） ── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
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
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4 shadow-sm"
              >
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
                {/* 帰宅後の変化 */}
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-3 py-2">
                  <p className="text-[10px] font-semibold text-amber-500 mb-0.5 tracking-wide uppercase">
                    その後の変化 →
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">{r.change}</p>
                </div>
                {/* 体験名・属性 */}
                <div className="border-t border-stone-100 pt-3">
                  <p className="text-xs font-semibold text-amber-600 mb-0.5">{r.experience}</p>
                  <p className="text-xs text-stone-400">{r.attribute}</p>
                </div>
              </div>
            ))}
          </div>
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

      {/* ── 運営者紹介 ── */}
      <section className="py-16 sm:py-20 px-4 bg-[#fdfaf6] border-t border-stone-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-10">
            Founder
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            <div className="shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-100 shadow-md relative bg-amber-50">
                <Image
                  src="/images/founder.jpg"
                  alt="中丸 はれるや"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-amber-600 font-semibold tracking-wide mb-1">
                元公立中学校教師・体験プロデューサー
              </p>
              <h3 className="text-2xl font-extrabold text-stone-800 mb-5">
                中丸 はれるや
              </h3>
              <blockquote className="text-stone-600 text-base leading-relaxed space-y-3">
                <p>「教師として10年以上、子どもたちと向き合ってきました。</p>
                <p>
                  学校の授業では絶対に届かない『本物の現場』が、
                  子どもの目を輝かせる瞬間を何度も見てきました。
                </p>
                <p>itoitoは、そんな瞬間をもっと多くの子どもたちに届けるために作りました。」</p>
              </blockquote>
              <div className="mt-6">
                <Link
                  href="/operator"
                  className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-4 transition-colors"
                >
                  運営者について詳しく →
                </Link>
              </div>
            </div>
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

const featuredHosts = [
  {
    name: "中丸 晴留哉",
    role: "竹あかり作家・元中学校教師",
    quote: "光と影の間に、子どもの目が輝く瞬間があります。",
    avatarBg: "#f59e0b",
    avatarImg: "/images/founder.jpg",
    avatarInitial: "中",
    href: "/experiences/1",
  },
  {
    name: "山本 誠",
    role: "パン職人・フランス修行10年",
    quote: "パン生地の声を聞く。それが職人の仕事です。",
    avatarBg: "#d97706",
    avatarImg: null,
    avatarInitial: "山",
    href: "/experiences/2",
  },
  {
    name: "佐々木農園",
    role: "有機農家・千葉県富津市",
    quote: "土に触れた手は、生涯忘れない感覚を持ちます。",
    avatarBg: "#65a30d",
    avatarImg: null,
    avatarInitial: "佐",
    href: "/experiences/3",
  },
  {
    name: "渡辺 翔",
    role: "ネイチャーガイド・生態学研究者",
    quote: "自然の中に入ると、子どもは別人みたいに生き生きします。",
    avatarBg: "#16a34a",
    avatarImg: null,
    avatarInitial: "渡",
    href: "/experiences/5",
  },
  {
    name: "中村 理恵",
    role: "理系研究者・大学非常勤講師",
    quote: "『なぜ？』という問いを持てた子どもは、一生学び続けられます。",
    avatarBg: "#0891b2",
    avatarImg: null,
    avatarInitial: "中",
    href: "/experiences/7",
  },
  {
    name: "田中 健一",
    role: "イタリアンシェフ・料理研究家",
    quote: "食材を選ぶことから、料理は始まっています。",
    avatarBg: "#e11d48",
    avatarImg: null,
    avatarInitial: "田",
    href: "/experiences/2",
  },
];

const reviews = [
  {
    experience: "竹あかり設営体験",
    attribute: "小学5年生・男子の保護者",
    comment:
      "竹に穴を開けて光が灯った瞬間、感動して泣いてしまいました。自分の手で何かを作れるって、こんなに嬉しいんだと初めて知りました。",
    change: "帰宅後、家にある竹で工作を始めました。",
  },
  {
    experience: "パン職人と学ぶ天然酵母パン作り",
    attribute: "中学1年生・女子本人",
    comment:
      "発酵のしくみを実際に見て触って学べた。学校の授業より100倍面白かったし、理科が好きになりました。",
    change: "翌日、図書館で発酵について調べていました。",
  },
  {
    experience: "川の生き物を探せ！フィールド生態観察",
    attribute: "小学3年生・保護者",
    comment:
      "子どもが生き物に夢中になる姿を久しぶりに見ました。スマホを一切触らず3時間没頭していたのが印象的でした。",
    change: "その後、毎週末に川や公園に行きたがるようになりました。",
  },
];
