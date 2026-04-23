/**
 * Upstash Redis ラッパー
 * - Upstash未設定時（ローカル開発）はnullを返す安全な実装
 * - Vercel Dashboard → Storage → Upstash → Create → Connectで自動的に機能する
 * - 環境変数: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 */

import type { Experience, Application, HostApplication, Review } from "./types";

const KV_EXPERIENCES_KEY = "itoito:experiences:added";
const KV_APPLICATIONS_KEY = "itoito:applications";
const KV_HOST_APPLICATIONS_KEY = "itoito:host-applications";
const KV_REVIEWS_KEY = "itoito:reviews";

function isKVAvailable(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

async function getRedis() {
  if (!isKVAvailable()) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

/* ─── 体験 ─── */
export async function kvGetAddedExperiences(): Promise<Experience[]> {
  try {
    const redis = await getRedis();
    if (!redis) return [];
    const data = await redis.get<Experience[]>(KV_EXPERIENCES_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getAddedExperiences failed:", err);
    return [];
  }
}

export async function kvAddExperience(exp: Experience): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const existing = (await redis.get<Experience[]>(KV_EXPERIENCES_KEY)) ?? [];
    await redis.set(KV_EXPERIENCES_KEY, [...existing, exp]);
  } catch (err) {
    console.warn("[KV] addExperience failed:", err);
  }
}

/* ─── 申し込み ─── */
export async function kvGetApplications(): Promise<Application[]> {
  try {
    const redis = await getRedis();
    if (!redis) return [];
    const data = await redis.get<Application[]>(KV_APPLICATIONS_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getApplications failed:", err);
    return [];
  }
}

export async function kvAddApplication(app: Application): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const existing = (await redis.get<Application[]>(KV_APPLICATIONS_KEY)) ?? [];
    await redis.set(KV_APPLICATIONS_KEY, [...existing, app]);
  } catch (err) {
    console.warn("[KV] addApplication failed:", err);
  }
}

export async function kvUpdateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const all = (await redis.get<Application[]>(KV_APPLICATIONS_KEY)) ?? [];
    const updated = all.map((a) => (a.id === id ? { ...a, status } : a));
    await redis.set(KV_APPLICATIONS_KEY, updated);
  } catch (err) {
    console.warn("[KV] updateApplicationStatus failed:", err);
  }
}

/* ─── パートナー申請 ─── */
export async function kvGetHostApplications(): Promise<HostApplication[]> {
  try {
    const redis = await getRedis();
    if (!redis) return [];
    const data = await redis.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getHostApplications failed:", err);
    return [];
  }
}

export async function kvAddHostApplication(app: HostApplication): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const existing =
      (await redis.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY)) ?? [];
    await redis.set(KV_HOST_APPLICATIONS_KEY, [...existing, app]);
  } catch (err) {
    console.warn("[KV] addHostApplication failed:", err);
  }
}

/* ─── レビュー ─── */
export async function kvGetReviews(): Promise<Review[]> {
  try {
    const redis = await getRedis();
    if (!redis) return [];
    const data = await redis.get<Review[]>(KV_REVIEWS_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getReviews failed:", err);
    return [];
  }
}

export async function kvAddReview(review: Review): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const existing = (await redis.get<Review[]>(KV_REVIEWS_KEY)) ?? [];
    await redis.set(KV_REVIEWS_KEY, [...existing, review]);
  } catch (err) {
    console.warn("[KV] addReview failed:", err);
  }
}

export async function kvGetReviewsByExperience(experienceId: string): Promise<Review[]> {
  const all = await kvGetReviews();
  return all.filter((r) => r.experienceId === experienceId);
}

export async function kvUpdateHostApplicationStatus(
  id: string,
  status: HostApplication["status"]
): Promise<HostApplication | null> {
  try {
    const redis = await getRedis();
    if (!redis) return null;
    const all =
      (await redis.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY)) ?? [];
    const updated = all.map((a) => (a.id === id ? { ...a, status } : a));
    await redis.set(KV_HOST_APPLICATIONS_KEY, updated);
    return updated.find((a) => a.id === id) ?? null;
  } catch (err) {
    console.warn("[KV] updateHostApplicationStatus failed:", err);
    return null;
  }
}
