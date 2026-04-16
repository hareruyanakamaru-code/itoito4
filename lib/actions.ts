"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Resend } from "resend";
import {
  addApplication,
  addExperience,
  getExperienceById,
  updateApplicationStatus,
  getAdminCredentials,
  updateAdminCredentials,
  type ApplicationStatus,
} from "./experiences";

/* ─── メール送信ヘルパー ─── */
async function sendApplicationNotification({
  experienceTitle,
  applicantName,
  applicantEmail,
  message,
}: {
  experienceTitle: string;
  applicantName: string;
  applicantEmail: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "hareruyanakamaru@gmail.com";

  // APIキーが未設定の場合はスキップ（開発中）
  if (!apiKey || apiKey.startsWith("re_xxx")) {
    console.log("[Resend] APIキー未設定のためメール送信をスキップしました");
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: notifyEmail,
    subject: "【itoito】新しい申し込みが届きました",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#b45309;border-bottom:2px solid #fde68a;padding-bottom:8px;">
          新しい申し込みが届きました
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr>
            <td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:120px;border-radius:4px;">体験名</td>
            <td style="padding:8px 12px;">${experienceTitle}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:bold;">申し込み者</td>
            <td style="padding:8px 12px;">${applicantName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">メール</td>
            <td style="padding:8px 12px;">
              <a href="mailto:${applicantEmail}">${applicantEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:bold;">メッセージ</td>
            <td style="padding:8px 12px;">${message || "（なし）"}</td>
          </tr>
        </table>
        <p style="margin-top:24px;font-size:13px;color:#78716c;">
          管理画面でステータスを確認・更新できます：
          <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/admin">
            /admin
          </a>
        </p>
      </div>
    `,
  });
}

/* ─── Google スプレッドシート連携ヘルパー ─── */
async function sendToSpreadsheet({
  createdAt,
  experienceTitle,
  applicantName,
  applicantEmail,
  message,
}: {
  createdAt: string;
  experienceTitle: string;
  applicantName: string;
  applicantEmail: string;
  message: string;
}) {
  const webhookUrl = process.env.SPREADSHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[Sheets] SPREADSHEET_WEBHOOK_URL 未設定のためスキップしました");
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      createdAt,
      experienceTitle,
      applicantName,
      applicantEmail,
      message: message || "",
    }),
  });
}

/* ─── 申し込み送信 ─── */
export async function submitApplication(formData: FormData) {
  const experienceId = formData.get("experienceId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!experienceId || !name || !email) {
    throw new Error("必須項目が入力されていません");
  }

  const app = addApplication({ experienceId, name, email, message });
  const exp = getExperienceById(experienceId);
  const experienceTitle = exp?.title ?? `体験ID: ${experienceId}`;

  // メール通知（失敗しても申し込みは完了させる）
  try {
    await sendApplicationNotification({
      experienceTitle,
      applicantName: name,
      applicantEmail: email,
      message,
    });
  } catch (err) {
    console.error("[Resend] メール送信エラー:", err);
  }

  // スプレッドシート連携（失敗しても申し込みは完了させる）
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

  if (!title || !description || !date || !location || !hostName) {
    throw new Error("必須項目が入力されていません");
  }

  const tags = tagsRaw
    ? tagsRaw.split(/[,、]/).map((t) => t.trim()).filter(Boolean)
    : [];

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
  });

  redirect("/host/done");
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
