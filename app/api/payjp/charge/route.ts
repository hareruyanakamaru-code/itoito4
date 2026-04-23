import { NextRequest, NextResponse } from "next/server";
import { finalizeApplication } from "@/lib/actions";

type ApplicationData = {
  experienceId: string;
  name: string;
  email: string;
  childAge: string;
  adults: number;
  children: number;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const { token, amount, applicationData } = (await req.json()) as {
      token: string;
      amount: number;
      applicationData: ApplicationData;
    };

    const secretKey = process.env.PAYJP_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "PAY.JP が設定されていません" },
        { status: 500 }
      );
    }

    // PAY.JP にチャージ作成
    const credentials = Buffer.from(`${secretKey}:`).toString("base64");
    const params = new URLSearchParams({
      amount: String(amount),
      currency: "jpy",
      card: token,
      capture: "true",
    });

    const chargeRes = await fetch("https://api.pay.jp/v1/charges", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const charge = await chargeRes.json();

    if (!chargeRes.ok || charge.error) {
      const errMsg =
        charge.error?.message || charge.error?.type || "決済に失敗しました";
      console.error("[PAY.JP Charge error]", charge.error);
      return NextResponse.json({ error: errMsg }, { status: 400 });
    }

    // 決済成功 → 申し込み確定・メール送信
    await finalizeApplication(applicationData);

    return NextResponse.json({ success: true, chargeId: charge.id });
  } catch (err) {
    console.error("[PAY.JP Charge unexpected]", err);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
