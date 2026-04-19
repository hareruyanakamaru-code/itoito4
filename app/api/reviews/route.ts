import { NextRequest, NextResponse } from "next/server";
import { kvAddReview } from "@/lib/kv-store";
import { getExperienceById } from "@/lib/experiences";
import { kvGetAddedExperiences } from "@/lib/kv-store";
import type { GuestReview, HostReview } from "@/lib/types";

export const dynamic = "force-dynamic";

// ゲストの匿名表示名を生成（A〜Z → AA〜AZ...）
function generateDisplayName(id: string): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = parseInt(id.slice(-4), 16) % 26;
  return `${chars[num]}さん`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { experienceId, type } = body;

    if (!experienceId || !type) {
      return NextResponse.json({ error: "必須パラメータが不足しています" }, { status: 400 });
    }

    const id = `review_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = new Date().toISOString();

    // 体験タイトルを取得（メール用）
    const exp =
      getExperienceById(experienceId) ??
      (await kvGetAddedExperiences()).find((e) => e.id === experienceId);
    const expTitle = exp?.title ?? `体験ID: ${experienceId}`;

    let review: GuestReview | HostReview;

    if (type === "guest") {
      const { overallRating, hostRating, contentRating, goodPoints, improvements, photoUrl, allowSnsShare } = body;
      if (!overallRating || !hostRating || !contentRating || !goodPoints) {
        return NextResponse.json({ error: "必須項目を入力してください" }, { status: 400 });
      }
      review = {
        id,
        experienceId,
        type: "guest",
        createdAt,
        overallRating: Number(overallRating),
        hostRating: Number(hostRating),
        contentRating: Number(contentRating),
        goodPoints,
        improvements: improvements ?? "",
        photoUrl: photoUrl ?? undefined,
        allowSnsShare: Boolean(allowSnsShare),
        displayName: generateDisplayName(id),
      } satisfies GuestReview;
    } else if (type === "host") {
      const { guestImpression, satisfaction, nextEventPlan, comment } = body;
      if (!guestImpression || !satisfaction) {
        return NextResponse.json({ error: "必須項目を入力してください" }, { status: 400 });
      }
      review = {
        id,
        experienceId,
        type: "host",
        createdAt,
        guestImpression: Number(guestImpression),
        satisfaction: Number(satisfaction),
        nextEventPlan: nextEventPlan ?? "maybe",
        comment: comment ?? "",
      } satisfies HostReview;
    } else {
      return NextResponse.json({ error: "typeが不正です" }, { status: 400 });
    }

    // KVに保存
    await kvAddReview(review);

    // 運営者にメール通知
    await sendAdminNotification(review, expTitle);

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[API/reviews] error:", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

async function sendAdminNotification(review: GuestReview | HostReview, expTitle: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!apiKey || !notifyEmail) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const BASE_URL = "https://itoito4.vercel.app";

    if (review.type === "guest") {
      const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
      await resend.emails.send({
        from: "itoito <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `【itoito】新しいゲストレビューが届きました`,
        html: `
          <h2>新しいゲストレビュー</h2>
          <p><strong>体験：</strong>${expTitle}</p>
          <p><strong>投稿者：</strong>${review.displayName}</p>
          <hr/>
          <p>総合評価：${stars(review.overallRating)}（${review.overallRating}/5）</p>
          <p>ホスト評価：${stars(review.hostRating)}（${review.hostRating}/5）</p>
          <p>内容評価：${stars(review.contentRating)}（${review.contentRating}/5）</p>
          <p><strong>よかった点：</strong><br/>${review.goodPoints.replace(/\n/g, "<br/>")}</p>
          ${review.improvements ? `<p><strong>改善点：</strong><br/>${review.improvements.replace(/\n/g, "<br/>")}</p>` : ""}
          ${review.photoUrl ? `<p><strong>写真：</strong><br/><img src="${review.photoUrl}" style="max-width:400px"/></p>` : ""}
          <p><strong>SNSシェア許可：</strong>${review.allowSnsShare ? "はい" : "いいえ"}</p>
          <hr/>
          <p><a href="${BASE_URL}/admin?tab=reviews">管理画面でレビューを確認</a></p>
        `,
      });
    } else {
      const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
      const planLabel = { yes: "はい", maybe: "未定", no: "いいえ" }[review.nextEventPlan];
      await resend.emails.send({
        from: "itoito <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `【itoito】ホストからのフィードバックが届きました`,
        html: `
          <h2>ホストフィードバック</h2>
          <p><strong>体験：</strong>${expTitle}</p>
          <hr/>
          <p>ゲストの印象：${stars(review.guestImpression)}（${review.guestImpression}/5）</p>
          <p>体験の満足度：${stars(review.satisfaction)}（${review.satisfaction}/5）</p>
          <p><strong>次回開催意向：</strong>${planLabel}</p>
          ${review.comment ? `<p><strong>コメント：</strong><br/>${review.comment.replace(/\n/g, "<br/>")}</p>` : ""}
          <hr/>
          <p><a href="${BASE_URL}/admin?tab=reviews">管理画面でレビューを確認</a></p>
        `,
      });
    }
  } catch (err) {
    console.error("[reviews] メール通知エラー:", err);
  }
}
