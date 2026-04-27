import Link from "next/link";

/* ── SNSアイコン ── */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 10.3c0-4.7-4.7-8.5-10.5-8.5S1 5.6 1 10.3c0 4.2 3.7 7.7 8.8 8.4.3.1.8.2.9.5.1.3 0 .7 0 1l-.1.7c0 .3-.2 1.1 1 .6 1.1-.5 6.2-3.6 8.5-6.2C21.3 13.5 22 12 22 10.3z" />
    </svg>
  );
}

const footerColumns = [
  {
    heading: "体験をさがす",
    links: [
      { label: "カテゴリー一覧", href: "/#experiences" },
      { label: "開催日から探す", href: "/#experiences" },
      { label: "エリアから探す", href: "/#experiences" },
    ],
  },
  {
    heading: "パートナーを探す",
    links: [
      { label: "パートナー一覧", href: "/#featured-hosts" },
      { label: "パートナーになるには", href: "/for-host" },
      { label: "パートナー申請フォーム", href: "/host-apply" },
    ],
  },
  {
    heading: "itoitoについて",
    links: [
      { label: "私たちの想い", href: "/operator" },
      { label: "安全への取り組み", href: "/about" },
      { label: "よくある質問", href: "/contact" },
    ],
  },
  {
    heading: "ご利用ガイド",
    links: [
      { label: "利用の流れ", href: "/about" },
      { label: "キャンセルポリシー", href: "/terms" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">

        {/* ── ロゴ + タグライン + SNS ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-stone-700">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🌱</span>
              <span className="text-xl font-bold text-white tracking-tight">itoito</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              子どもの「やってみたい」をプロと叶える体験プラットフォーム
            </p>
          </div>
          {/* SNSアイコン */}
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/itoito_tankyu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-green-500 flex items-center justify-center transition-colors"
              aria-label="LINE"
            >
              <LineIcon />
            </a>
          </div>
        </div>

        {/* ── 4カラム ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-stone-400 hover:text-amber-400 transition-colors leading-snug"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── 最下部 ── */}
        <div className="border-t border-stone-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">© 2026 itoito. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/tokushoho" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
              特定商取引法に基づく表記
            </Link>
            <Link href="/about" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
              運営者情報
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
