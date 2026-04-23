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

export async function sendApplicantConfirmation({
  experienceTitle,
  experienceDate,
  experienceTime,
  experienceLocation,
  hostName,
  applicantName,
  applicantEmail,
}: {
  experienceTitle: string;
  experienceDate: string;
  experienceTime: string;
  experienceLocation: string;
  hostName: string;
  applicantName: string;
  applicantEmail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxx")) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: applicantEmail,
    subject: "【itoito】お申し込みを受け付けました",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fffdf7;">
        <div style="text-align:center;padding:24px 0 16px;">
          <span style="font-size:40px;">🌱</span>
          <h1 style="color:#b45309;font-size:20px;margin-top:12px;">お申し込みを受け付けました</h1>
        </div>
        <p style="color:#57534e;font-size:14px;line-height:1.7;">${applicantName} 様<br><br>
          itoito をご利用いただきありがとうございます。<br>
          以下の体験へのお申し込みを受け付けました。
        </p>

        <div style="background:#fff;border:1px solid #fde68a;border-radius:12px;padding:20px;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:100px;border-radius:4px;">体験名</td><td style="padding:8px 12px;font-weight:bold;color:#1c1917;">${experienceTitle}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;">開催日時</td><td style="padding:8px 12px;color:#44403c;">${experienceDate}　${experienceTime}</td></tr>
            <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">場所</td><td style="padding:8px 12px;color:#44403c;">${experienceLocation}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;">パートナー</td><td style="padding:8px 12px;color:#44403c;">${hostName}</td></tr>
          </table>
        </div>

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:16px 0;">
          <p style="color:#166534;font-size:14px;margin:0;line-height:1.7;">
            📩 パートナーより <strong>3営業日以内</strong> にメールにてご連絡いたします。<br>
            しばらくお待ちください。
          </p>
        </div>

        <p style="color:#a8a29e;font-size:12px;text-align:center;margin-top:24px;">
          このメールは itoito（イトイト）より自動送信されています。<br>
          お問い合わせは <a href="https://itoito4.vercel.app/contact" style="color:#b45309;">こちら</a> から。
        </p>
      </div>
    `,
  });
}

export async function sendHostApplicationNotification({
  applicantName,
  applicantEmail,
  phone,
  experienceOverview,
  targetAge,
  childExperience,
  achievements,
  safetyConsideration,
}: {
  applicantName: string;
  applicantEmail: string;
  phone: string;
  experienceOverview: string;
  targetAge: string;
  childExperience: string;
  achievements: string;
  safetyConsideration: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL ?? "hareruyanakamaru@gmail.com";
  if (!apiKey || apiKey.startsWith("re_xxx")) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: notifyEmail,
    subject: `【itoito】パートナー申請が届きました：${applicantName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#b45309;border-bottom:2px solid #fde68a;padding-bottom:8px;">パートナー申請が届きました</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;width:160px;">氏名</td><td style="padding:8px 12px;">${applicantName}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">メール</td><td style="padding:8px 12px;"><a href="mailto:${applicantEmail}">${applicantEmail}</a></td></tr>
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">電話番号</td><td style="padding:8px 12px;">${phone}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">体験の概要</td><td style="padding:8px 12px;white-space:pre-wrap;">${experienceOverview}</td></tr>
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">対象年齢</td><td style="padding:8px 12px;">${targetAge}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">子どもとの関わり経験</td><td style="padding:8px 12px;white-space:pre-wrap;">${childExperience}</td></tr>
          <tr><td style="padding:8px 12px;background:#fef3c7;font-weight:bold;">活動実績・SNS</td><td style="padding:8px 12px;">${achievements || "（なし）"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;">安全への配慮</td><td style="padding:8px 12px;white-space:pre-wrap;">${safetyConsideration}</td></tr>
        </table>
      </div>
    `,
  });
}

export async function sendHostApplicationConfirmation({
  applicantName,
  applicantEmail,
}: {
  applicantName: string;
  applicantEmail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxx")) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: applicantEmail,
    subject: "【itoito】パートナー申請を受け付けました",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fffdf7;">
        <div style="text-align:center;padding:24px 0 16px;">
          <span style="font-size:40px;">🌿</span>
          <h1 style="color:#b45309;font-size:20px;margin-top:12px;">パートナー申請を受け付けました</h1>
        </div>
        <p style="color:#57534e;font-size:14px;line-height:1.7;">${applicantName} 様<br><br>
          パートナー申請をいただきありがとうございます。<br>
          内容を確認の上、<strong>3営業日以内</strong>にご連絡いたします。
        </p>
        <div style="background:#fef3c7;border-radius:12px;padding:16px;margin:20px 0;">
          <p style="color:#92400e;font-size:14px;margin:0;line-height:1.7;">
            📋 次のステップ<br>
            1. 運営スタッフが申請内容を確認します<br>
            2. オンライン面談（30分程度）をご案内します<br>
            3. 審査通過後、体験を投稿できるようになります
          </p>
        </div>
        <p style="color:#a8a29e;font-size:12px;text-align:center;margin-top:24px;">
          itoito（イトイト）運営チーム<br>
          お問い合わせは <a href="https://itoito4.vercel.app/contact" style="color:#b45309;">こちら</a> から。
        </p>
      </div>
    `,
  });
}

export async function sendHostApprovalEmail({
  applicantName,
  applicantEmail,
}: {
  applicantName: string;
  applicantEmail: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxx")) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "itoito <onboarding@resend.dev>",
    to: applicantEmail,
    subject: "【itoito】パートナー申請が承認されました 🎉",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fffdf7;">
        <div style="text-align:center;padding:24px 0 16px;">
          <span style="font-size:40px;">🎉</span>
          <h1 style="color:#b45309;font-size:20px;margin-top:12px;">パートナー申請が承認されました！</h1>
        </div>
        <p style="color:#57534e;font-size:14px;line-height:1.7;">${applicantName} 様<br><br>
          itoitoのパートナーとして承認されました。おめでとうございます！<br>
          さっそく体験を投稿して、参加者との出会いを楽しみましょう。
        </p>
        <div style="text-align:center;margin:24px 0;">
          <a href="https://itoito4.vercel.app/host"
            style="background:#f59e0b;color:white;font-weight:bold;padding:12px 32px;border-radius:50px;text-decoration:none;font-size:15px;">
            体験を投稿する →
          </a>
        </div>
        <p style="color:#a8a29e;font-size:12px;text-align:center;margin-top:24px;">
          itoito（イトイト）運営チーム
        </p>
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
