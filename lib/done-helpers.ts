import { Resend } from "resend";

export async function sendApplicationNotification({
  experienceTitle,
  applicantName,
  applicantEmail,
  childAge,
  message,
}: {
  experienceTitle: string;
  applicantName: string;
  applicantEmail: string;
  childAge: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "hareruyanakamaru@gmail.com";
  if (!apiKey || apiKey.startsWith("re_xxx")) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: notifyEmail,
    subject: "【itoito】新しい申し込みが届きました",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#b45309;border-bottom:2px solid #fde68a;padding-bottom:8px;">新しい申し込みが届きました</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:120px;">体験名</td><td style="padding:8px 12px;">${experienceTitle}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">申し込み者</td><td style="padding:8px 12px;">${applicantName}</td></tr>
          ${childAge ? `<tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">お子さまの年齢</td><td style="padding:8px 12px;">${childAge}</td></tr>` : ""}
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">メール</td><td style="padding:8px 12px;"><a href="mailto:${applicantEmail}">${applicantEmail}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">メッセージ</td><td style="padding:8px 12px;">${message || "（なし）"}</td></tr>
        </table>
      </div>
    `,
  });
}

export async function sendToSpreadsheet({
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
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ createdAt, experienceTitle, applicantName, applicantEmail, message: message || "" }),
  });
}
