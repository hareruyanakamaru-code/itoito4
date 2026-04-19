import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const envStatus = {
    UPSTASH_REDIS_REST_URL: url ? `✅ 設定済み (${url.slice(0, 30)}...)` : "❌ 未設定",
    UPSTASH_REDIS_REST_TOKEN: token ? "✅ 設定済み" : "❌ 未設定",
  };

  if (!url || !token) {
    return NextResponse.json({ ok: false, env: envStatus, message: "Upstash環境変数が設定されていません" });
  }

  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });

    // ping テスト
    const ping = await redis.ping();

    // 保存されている体験数を確認
    const experiences = await redis.get<unknown[]>("itoito:experiences:added");
    const expCount = Array.isArray(experiences) ? experiences.length : 0;

    return NextResponse.json({
      ok: true,
      env: envStatus,
      ping,
      experiences_in_kv: expCount,
      message: "Upstash接続成功",
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      env: envStatus,
      error: String(err),
      message: "Upstash接続エラー",
    });
  }
}
