import { getExperienceById } from "@/lib/experiences";
import ApplyForm from "@/components/ApplyForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = getExperienceById(id);
  if (!exp) notFound();

  const dateLabel = exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date;

  return (
    <div className="max-w-xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <Link
        href={`/experiences/${exp.id}`}
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← 体験詳細に戻る
      </Link>

      {/* 体験ミニカード */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-6">
        <p className="text-xs text-amber-600 mb-1">{exp.category}</p>
        <p className="font-bold text-stone-800 leading-snug">{exp.title}</p>
        <p className="text-sm text-stone-500 mt-1">
          {dateLabel}　{exp.time}　／　{exp.location}
        </p>
        <p className="text-sm font-semibold text-amber-700 mt-1">
          ¥{exp.price.toLocaleString()} / 人
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6 md:p-8">
        <h1 className="text-xl font-bold text-stone-800 mb-1">申し込みフォーム</h1>
        <p className="text-sm text-stone-500 mb-6">
          必要事項をご入力のうえ、送信してください。
        </p>
        <ApplyForm exp={exp} />
      </div>
    </div>
  );
}
