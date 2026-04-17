import Stripe from "stripe";

// ビルド時にAPIキーがなくてもエラーにならないよう遅延初期化
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}
