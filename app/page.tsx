import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import ExperienceGrid from "@/components/ExperienceGrid";
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import FormatTabs from "@/components/FormatTabs";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    area?: string;
    age?: string;
    month?: string;
    date?: string;
    q?: string;
    format?: string;
  }>;
}) {
  const today  = new Date().toISOString().split("T")[0];
  const params = await searchParams;

  const fileExperiences = getAllExperiences();
  const kvExperiences   = await kvGetAddedExperiences();
  const allExperiences  = [...fileExperiences, ...kvExperiences];

  /* ── 期限切れを除外 ── */
  const upcomingExps = allExperiences.filter((exp) => {
    const endDate = exp.dateTo ?? exp.date;
    return endDate >= today;
  });

  /* ── 検索フィルタリング ── */
  const experiences = upcomingExps.filter((exp) => {
    if (params.category && exp.category !== params.category) return false;
    if (params.area     && !exp.location.includes(params.area)) return false;
    if (params.age      && exp.targetAge && !exp.targetAge.includes(params.age)) return false;
    if (params.month    && !exp.date.startsWith(params.month)) return false;
    if (params.date) {
      const d = params.date;
      if (exp.dateTo ? (d < exp.date || d > exp.dateTo) : exp.date !== d) return false;
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      if (!exp.title.toLowerCase().includes(q) && !exp.description.toLowerCase().includes(q)) return false;
    }
    if (params.format && exp.format !== params.format) return false;
    return true;
  });

  const hasFilter = !!(params.category || params.area || params.age || params.month || params.date || params.q || params.format);

  return (
    <div className="bg-white">

      {/* ══════════════════════════════
          ① ヒーロー
      ══════════════════════════════ */}
      <HeroCarousel />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300" />
      <div id="experiences" className="scroll-mt-[57px]" />
      <FormatTabs currentFormat={params.format} />
      <SearchBar defaultValues={params} />

      {/* ══════════════════════════════
          ② 開催予定の体験
      ══════════════════════════════ */}
      <section className="bg-stone-50 pt-8 pb-4">
        <div className="max-w-5xl mx-auto px-4 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-800">
                {hasFilter ? "検索結果" : "開催予定の体験"}
              </h2>
              {hasFilter && (
                <p className="text-xs text-stone-400 mt-0.5">
                  {experiences.length}件ヒット
                  <Link href="/" className="ml-3 text-amber-500 hover:underline">
                    ✕ 絞り込みを解除
                  </Link>
                </p>
              )}
            </div>
            <Link
              href="/experiences/calendar"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline shrink-0"
            >
              すべて見る →
            </Link>
          </div>
        </div>
        <ExperienceGrid experiences={experiences} />
      </section>

      {/* ══════════════════════════════
          ③ 注目のパートナー
      ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-white" id="featured-hosts">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-1">
                現場を教える、注目のパートナー。
              </h2>
              <p className="text-sm text-stone-400">
                教科書には載っていない、本物の経験を持つ大人たち。
              </p>
            </div>
            <Link
              href="#"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline shrink-0"
            >
              すべて見る →
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-8 lg:grid-cols-6 lg:gap-10">
            {featuredHosts.map((h) => (
              <div
                key={h.name}
                className="shrink-0 w-28 sm:w-auto flex flex-col items-center text-center gap-2 group"
              >
                <Link href={h.href} className="block">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-md shrink-0 overflow-hidden relative transition-transform group-hover:scale-105"
                    style={{ background: h.avatarBg }}
                  >
                    {h.avatarImg ? (
                      <Image src={h.avatarImg} alt={h.name} fill className="object-cover" />
                    ) : (
                      <span style={{ color: "#4A4A4A" }}>{h.avatarInitial}</span>
                    )}
                  </div>
                </Link>
                <Link
                  href={h.href}
                  className="font-bold text-base text-stone-800 hover:text-amber-600 transition-colors leading-tight mt-1"
                >
                  {h.name}
                </Link>
                <p className="text-[11px] text-amber-600 leading-snug -mt-1">{h.role}</p>
                <p className="text-[11px] text-stone-400 italic leading-relaxed line-clamp-3">
                  「{h.quote}」
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ④ 参加者の声
      ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
              参加者の声
            </h2>
            <p className="text-sm text-stone-400">実際に体験した方からいただいたコメントです。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-base">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 text-right leading-snug max-w-[100px]">{r.attribute}</span>
                </div>
                <p className="text-stone-700 text-sm leading-relaxed flex-1">
                  「{r.comment}」
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-3 py-2">
                  <p className="text-[10px] font-semibold text-amber-500 mb-0.5 tracking-wide">
                    その後の変化 →
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">{r.change}</p>
                </div>
                <p className="text-xs font-semibold text-amber-600 border-t border-stone-100 pt-3">
                  {r.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑤ 安心して参加できる理由
      ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
              安心して参加できる<span className="text-amber-500">理由</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustPoints.map((t) => (
              <div
                key={t.title}
                className="flex flex-col items-center text-center gap-3 bg-white rounded-2xl px-5 py-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-3xl">{t.icon}</span>
                <div>
                  <p className="text-sm font-bold text-stone-800 mb-1">{t.title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑥ 運営者紹介
      ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            <div className="shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-amber-100 shadow-lg relative bg-amber-50">
                <Image
                  src="/images/founder.jpg"
                  alt="中丸 晴留哉"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-amber-600 font-semibold tracking-wide mb-1">
                元公立中学校教師・体験プロデューサー
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-800 mb-5 leading-snug">
                子どもたちの「やってみたい！」を、<br className="hidden sm:block" />
                本物の現場で叶えたい。
              </h3>
              <div className="text-stone-600 text-base leading-[1.9] space-y-3">
                <p>
                  教師として10年以上、子どもたちと向き合ってきました。
                  学校の授業では届かない「本物の現場」が、子どもの目を輝かせる瞬間を何度も見てきました。
                </p>
                <p>
                  itoitoは、そんな瞬間をもっと多くの子どもたちに届けるために作りました。
                </p>
              </div>
              <p className="text-sm font-bold text-stone-700 mt-5">
                代表　中丸 晴留哉<span className="ml-2 font-normal text-xs text-stone-400">（元中学校教師）</span>
              </p>
              <div className="mt-4">
                <Link
                  href="/operator"
                  className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-4 transition-colors"
                >
                  もっと読む →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑦ パートナー募集（シンプル版）
      ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 bg-amber-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800 leading-snug mb-4">
            あなたの得意が、<br />
            <span className="text-amber-600">子どもたちの学びの種になる。</span>
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            料理・ものづくり・自然体験・専門知識…<br />
            スキルを持つ大人の方、パートナーとして体験を届けませんか。
          </p>
          {/* マイクロコピー */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-500 mb-10">
            <span>✓ 登録は3分で完了</span>
            <span>✓ 掲載は完全無料</span>
            <span>✓ 手数料は永久ゼロ</span>
          </div>
          <Link
            href="/for-host"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-10 py-4 rounded-full transition-colors shadow-md"
          >
            パートナーとして登録する →
          </Link>
        </div>
      </section>

    </div>
  );
}

/* ── データ ── */

const trustPoints = [
  {
    icon: "✅",
    title: "パートナーは全員審査済み",
    body: "掲載前にパートナーの経歴・体験内容を確認。安心できるパートナーだけを紹介しています。",
  },
  {
    icon: "👶",
    title: "少人数制で目が届く",
    body: "定員は多くても10〜12名。パートナーの目が届き、一人ひとりに丁寧に関われる規模です。",
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

// 【3】アバター色を統一: 薄ベージュ #F5EFE6 / 文字 #4A4A4A（中丸さんのみ実写真）
const AVATAR_BG = "#F5EFE6";

const featuredHosts = [
  {
    name: "中丸 晴留哉",
    role: "竹あかり作家・元中学校教師",
    quote: "光と影の間に、子どもの目が輝く瞬間があります。",
    avatarBg: AVATAR_BG,
    avatarImg: "/images/founder.jpg",
    avatarInitial: "中",
    href: "/experiences/1",
  },
  {
    name: "山本 誠",
    role: "パン職人・フランス修行10年",
    quote: "パン生地の声を聞く。それが職人の仕事です。",
    avatarBg: AVATAR_BG,
    avatarImg: null,
    avatarInitial: "山",
    href: "/experiences/2",
  },
  {
    name: "佐々木農園",
    role: "有機農家・千葉県富津市",
    quote: "土に触れた手は、生涯忘れない感覚を持ちます。",
    avatarBg: AVATAR_BG,
    avatarImg: null,
    avatarInitial: "佐",
    href: "/experiences/3",
  },
  {
    name: "渡辺 翔",
    role: "ネイチャーガイド・生態学研究者",
    quote: "自然の中に入ると、子どもは別人みたいに生き生きします。",
    avatarBg: AVATAR_BG,
    avatarImg: null,
    avatarInitial: "渡",
    href: "/experiences/5",
  },
  {
    name: "中村 理恵",
    role: "理系研究者・大学非常勤講師",
    quote: "「なぜ？」という問いを持てた子どもは、一生学び続けられます。",
    avatarBg: AVATAR_BG,
    avatarImg: null,
    avatarInitial: "中",
    href: "/experiences/7",
  },
  {
    name: "田中 健一",
    role: "イタリアンシェフ・料理研究家",
    quote: "食材を選ぶことから、料理は始まっています。",
    avatarBg: AVATAR_BG,
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

