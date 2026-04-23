import Link from "next/link";
import HostForm from "@/components/HostForm";

export default function HostPage() {
  return (
    <div className="max-w-xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors">
        ← トップに戻る
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">体験を投稿する</h1>
        <p className="text-sm text-stone-500">
          あなたの素敵な体験を登録して、参加者と出会いましょう。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6 md:p-8">
        <HostForm />
      </div>
    </div>
  );
}
