import Link from "next/link";
import HostApplyForm from "@/components/HostApplyForm";

export const metadata = {
  title: "ホスト申請",
  description: "itoito でホストとして体験を提供しませんか？申請フォームよりご応募ください。",
};

export default function HostApplyPage() {
  return (
    <div className="max-w-xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← トップに戻る
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">ホスト申請</h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          あなたの「得意」や「好き」を体験として提供しませんか。<br />
          内容を確認後、<strong className="text-stone-700">3営業日以内</strong>にご連絡します。
        </p>
      </div>

      {/* 審査フロー */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mb-6">
        <p className="text-xs font-bold text-amber-700 mb-3">📋 審査の流れ</p>
        <ol className="flex flex-col gap-2 text-xs text-stone-600">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
            フォームでご応募 → 運営より連絡（3営業日以内）
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
            オンライン面談（30分程度）
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
            審査通過後、体験ページを公開
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6 md:p-8">
        <HostApplyForm />
      </div>
    </div>
  );
}
