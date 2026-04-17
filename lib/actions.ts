"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { getStripe } from "./stripe";
import {
  sendApplicationNotification,
  sendApplicantConfirmation,
  sendToSpreadsheet,
  sendHostApplicationNotification,
  sendHostApplicationConfirmation,
  sendHostApprovalEmail,
} from "./done-helpers";
import {
  addApplication,
  addExperience,
  getExperienceById,
  updateApplicationStatus,
  getAdminCredentials,
  updateAdminCredentials,
  addHostApplication,
  updateHostApplicationStatus,
  type ApplicationStatus,
  type HostApplicationStatus,
} from "./experiences";
import { hostName } from "./types";


/* ─── Payment Intent 作成（埋め込み決済用） ─── */
export async function createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
  const pi = await getStripe().paymentIntents.create({
    amount,
    currency: "jpy",
  });
  return { clientSecret: pi.client_secret! };
}

/* ─── 申し込み確定（決済完了後に呼ぶ） ─── */
export async function finalizeApplication({
  experienceId,
  name,
  email,
  childAge,
  adults,
  children,
  message,
}: {
  experienceId: string;
  name: string;
  email: string;
  childAge: string;
  adults: number;
  children: number;
  message: string;
}): Promise<void> {
  const exp = getExperienceById(experienceId);
  if (!exp) throw new Error("体験が見つかりません");

  const app = addApplication({ experienceId, name, email, childAge, adults, children, message });

  try {
    await sendApplicationNotification({
      experienceTitle: exp.title,
      applicantName: name,
      applicantEmail: email,
      childAge,
      message,
    });
  } catch (err) {
    console.error("[Resend 運営通知]", err);
  }

  try {
    await sendApplicantConfirmation({
      experienceTitle: exp.title,
      experienceDate: exp.dateTo ? `${exp.date} 〜 ${exp.dateTo}` : exp.date,
      experienceTime: exp.time,
      experienceLocation: exp.location,
      hostName: hostName(exp.host),
      applicantName: name,
      applicantEmail: email,
    });
  } catch (err) {
    console.error("[Resend 自動返信]", err);
  }

  try {
    await sendToSpreadsheet({
      createdAt: app.createdAt,
      experienceTitle: exp.title,
      applicantName: name,
      applicantEmail: email,
      message,
    });
  } catch (err) {
    console.error("[Sheets]", err);
  }

  redirect(`/experiences/${experienceId}/apply/done`);
}

/* ─── 申し込み送信（Stripe決済あり） ─── */
export async function submitApplication(formData: FormData) {
  const experienceId = formData.get("experienceId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const childAge = (formData.get("childAge") as string) ?? "";
  const adults = Number(formData.get("adults") ?? 1);
  const children = Number(formData.get("children") ?? 0);
  const message = (formData.get("message") as string) ?? "";

  if (!experienceId || !name || !email) {
    throw new Error("必須項目が入力されていません");
  }

  const exp = getExperienceById(experienceId);
  if (!exp) throw new Error("体験が見つかりません");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://itoito4.vercel.app";
  const totalParticipants = adults + children;

  // Stripeが設定されている場合は決済フローへ
  if (process.env.STRIPE_SECRET_KEY) {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: exp.title,
              description: `${exp.date} ${exp.time} / ${exp.location}`,
            },
            unit_amount: exp.price,
          },
          quantity: totalParticipants,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${baseUrl}/experiences/${experienceId}/apply/done?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/experiences/${experienceId}/apply`,
      metadata: {
        experienceId,
        name,
        email,
        childAge,
        adults: String(adults),
        children: String(children),
        message,
      },
    });
    redirect(session.url!);
  }

  // Stripe未設定の場合（開発・テスト用）は従来通り
  const app = addApplication({ experienceId, name, email, childAge, adults, children, message });
  const experienceTitle = exp.title;

  try {
    await sendApplicationNotification({
      experienceTitle,
      applicantName: name,
      applicantEmail: email,
      childAge,
      message,
    });
  } catch (err) {
    console.error("[Resend] メール送信エラー:", err);
  }

  try {
    await sendToSpreadsheet({
      createdAt: app.createdAt,
      experienceTitle,
      applicantName: name,
      applicantEmail: email,
      message,
    });
  } catch (err) {
    console.error("[Sheets] スプレッドシート送信エラー:", err);
  }

  redirect(`/experiences/${experienceId}/apply/done`);
}

/* ─── 体験投稿 ─── */
export async function submitExperience(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const capacity = Number(formData.get("capacity"));
  const price = Number(formData.get("price"));
  const hostName = formData.get("hostName") as string;
  const hostBio = formData.get("hostBio") as string;
  const tagsRaw = formData.get("tags") as string;
  const image1 = (formData.get("image1") as string)?.trim() || null;
  const image2 = (formData.get("image2") as string)?.trim() || null;
  const image3 = (formData.get("image3") as string)?.trim() || null;

  if (!title || !description || !date || !location || !hostName) {
    throw new Error("必須項目が入力されていません");
  }

  const tags = tagsRaw
    ? tagsRaw.split(/[,、]/).map((t) => t.trim()).filter(Boolean)
    : [];

  const images = [image1, image2, image3].filter(Boolean) as string[];

  addExperience({
    title,
    description,
    category,
    date,
    time,
    location,
    capacity,
    price,
    host: { name: hostName, bio: hostBio },
    tags,
    image: images[0] ?? null,
    images: images.length > 0 ? images : undefined,
  });

  // 運営者へメールで体験投稿内容を通知（Vercel本番でファイル書き込みができない場合のバックアップ）
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "hareruyanakamaru@gmail.com";
  if (apiKey && !apiKey.startsWith("re_xxx")) {
    try {
      const { Resend: ResendClient } = await import("resend");
      const resend = new ResendClient(apiKey);
      await resend.emails.send({
        from: "itoito <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `【itoito】新しい体験が投稿されました：${title}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#b45309;border-bottom:2px solid #fde68a;padding-bottom:8px;">新しい体験が投稿されました</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
              <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:100px;">タイトル</td><td style="padding:8px 12px;">${title}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;">カテゴリ</td><td style="padding:8px 12px;">${category}</td></tr>
              <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">開催日</td><td style="padding:8px 12px;">${date} ${time}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;">場所</td><td style="padding:8px 12px;">${location}</td></tr>
              <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">ホスト名</td><td style="padding:8px 12px;">${hostName}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;">参加費</td><td style="padding:8px 12px;">¥${price.toLocaleString()}</td></tr>
              <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">説明</td><td style="padding:8px 12px;white-space:pre-wrap;">${description.slice(0, 300)}</td></tr>
            </table>
            <p style="color:#78716c;font-size:12px;margin-top:16px;">※ Vercel本番環境ではファイルに保存されません。管理画面で手動追加が必要な場合があります。</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("[Resend 体験投稿通知]", err);
    }
  }

  redirect("/host/done");
}

/* ─── ホスト申請送信 ─── */
export async function submitHostApplication(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const experienceOverview = (formData.get("experienceOverview") as string)?.trim();
  const targetAge = (formData.get("targetAge") as string)?.trim();
  const childExperience = (formData.get("childExperience") as string)?.trim();
  const achievements = (formData.get("achievements") as string)?.trim() ?? "";
  const safetyConsideration = (formData.get("safetyConsideration") as string)?.trim();

  if (!name || !email || !phone || !experienceOverview || !targetAge || !childExperience || !safetyConsideration) {
    throw new Error("必須項目が入力されていません");
  }

  addHostApplication({ name, email, phone, experienceOverview, targetAge, childExperience, achievements, safetyConsideration });

  try {
    await sendHostApplicationConfirmation({ applicantName: name, applicantEmail: email });
  } catch (err) {
    console.error("[Resend ホスト申請自動返信]", err);
  }

  try {
    await sendHostApplicationNotification({ applicantName: name, applicantEmail: email, phone, experienceOverview, targetAge, childExperience, achievements, safetyConsideration });
  } catch (err) {
    console.error("[Resend ホスト申請運営通知]", err);
  }

  redirect("/host-apply/done");
}

/* ─── ホスト申請ステータス更新（管理画面用） ─── */
export async function changeHostApplicationStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as HostApplicationStatus;

  if (!id || !status) throw new Error("パラメータ不正");

  const app = updateHostApplicationStatus(id, status);
  revalidatePath("/admin");

  // 承認時にホストへ承認メールを送信
  if (status === "承認") {
    try {
      await sendHostApprovalEmail({ applicantName: app.name, applicantEmail: app.email });
    } catch (err) {
      console.error("[Resend ホスト承認メール]", err);
    }
  }
}

/* ─── ステータス更新（管理画面用） ─── */
export async function changeApplicationStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as ApplicationStatus;

  if (!id || !status) throw new Error("パラメータ不正");

  updateApplicationStatus(id, status);
  revalidatePath("/admin");
}

/* ─── 管理画面ログイン ─── */
export async function loginAdmin(formData: FormData) {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  const creds = getAdminCredentials();
  if (username !== creds.username || password !== creds.password) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7日間
    path: "/",
    sameSite: "lax",
  });

  redirect("/admin");
}

/* ─── 管理画面ログアウト ─── */
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

/* ─── 管理画面パスワード変更 ─── */
export async function changeAdminPassword(formData: FormData) {
  const newUsername = (formData.get("newUsername") as string)?.trim();
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const currentPassword = formData.get("currentPassword") as string;

  const creds = getAdminCredentials();
  if (currentPassword !== creds.password) {
    redirect("/admin?passwordError=wrong");
  }
  if (!newPassword || newPassword !== confirmPassword) {
    redirect("/admin?passwordError=mismatch");
  }

  updateAdminCredentials(newUsername || creds.username, newPassword);
  revalidatePath("/admin");
  redirect("/admin?passwordChanged=1");
}

/* ─── お問い合わせフォーム ─── */
export async function sendContactForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    throw new Error("必須項目が入力されていません");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "hareruyanakamaru@gmail.com";

  if (apiKey && !apiKey.startsWith("re_xxx")) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "itoito <onboarding@resend.dev>",
        to: notifyEmail,
        subject: "【itoito】お問い合わせが届きました",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <h2 style="color:#b45309;border-bottom:2px solid #fde68a;padding-bottom:8px;">
              お問い合わせが届きました
            </h2>
            <table style="width:100%;border-collapse:collapse;margin-top:16px;">
              <tr>
                <td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:120px;">お名前</td>
                <td style="padding:8px 12px;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-weight:bold;">メール</td>
                <td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">メッセージ</td>
                <td style="padding:8px 12px;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
        `,
      });
    } catch (err) {
      console.error("[Resend] お問い合わせメール送信エラー:", err);
    }
  }

  redirect("/contact/done");
}
