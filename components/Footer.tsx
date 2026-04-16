import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-amber-50 border-t border-amber-100">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">🌱</span>
          <span className="text-lg font-bold text-amber-700 tracking-tight">itoito</span>
        </div>
        <p className="text-sm text-stone-500">
          体験を通じて、人と人をつなぐプラットフォーム
        </p>
        <nav className="flex items-center justify-center gap-4 mt-4 mb-2">
          <Link
            href="/privacy"
            className="text-xs text-stone-400 hover:text-amber-700 transition-colors"
          >
            プライバシーポリシー
          </Link>
          <span className="text-stone-300 text-xs">|</span>
          <Link
            href="/terms"
            className="text-xs text-stone-400 hover:text-amber-700 transition-colors"
          >
            利用規約
          </Link>
        </nav>
        <p className="text-xs text-stone-400 mt-2">
          © 2026 itoito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
