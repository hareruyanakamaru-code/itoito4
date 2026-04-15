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
        <p className="text-xs text-stone-400 mt-4">
          © 2026 itoito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
