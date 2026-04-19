import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ ok: false, message: "KV_REST_API_URL / KV_REST_API_TOKEN が未設定" });
  }

  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });

    const ping = await redis.ping();
    const experiences = await redis.get<unknown[]>("itoito:experiences:added");
    const expCount = Array.isArray(experiences) ? experiences.length : 0;

    return NextResponse.json({
      ok: true,
      ping,
      experiences_in_kv: expCount,
      message: "Upstash接続成功🎉",
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
