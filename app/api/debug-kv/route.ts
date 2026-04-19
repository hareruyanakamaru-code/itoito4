import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Upstash/KV関連の環境変数を全部チェック
  const allVars: Record<string, string> = {};
  const keys = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "UPSTASH_REDIS_URL",
    "UPSTASH_REDIS_TOKEN",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
    "KV_REST_API_READ_ONLY_TOKEN",
    "KV_URL",
    "REDIS_URL",
  ];

  for (const key of keys) {
    const val = process.env[key];
    if (val) {
      allVars[key] = `✅ 設定済み: ${val.slice(0, 40)}...`;
    } else {
      allVars[key] = "❌ 未設定";
    }
  }

  const hasAny = Object.values(allVars).some((v) => v.startsWith("✅"));

  return NextResponse.json({
    hasAnyRedisVar: hasAny,
    variables: allVars,
    message: hasAny
      ? "上記の変数名をClaude Codeに伝えてください"
      : "Upstashの環境変数が1つも見つかりません。Vercel → Project Settings → Environment Variables を確認してください",
  });
}
