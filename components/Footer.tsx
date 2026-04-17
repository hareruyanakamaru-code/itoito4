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
        <nav className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <Link href="/contact" className="text-xs text-stone-400 hover:text-amber-700 transition-colors">
            お問い合わせ
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
          <a
            href="https://www.instagram.com/itoito_taiken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-400 hover:text-amber-700 transition-colors flex items-center gap-1"
          >
            📷 Instagram
          </a>
        </nav>

        {/* 運営者情報 */}
        <div className="bg-white/60 rounded-xl p-4 border border-amber-100 max-w-sm mx-auto mb-6">
          <p className="text-xs text-stone-400 text-center mb-1">運営者</p>
          <p className="text-sm font-semibold text-stone-700 text-center">中丸 晴也（Nakamaru Hareruya）</p>
          <p className="text-xs text-stone-500 text-center mt-0.5">元公立中学校教師 / itoito 代表</p>
        </div>

        {/* コピーライト */}
        <p className="text-xs text-stone-400 text-center">
          © 2026 itoito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
