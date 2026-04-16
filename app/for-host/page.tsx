import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホスト向け説明 | itoito",
  description:
    "itoito でホストになる方法を紹介します。掲載無料・かんたん3ステップで体験を公開できます。",
};

export default function ForHostPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-24 px-4 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl"
        />

        <p className="relative text-amber-600 text-sm font-medium tracking-widest mb-4 uppercase">
          For Host
        </p>
        <h1 className="relative text-4xl md:text-5xl font-extrabold text-stone-800 leading-tight mb-6">
          あなたの体験を、
          <br className="hidden sm:block" />
          <span className="text-amber-500">誰かの宝物に。</span>
        </h1>
        <p className="relative text-stone-500 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          料理、ものづくり、自然案内、探究ワーク……
          <br />
          あなたが得意なことが、誰かにとっての特別な体験になります。
        </p>
        <Link
          href="/host"
          className="relative inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-md text-base"
        >
          今すぐ体験を投稿する
        </Link>
        <p className="relative mt-4 text-xs text-stone-400">
          掲載無料 · いつでも編集可能 · 申し込みはメールで通知
        </p>
      </section>

      {/* ── itoitoでできること ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            What you can do
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            itoito でできること
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-stone-100 bg-[#fdfaf6] p-7 flex flex-col gap-4"
              >
                <div className="text-3xl">{b.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-amber-500 mb-1">
                    {b.tag}
                  </p>
                  <h3 className="text-base font-bold text-stone-800 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 料金モデル補足 */}
          <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-2xl shrink-0">💴</span>
            <div>
              <p className="font-bold text-stone-800 mb-0.5">
                掲載は完全無料。成立時のみ手数料をいただきます。
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">
                申し込みが成立した場合、参加費の
                <span className="font-bold text-amber-700">10%</span>
                をプラットフォーム手数料としていただきます。
                掲載・修正・削除はいつでも無料で行えます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3ステップ ── */}
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
              <div
                key={s.title}
                className="bg-white rounded-2xl border border-stone-100 p-6 flex items-start gap-5"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">{s.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{s.body}</p>
                </div>
                <div className="shrink-0 text-2xl hidden sm:block">{s.icon}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/host"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-md text-base"
            >
              体験を投稿してみる
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs font-semibold text-amber-500 tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-stone-800 mb-12">
            よくある質問
          </h2>
          <div className="flex flex-col gap-4">
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

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-xl mx-auto text-center text-white">
          <p className="text-amber-100 text-sm font-medium mb-3">
            🌱 まずは無料で始めてみましょう
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug">
            あなたの体験を
            <br />
            投稿してみませんか？
          </h2>
          <p className="text-amber-100 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            登録不要・掲載無料。フォームに記入するだけで、
            すぐに体験を公開できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/host"
              className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
            >
              体験を投稿する
            </Link>
            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full border border-amber-400/50 transition-colors"
            >
              体験一覧を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── データ ── */

const benefits = [
  {
    icon: "🆓",
    tag: "費用",
    title: "掲載は完全無料",
    body: "体験の掲載・編集・削除は何度でも無料。申し込みが成立したときのみ、参加費の10%をいただきます。",
  },
  {
    icon: "📋",
    tag: "かんたん操作",
    title: "フォームに入力するだけ",
    body: "タイトル・説明・日程・場所・料金を入力するだけで体験ページが完成。特別なスキルは不要です。",
  },
  {
    icon: "📬",
    tag: "申し込み管理",
    title: "申し込みはメールで通知",
    body: "ゲストから申し込みが届くとメールでお知らせ。やり取りはメールで直接行えるのでシンプルです。",
  },
];

const steps = [
  {
    icon: "📝",
    title: "体験情報を入力する",
    body: "タイトル・説明・日程・場所・参加費・定員などを投稿フォームに記入します。5分程度で完了します。",
  },
  {
    icon: "🌐",
    title: "体験ページが公開される",
    body: "入力内容がそのまま体験ページになります。一覧ページに掲載され、ゲストが閲覧できるようになります。",
  },
  {
    icon: "🤝",
    title: "申し込みを受けて体験当日へ",
    body: "ゲストから申し込みが届いたらメールで確認。あとは当日を楽しみに準備するだけです。",
  },
];

const faqs = [
  {
    q: "どんな体験でも投稿できますか？",
    a: "基本的にはどんな体験でも投稿いただけます。ただし、法律に反する内容・危険を伴う内容・公序良俗に反する内容は掲載をお断りする場合があります。",
  },
  {
    q: "掲載後に内容を変更できますか？",
    a: "はい、いつでも編集・削除が可能です。日程変更や定員変更なども柔軟に対応できます。",
  },
  {
    q: "申し込みが来たらどうすればいいですか？",
    a: "申し込み内容がメールで届きます。ゲストのメールアドレスが記載されているので、直接やり取りして詳細を調整してください。",
  },
  {
    q: "体験の料金は自分で決められますか？",
    a: "はい、参加費は完全にホストが自由に設定できます。無料体験の投稿も可能です。",
  },
  {
    q: "個人でも投稿できますか？",
    a: "もちろんです。法人・個人を問わず、どなたでも投稿いただけます。副業・趣味の延長線での参加も大歓迎です。",
  },
];
