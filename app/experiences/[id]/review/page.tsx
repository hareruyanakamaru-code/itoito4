import { getExperienceById } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "フィードバック | itoito" };

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp =
    getExperienceById(id) ??
    (await kvGetAddedExperiences()).find((e) => e.id === id);
  if (!exp) notFound();

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Link
        href={`/experiences/${id}`}
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← 体験詳細に戻る
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
        <h1 className="text-xl font-bold text-stone-800 mb-1">
          フィードバックをお送りください
        </h1>
        <p className="text-sm text-stone-500 mb-6 leading-relaxed">
          体験への率直なご意見がパートナーの改善と、次の参加者への参考になります。
          ご協力ありがとうございます。
        </p>
        <ReviewForm experienceId={id} experienceTitle={exp.title} />
      </div>
    </div>
  );
}
