import { NextRequest, NextResponse } from "next/server";
import { getAllExperiences } from "@/lib/experiences";
import { kvGetAddedExperiences, kvGetApplications } from "@/lib/kv-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Vercel Cron認証
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const BASE_URL = "https://itoito4.vercel.app";
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY未設定" }, { status: 500 });
  }

  // 昨日の日付を取得
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 昨日開催の体験を取得
  const allExperiences = [
    ...getAllExperiences(),
    ...(await kvGetAddedExperiences()),
  ];
  const yesterdayExps = allExperiences.filter((exp) => {
    const endDate = exp.dateTo ?? exp.date;
    return endDate === yesterdayStr;
  });

  if (yesterdayExps.length === 0) {
    return NextResponse.json({ ok: true, message: "昨日開催の体験なし", sent: 0 });
  }

  // 承認済み申し込みを取得
  const applications = await kvGetApplications();
  const approvedApps = applications.filter((app) => app.status === "承認");

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  let sentCount = 0;
  const errors: string[] = [];

  for (const exp of yesterdayExps) {
    const expApps = approvedApps.filter((app) => app.experienceId === exp.id);
    const reviewUrl = `${BASE_URL}/experiences/${exp.id}/review`;

    for (const app of expApps) {
      try {
        // ゲストへフィードバック依頼メール
        await resend.emails.send({
          from: "itoito <onboarding@resend.dev>",
          to: app.email,
          subject: `【itoito】「${exp.title}」の体験はいかがでしたか？`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
              <h2 style="color:#f59e0b;">体験はいかがでしたか？ 🌟</h2>
              <p>${app.name} さん、こんにちは。<br/>
              昨日の「<strong>${exp.title}</strong>」はお楽しみいただけましたか？</p>
              <p>ぜひ率直なフィードバックをお聞かせください。<br/>
              あなたの声がホストの改善と、次のゲストへの参考になります。</p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${reviewUrl}"
                   style="background:#f59e0b;color:white;font-weight:bold;padding:14px 32px;border-radius:999px;text-decoration:none;display:inline-block;">
                  フィードバックを送る →
                </a>
              </div>
              <p style="font-size:12px;color:#a8a29e;">
                所要時間は約2〜3分です。ご協力をよろしくお願いします。<br/>
                itoito 運営チーム
              </p>
            </div>
          `,
        });
        sentCount++;
      } catch (err) {
        errors.push(`${app.email}: ${String(err)}`);
      }
    }
  }

  return NextResponse.json({
    ok: true,
    date: yesterdayStr,
    experiences: yesterdayExps.length,
    sent: sentCount,
    errors: errors.length > 0 ? errors : undefined,
  });
}
