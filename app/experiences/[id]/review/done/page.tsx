import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperienceById } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";

export default async function ReviewDonePage({
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
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🌟</div>
      <h1 className="text-2xl font-extrabold text-stone-800 mb-3">
        ありがとうございました！
      </h1>
      <p className="text-stone-500 text-base leading-relaxed mb-8">
        フィードバックを受け取りました。
        <br />
        あなたの声がホストと次のゲストのために活かされます。
      </p>

      <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 mb-8 text-left">
        <p className="text-xs text-amber-600 font-semibold mb-1">体験</p>
        <p className="font-bold text-stone-800">{exp.title}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          体験一覧に戻る
        </Link>
        <Link
          href={`/experiences/${id}`}
          className="border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700 font-bold px-8 py-3 rounded-full transition-colors"
        >
          体験詳細を見る
        </Link>
      </div>
    </div>
  );
}
