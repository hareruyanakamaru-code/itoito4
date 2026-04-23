import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        {/* メイン行 */}
        <div className="py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-amber-700 group-hover:text-amber-600 transition-colors tracking-tight">
              itoito
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {/* デスクトップのみ表示 */}
            <Link
              href="/"
              className="text-sm text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors hidden sm:inline-flex"
            >
              体験を探す
            </Link>
            <Link
              href="/for-host"
              className="text-sm text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors hidden sm:inline-flex"
            >
              パートナーになる
            </Link>
            <Link
              href="/host"
              className="text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 py-1.5 rounded-full transition-colors shadow-sm ml-1 whitespace-nowrap"
            >
              <span className="hidden sm:inline">体験を投稿する</span>
              <span className="sm:hidden">投稿する</span>
            </Link>
          </nav>
        </div>

        {/* モバイル専用ナビ（sm未満で表示） */}
        <div className="sm:hidden flex gap-1 pb-2 overflow-x-auto">
          <Link
            href="/"
            className="text-xs text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0"
          >
            🔍 体験を探す
          </Link>
          <Link
            href="/for-host"
            className="text-xs text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0"
          >
            🌿 パートナーになる
          </Link>
          <Link
            href="/contact"
            className="text-xs text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0"
          >
            ✉️ お問い合わせ
          </Link>
        </div>
      </div>
    </header>
  );
}
