import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パートナーになる | itoito",
  description:
    "あなたの得意なことを体験として届けよう。掲載無料・初期手数料ゼロ。料理・ものづくり・自然・探究——子どもたちと一緒につくる特別な時間を。",
};

export default function ForHostPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── 先着特典バナー ── */}
      <div className="bg-amber-500 text-white text-center py-2.5 px-4 text-sm font-semibold">
        🎁 先着10名のパートナー限定：成約手数料がずっと0円（永久無料）
        <Link href="/host-apply" className="underline ml-2 opacity-90 hover:opacity-100">
          今すぐ申請 →
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16 pb-24 px-4 text-center">
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl" />

        <p className="relative text-amber-600 text-sm font-semibold tracking-widest mb-4 uppercase">
          For Host
        </p>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight mb-6">
          あなたの経験が、
          <br className="hidden sm:block" />
          <span className="text-amber-500">子どもの人生を変える。</span>
        </h1>
        <p className="relative text-stone-500 text-base md:text-lg max-w-lg mx-auto mb-4 leading-relaxed">
          料理・ものづくり・自然・探究——
          <br />
          あなたが日常でやっていることが、誰かの「初めて」になります。
        </p>

        <div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
          <Link
            href="/host-apply"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-md text-base"
          >
            パートナーに申請する（無料）
          </Link>
          <Link
            href="/host"
            className="w-full sm:w-auto text-sm text-stone-500 hover:text-amber-700 transition-colors underline underline-offset-4"
          >
            まず体験を投稿してみる →
          </Link>
        </div>
        {/* マイクロコピー */}
        <p className="relative mt-3 text-xs text-stone-400 flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>✔ 3分で入力完了</span>
          <span>✔ まずは相談だけでもOK</span>
          <span>✔ 掲載は完全無料</span>
        </p>
      </section>

      {/* ── 3つのメリット ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Why partner with itoito
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            itoitoと組む、3つのメリット
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center text-center rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50 to-white p-8 gap-4 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-800 text-lg leading-snug mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hero直下CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/host-apply"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-4 rounded-full transition-colors shadow-md text-base"
            >
              お申し込み・ご相談はこちら
            </Link>
            <p className="mt-3 text-xs text-stone-400">無料 · 審査あり · いつでもやめられる</p>
          </div>
        </div>
      </section>

      {/* ── こんな方がパートナーになれます ── */}
      <section className="py-20 px-4 bg-[#fdfaf6]">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Who can be a host
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-4">
            こんな方がパートナーになれます
          </h2>
          <p className="text-center text-sm text-stone-400 mb-12">
            「プロじゃないと無理では？」——そんなことはありません。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-stone-100 bg-white p-6 flex flex-col gap-3"
              >
                <div className="text-3xl">{p.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-amber-500 mb-1">{p.tag}</p>
                  <h3 className="font-bold text-stone-800 mb-1.5">{p.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-stone-400 mt-8">
            上記に当てはまらなくても大丈夫。「子どもに伝えたいことがある」方なら、ぜひご相談ください。
          </p>
        </div>
      </section>

      {/* ── itoitoが選ばれる理由 ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            Why itoito
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            itoito が選ばれる理由
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyPoints.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-[#fdfaf6] p-6">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1.5">{p.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── かんたん3ステップ ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            How to start
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            かんたん3ステップで始められる
          </h2>
          <div className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl border border-stone-100 p-6 flex items-start gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">{s.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{s.body}</p>
                  {s.time && (
                    <span className="inline-block mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5">
                      ⏱ {s.time}
                    </span>
                  )}
                </div>
                <div className="shrink-0 text-2xl hidden sm:block">{s.icon}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/host-apply"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-md text-base"
            >
              パートナーに申請する（無料）
            </Link>
          </div>
        </div>
      </section>

      {/* ── よくある不安 ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-4">
            よくある不安・質問
          </h2>
          <p className="text-center text-sm text-stone-400 mb-12">
            「自分にできるかな」と思ったら、まず読んでみてください。
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-[#fdfaf6] border border-stone-100 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 gap-4 list-none">
                  <span className="font-medium text-stone-800 text-sm leading-snug">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-amber-500 text-lg font-bold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 最終CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-xl mx-auto text-center text-white">
          <p className="text-amber-100 text-sm font-medium mb-3">
            🌱 先着10名は成約手数料が永久ゼロ
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug">
            まず、話を聞かせてください。
          </h2>
          <p className="text-amber-100 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            「こんな体験でもいいの？」「子どもとの接し方が不安」——
            どんな相談でも大丈夫。審査なしでお問い合わせできます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/host-apply"
              className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-4 rounded-full transition-colors shadow-sm text-base"
            >
              お申し込み・ご相談はこちら
            </Link>
            <Link
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-full border border-amber-400/50 transition-colors text-base"
            >
              まず相談してみる
            </Link>
          </div>
          <p className="mt-4 text-xs text-amber-200">無料 · 審査あり · いつでもやめられる</p>
        </div>
      </section>
    </div>
  );
}

/* ── データ ── */

const benefits = [
  {
    icon: "🌱",
    title: "あなたの日常が\n誰かの学びになる",
    body: "特別な資格も指導歴も不要。あなたが日常でやっていること、好きなことが、子どもにとっての「本物の探究体験」になります。",
  },
  {
    icon: "💴",
    title: "手数料一律\n事業に新たな価値を",
    body: "成約時のみ10%。掲載・編集は何度でも無料。先着10名のパートナーは成約手数料が永久0円。副業・本業問わず、あなたのビジネスに新たな収益軸を。",
  },
  {
    icon: "🤝",
    title: "体験の流れは\nitoitoがサポート",
    body: "「どんな体験にすれば？」「当日どう進める？」——企画の相談から当日の流れまで、itoitoが一緒に考えます。はじめてでも安心してスタートできます。",
  },
];

const personas = [
  {
    icon: "👩‍🍳",
    tag: "料理・食育",
    title: "料理が好きな方",
    body: "家庭料理でもプロの技でも。子どもに「食」の楽しさを伝えたい方。",
  },
  {
    icon: "🪵",
    tag: "ものづくり・職人",
    title: "手仕事・職人の方",
    body: "木工・陶芸・染め物・竹細工など。技を次世代に伝えたい方。",
  },
  {
    icon: "🌿",
    tag: "自然・アウトドア",
    title: "自然が好きな方",
    body: "農家・ガイド・生物好き。田んぼ・川・森で子どもと過ごしたい方。",
  },
  {
    icon: "🎨",
    tag: "アート・表現",
    title: "クリエイターの方",
    body: "絵・音楽・写真・映像。「表現すること」の面白さを伝えたい方。",
  },
  {
    icon: "🔬",
    tag: "探究・サイエンス",
    title: "理系・研究者の方",
    body: "科学・天文・プログラミング。子どもの「なぜ？」に本気で向き合いたい方。",
  },
  {
    icon: "🏫",
    tag: "教育・元教師",
    title: "教育に関わってきた方",
    body: "元教師・塾講師・支援員。学校の外で子どもと関わりたい方。",
  },
];

const whyPoints = [
  {
    icon: "🆓",
    title: "掲載・申請は完全無料",
    body: "体験ページの作成・編集・削除はすべて無料。申し込みが成立したときのみ手数料をいただきます。先着10名は永久手数料ゼロ。",
  },
  {
    icon: "👨‍👩‍👧",
    title: "子ども連れ家族が集まるプラットフォーム",
    body: "itoitoは「子どもの学び体験」に特化。体験に積極的な保護者が多く、申し込み率が高いのが特徴です。",
  },
  {
    icon: "🛡️",
    title: "審査制で質の高い体験を守る",
    body: "掲載前に内容を確認。質の高い体験が集まる場所に育てているため、パートナー同士の評判が守られます。",
  },
  {
    icon: "📬",
    title: "申し込み管理はシンプル",
    body: "参加者の申し込みはメールで即通知。複雑な管理画面は不要で、メールだけでやり取りできます。",
  },
  {
    icon: "🌱",
    title: "元教師が運営・サポート",
    body: "運営者は元公立中学校教師。教育現場の経験から、パートナーが安心して体験を提供できるようサポートします。",
  },
  {
    icon: "📸",
    title: "SNS・OGPで拡散サポート",
    body: "体験ページには自動でOGP画像が生成され、SNSでシェアされやすい設計。itoitoのInstagramでも紹介します。",
  },
];

const steps = [
  {
    icon: "📝",
    title: "パートナー申請フォームに記入する",
    body: "体験の概要・対象年齢・得意なことを入力して送信するだけ。難しい準備は不要です。",
    time: "約5分",
  },
  {
    icon: "💬",
    title: "運営から連絡・簡単な面談",
    body: "内容を確認後、Zoomまたはメールで簡単にお話しします。「こんな体験でもいい？」という相談もOK。",
    time: "1〜3営業日以内",
  },
  {
    icon: "🌐",
    title: "体験ページを公開・申し込みを受ける",
    body: "承認後、体験の詳細ページを作成して公開。参加者からの申し込みが届いたらメールでお知らせします。",
    time: "承認後すぐ",
  },
];

const faqs = [
  {
    q: "「教えた経験」がなくても大丈夫ですか？",
    a: "大丈夫です。itoitoのパートナーに求めるのは「資格」や「指導歴」ではなく、「自分が好きなことを一緒にやりたい」という気持ちです。子どもは本物のプロセスに感動します。",
  },
  {
    q: "子どもとの接し方がわからなくて不安です",
    a: "ほとんどのパートナーが最初はそう感じています。itoitoでは開催前に運営者がアドバイスをします。子どもは「教わる」より「一緒にやる」ことを喜びます。難しく考えなくて大丈夫です。",
  },
  {
    q: "どんな体験でも投稿できますか？",
    a: "基本的にはどんな体験でも歓迎です。ただし、危険を伴う内容・法律に反する内容はお断りする場合があります。「こんな体験どうかな？」と思ったらまずお問い合わせください。",
  },
  {
    q: "場所がないのですが大丈夫ですか？",
    a: "公園・河原・貸しスタジオ・公民館など、ご自身が手配できる場所であれば問題ありません。場所探しについても一緒に相談できます。",
  },
  {
    q: "何人くらい集まりますか？",
    a: "開始当初は2〜4名程度からのスタートが多いです。itoitoのInstagramや体験ページへの流入を通じて徐々に広がります。まずは少人数でのスタートをおすすめしています。",
  },
  {
    q: "いつでもやめられますか？",
    a: "はい、いつでも掲載を止めることができます。縛りや違約金はありません。体験が合わなかった場合や都合が変わった場合はお気軽にご連絡ください。",
  },
];
