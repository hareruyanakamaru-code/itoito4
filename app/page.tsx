import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import ExperienceGrid from "@/components/ExperienceGrid";
import CategoryCards from "@/components/CategoryCards";
import HeroCarousel from "@/components/HeroCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";
import SearchBar from "@/components/SearchBar";
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
          ① ヒーローカルーセル
      ══════════════════════════════ */}
      <HeroCarousel />

      {/* オレンジアクセントライン */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300" />

      {/* ══════════════════════════════
          ② 安心できる理由（装飾あり）
      ══════════════════════════════ */}
      <section className="relative py-16 sm:py-24 px-4 bg-white overflow-hidden">
        {/* 装飾：星 */}
        <span className="absolute top-8 right-10 text-amber-200 text-3xl pointer-events-none select-none hidden sm:block">✦</span>
        <span className="absolute top-20 right-24 text-amber-100 text-lg pointer-events-none select-none hidden sm:block">✧</span>
        <span className="absolute bottom-10 left-8 text-amber-100 text-2xl pointer-events-none select-none hidden sm:block">⋆</span>
        {/* 装飾：SVG曲線 */}
        <svg className="absolute top-0 right-0 w-72 h-72 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none">
          <path d="M 180 10 Q 100 100 10 180" stroke="#f59e0b" strokeWidth="4" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none">
          <path d="M 10 10 Q 100 80 190 30" stroke="#f59e0b" strokeWidth="4" />
        </svg>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-3">
              ✦ Why itoito
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">
              安心して参加できる<span className="text-amber-500">4つの理由</span>
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
          ③ カテゴリー
      ══════════════════════════════ */}
      <CategoryCards />

      {/* ══════════════════════════════
          ④ 絞り込み検索バー
      ══════════════════════════════ */}
      <SearchBar defaultValues={params} />

      {/* ══════════════════════════════
          ⑤ 体験一覧
      ══════════════════════════════ */}
      <section className="bg-stone-50 pt-8 pb-4" id="experiences">
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
          ⑥ 注目のホスト（コンパクト横並び）
      ══════════════════════════════ */}
      <section className="relative py-20 px-4 bg-white overflow-hidden" id="featured-hosts">
        {/* 装飾：散らした星 */}
        <span className="absolute top-8  left-8   text-amber-100 text-2xl pointer-events-none select-none">✦</span>
        <span className="absolute top-12 right-16 text-amber-100 text-lg  pointer-events-none select-none hidden sm:block">✧</span>
        <span className="absolute top-6  left-1/3 text-amber-100 text-base pointer-events-none select-none hidden md:block">⋆</span>
        <span className="absolute bottom-10 left-20  text-amber-100 text-xl  pointer-events-none select-none hidden sm:block">✦</span>
        <span className="absolute bottom-8  right-12 text-amber-100 text-lg  pointer-events-none select-none">✧</span>
        <span className="absolute bottom-14 left-1/2 text-amber-100 text-base pointer-events-none select-none hidden md:block">⋆</span>

        <div className="max-w-5xl mx-auto">
          {/* 見出し + すべて見る */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-2">
                Featured Partners
              </p>
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

          {/* ホストカード：モバイル横スクロール / md:6列 */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-8 lg:grid-cols-6 lg:gap-10">
            {featuredHosts.map((h) => (
              <div
                key={h.name}
                className="shrink-0 w-28 sm:w-auto flex flex-col items-center text-center gap-2 group"
              >
                {/* 円形アバター（クリックで遷移） */}
                <Link href={h.href} className="block">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0 overflow-hidden relative transition-transform group-hover:scale-105"
                    style={{ background: h.avatarBg }}
                  >
                    {h.avatarImg ? (
                      <Image src={h.avatarImg} alt={h.name} fill className="object-cover" />
                    ) : (
                      <span>{h.avatarInitial}</span>
                    )}
                  </div>
                </Link>

                {/* 名前（リンク） */}
                <Link
                  href={h.href}
                  className="font-bold text-base text-stone-800 hover:text-amber-600 transition-colors leading-tight mt-1"
                >
                  {h.name}
                </Link>

                {/* 肩書き */}
                <p className="text-[11px] text-amber-600 leading-snug -mt-1">{h.role}</p>

                {/* 一言コメント */}
                <p className="text-[11px] text-stone-400 italic leading-relaxed line-clamp-3">
                  「{h.quote}」
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑥ 利用者の声
      ══════════════════════════════ */}
      <section className="relative py-16 sm:py-20 px-4 bg-stone-50 overflow-hidden">
        {/* 装飾 */}
        <span className="absolute top-8 right-12 text-amber-200 text-2xl pointer-events-none select-none hidden sm:block">⋆</span>
        <svg className="absolute top-0 left-0 w-56 h-56 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none">
          <path d="M 10 100 Q 100 20 190 100" stroke="#f59e0b" strokeWidth="4" />
        </svg>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-3">
              Reviews
            </p>
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
                {/* 星 + 属性 */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-base">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 text-right leading-snug max-w-[100px]">{r.attribute}</span>
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
                {/* 体験名 */}
                <p className="text-xs font-semibold text-amber-600 border-t border-stone-100 pt-3">
                  {r.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑦ 運営者紹介
      ══════════════════════════════ */}
      <section className="relative py-16 sm:py-20 px-4 bg-white overflow-hidden">
        {/* 装飾 */}
        <span className="absolute top-10 right-10 text-amber-100 text-3xl pointer-events-none select-none hidden sm:block">✦</span>
        <span className="absolute bottom-10 left-10 text-amber-100 text-2xl pointer-events-none select-none hidden sm:block">⋆</span>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-amber-500 text-xs font-semibold tracking-widest uppercase mb-10">
            Founder
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            {/* 写真 */}
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
            {/* テキスト */}
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
          ⑧ 信頼指標（数字インパクト）
      ══════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 bg-stone-900 overflow-hidden relative">
        {/* 装飾 */}
        <span className="absolute top-6 left-8 text-amber-900 text-4xl pointer-events-none select-none">✦</span>
        <span className="absolute bottom-6 right-8 text-amber-900 text-3xl pointer-events-none select-none">✧</span>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
              Trust Numbers
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              数字が証明する、<span className="text-amber-400">itoitoの信頼</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center gap-2 bg-stone-800 rounded-2xl px-4 py-7 border border-stone-700"
              >
                <span className="text-3xl mb-1">{s.icon}</span>
                <p className="text-3xl md:text-4xl font-extrabold text-amber-400 leading-none">
                  {s.value}
                </p>
                <p className="text-xs text-stone-400 leading-snug mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ⑨ ホスト募集 + メルマガ
      ══════════════════════════════ */}
      <section className="relative py-16 sm:py-20 px-4 bg-amber-50 overflow-hidden">
        {/* 装飾 */}
        <span className="absolute top-6 left-6 text-amber-200 text-4xl pointer-events-none select-none hidden sm:block">✦</span>
        <span className="absolute bottom-6 right-8 text-amber-200 text-3xl pointer-events-none select-none hidden sm:block">✧</span>
        <span className="absolute top-1/2 right-1/4 text-amber-100 text-2xl pointer-events-none select-none hidden sm:block">⋆</span>
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none">
          <path d="M 190 10 Q 100 100 10 190" stroke="#f59e0b" strokeWidth="5" />
        </svg>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* ── 左：ホスト募集 ── */}
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-3">
                For Partners
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800 leading-snug mb-7">
                あなたの得意が、
                <br />
                <span className="text-amber-600">子どもたちの学びの種になる。</span>
              </h2>
              <div className="space-y-5 mb-8">
                {hostCTAPoints.map((p) => (
                  <div key={p.title} className="flex gap-4 items-start">
                    <span className="text-2xl shrink-0 mt-0.5">{p.icon}</span>
                    <div>
                      <p className="font-bold text-stone-800 text-sm mb-0.5">{p.title}</p>
                      <p className="text-xs text-stone-500 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/for-host"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-md"
              >
                パートナーとして登録する →
              </Link>
            </div>

            {/* ── 右：メルマガ登録 ── */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-amber-100">
              <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-3">
                Newsletter
              </p>
              <h3 className="text-lg font-extrabold text-stone-800 mb-2">
                最新情報を受け取る
              </h3>
              <p className="text-sm text-stone-500 mb-5 leading-relaxed">
                新しい体験・パートナーの情報をメールでお届けします。
              </p>
              <NewsletterSignup />
              <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                ✔ スパムメールは送りません<br />
                ✔ いつでも配信解除できます
              </p>
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
    quote: "「なぜ？」という問いを持てた子どもは、一生学び続けられます。",
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

const trustStats = [
  { icon: "⭐", value: "4.8",   label: "平均評価（5段階）" },
  { icon: "👣", value: "100名+", label: "累計参加者数" },
  { icon: "✅", value: "6名",   label: "審査済みパートナー" },
  { icon: "🎓", value: "9件",   label: "開催体験数" },
];

const hostCTAPoints = [
  {
    icon: "🌱",
    title: "子どもたちの未来を育てる",
    body: "あなたの経験が、子どもの「好き」の種になります。",
  },
  {
    icon: "🎨",
    title: "自分らしいスタイルで",
    body: "場所・日程・料金はすべてあなたが決められます。",
  },
  {
    icon: "🤝",
    title: "新しい出会いと可能性",
    body: "itoitoのコミュニティで、同志や家族と繋がれます。",
  },
];
