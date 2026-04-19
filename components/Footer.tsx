import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-amber-50 border-t border-amber-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* ロゴ＋タグライン */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌱</span>
            <span className="text-lg font-bold text-amber-700 tracking-tight">itoito</span>
          </div>
          <p className="text-sm text-stone-500 text-center">
            体験を通じて、人と人をつなぐプラットフォーム
          </p>
        </div>

        {/* リンク */}
        {/* ホスト向けCTA */}
        <div className="text-center mb-6">
          <Link
            href="/host-apply"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-5 py-2 rounded-full transition-colors shadow-sm"
          >
            🌿 ホストとして体験を提供する →
          </Link>
        </div>

        <nav className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <Link href="/contact" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            お問い合わせ
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <Link href="/for-host" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            ホストになる
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <Link href="/privacy" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            プライバシーポリシー
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <Link href="/terms" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            利用規約
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <Link href="/about" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            運営者情報
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <a
            href="https://www.instagram.com/itoito_tankyu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-400 hover:text-amber-700 transition-colors flex items-center gap-1"
          >
            📷 Instagram
          </a>
        </nav>

        {/* コピーライト */}
        <p className="text-xs text-stone-400 text-center">
          © 2026 itoito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
