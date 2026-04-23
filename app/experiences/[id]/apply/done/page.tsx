import Link from "next/link";
import { addApplication, getExperienceById } from "@/lib/experiences";
import { sendApplicationNotification, sendToSpreadsheet } from "@/lib/done-helpers";

export const dynamic = "force-dynamic";

async function handleStripeSuccess(sessionId: string) {
  try {
    const { getStripe } = await import("@/lib/stripe");
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;

    const meta = session.metadata ?? {};
    const exp = getExperienceById(meta.experienceId ?? "");
    if (!exp) return null;

    const app = addApplication({
      experienceId: meta.experienceId,
      name: meta.name,
      email: meta.email,
      childAge: meta.childAge ?? "",
      adults: Number(meta.adults ?? 1),
      children: Number(meta.children ?? 0),
      message: meta.message ?? "",
    });

    // 通知（失敗しても無視）
    try {
      await sendApplicationNotification({
        experienceTitle: exp.title,
        applicantName: meta.name,
        applicantEmail: meta.email,
        childAge: meta.childAge ?? "",
        message: meta.message ?? "",
      });
    } catch { /* ignore */ }

    try {
      await sendToSpreadsheet({
        createdAt: app.createdAt,
        experienceTitle: exp.title,
        applicantName: meta.name,
        applicantEmail: meta.email,
        message: meta.message ?? "",
      });
    } catch { /* ignore */ }

    return { name: meta.name, experienceTitle: exp.title };
  } catch {
    return null;
  }
}

export default async function ApplyDonePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  let paymentInfo: { name: string; experienceTitle: string } | null = null;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    paymentInfo = await handleStripeSuccess(sessionId);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold text-stone-800 mb-3">
        {paymentInfo ? "お支払い・申し込みが完了しました！" : "申し込みが完了しました！"}
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        {paymentInfo ? (
          <>
            <span className="font-semibold text-stone-700">{paymentInfo.name}</span> さんの申し込みを受け付けました。
            <br />
            パートナーより<span className="font-semibold text-stone-700">3営業日以内</span>にメールでご連絡します。
          </>
        ) : (
          <>
            お申し込みいただきありがとうございます。
            <br />
            パートナーより<span className="font-semibold text-stone-700">3営業日以内</span>にメールでご連絡します。
          </>
        )}
      </p>

      {/* 次のステップ */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left mb-8">
        <h2 className="text-sm font-bold text-amber-700 mb-4">📋 次のステップ</h2>
        <ol className="flex flex-col gap-3 text-sm text-stone-600">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>パートナーから確認メールが届きます（3営業日以内）</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>メールの案内に沿って参加準備をしてください</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>当日は体験を思いきり楽しんでください！</span>
          </li>
        </ol>
      </div>

      <Link
        href="/"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-sm"
      >
        体験一覧に戻る
      </Link>
    </div>
  );
}
