import { getExperienceById } from "@/lib/experiences";
import { submitApplication } from "@/lib/actions";
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

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href={`/experiences/${exp.id}`}
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← 体験詳細に戻る
      </Link>

      {/* Experience mini card */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-6">
        <p className="text-xs text-amber-600 mb-1">{exp.category}</p>
        <p className="font-bold text-stone-800">{exp.title}</p>
        <p className="text-sm text-stone-500 mt-1">
          {exp.date} {exp.time} ／ {exp.location}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
        <h1 className="text-xl font-bold text-stone-800 mb-1">申し込みフォーム</h1>
        <p className="text-sm text-stone-500 mb-6">
          必要事項をご入力のうえ、送信してください。
        </p>

        <form action={submitApplication} className="flex flex-col gap-5">
          <input type="hidden" name="experienceId" value={exp.id} />

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-stone-700">
              お名前 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="山田 太郎"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-stone-700">
              メールアドレス <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="taro@example.com"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-stone-700">
              メッセージ{" "}
              <span className="text-stone-400 text-xs font-normal">任意</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="参加の動機や質問があればご記入ください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
          >
            申し込みを送信する
          </button>
        </form>
      </div>
    </div>
  );
}
