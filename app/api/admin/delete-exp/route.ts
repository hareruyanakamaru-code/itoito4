/**
 * 一時的な管理API: KV内の体験を id で削除
 * 使用後は削除してください
 * POST /api/admin/delete-exp  body: { id: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import type { Experience } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ ok: false, message: "KV未設定" }, { status: 500 });
  }

  const { id } = await req.json() as { id: string };
  if (!id) {
    return NextResponse.json({ ok: false, message: "id必須" }, { status: 400 });
  }

  const redis = new Redis({ url, token });
  const existing = (await redis.get<Experience[]>("itoito:experiences:added")) ?? [];
  const filtered = existing.filter((e) => String(e.id) !== String(id));

  if (filtered.length === existing.length) {
    return NextResponse.json({ ok: false, message: `id ${id} が見つかりません`, count: existing.length });
  }

  await redis.set("itoito:experiences:added", filtered);
  return NextResponse.json({ ok: true, deleted: id, before: existing.length, after: filtered.length });
}
