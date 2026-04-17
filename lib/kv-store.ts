/**
 * Vercel KV ラッパー
 * - KV未設定時（ローカル開発）はnullを返す安全な実装
 * - Vercelダッシュボードでストレージ → KV を有効化すると自動的に機能する
 */

import type { Experience, Application, HostApplication } from "./types";

const KV_EXPERIENCES_KEY = "itoito:experiences:added";
const KV_APPLICATIONS_KEY = "itoito:applications";
const KV_HOST_APPLICATIONS_KEY = "itoito:host-applications";

function isKVAvailable(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

async function getKV() {
  if (!isKVAvailable()) return null;
  const { kv } = await import("@vercel/kv");
  return kv;
}

/* ─── 体験 ─── */
export async function kvGetAddedExperiences(): Promise<Experience[]> {
  try {
    const kv = await getKV();
    if (!kv) return [];
    const data = await kv.get<Experience[]>(KV_EXPERIENCES_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getAddedExperiences failed:", err);
    return [];
  }
}

export async function kvAddExperience(exp: Experience): Promise<void> {
  try {
    const kv = await getKV();
    if (!kv) return;
    const existing = await kv.get<Experience[]>(KV_EXPERIENCES_KEY) ?? [];
    await kv.set(KV_EXPERIENCES_KEY, [...existing, exp]);
  } catch (err) {
    console.warn("[KV] addExperience failed:", err);
  }
}

/* ─── 申し込み ─── */
export async function kvGetApplications(): Promise<Application[]> {
  try {
    const kv = await getKV();
    if (!kv) return [];
    const data = await kv.get<Application[]>(KV_APPLICATIONS_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getApplications failed:", err);
    return [];
  }
}

export async function kvAddApplication(app: Application): Promise<void> {
  try {
    const kv = await getKV();
    if (!kv) return;
    const existing = await kv.get<Application[]>(KV_APPLICATIONS_KEY) ?? [];
    await kv.set(KV_APPLICATIONS_KEY, [...existing, app]);
  } catch (err) {
    console.warn("[KV] addApplication failed:", err);
  }
}

export async function kvUpdateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<void> {
  try {
    const kv = await getKV();
    if (!kv) return;
    const all = await kv.get<Application[]>(KV_APPLICATIONS_KEY) ?? [];
    const updated = all.map((a) => (a.id === id ? { ...a, status } : a));
    await kv.set(KV_APPLICATIONS_KEY, updated);
  } catch (err) {
    console.warn("[KV] updateApplicationStatus failed:", err);
  }
}

/* ─── ホスト申請 ─── */
export async function kvGetHostApplications(): Promise<HostApplication[]> {
  try {
    const kv = await getKV();
    if (!kv) return [];
    const data = await kv.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY);
    return data ?? [];
  } catch (err) {
    console.warn("[KV] getHostApplications failed:", err);
    return [];
  }
}

export async function kvAddHostApplication(app: HostApplication): Promise<void> {
  try {
    const kv = await getKV();
    if (!kv) return;
    const existing = await kv.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY) ?? [];
    await kv.set(KV_HOST_APPLICATIONS_KEY, [...existing, app]);
  } catch (err) {
    console.warn("[KV] addHostApplication failed:", err);
  }
}

export async function kvUpdateHostApplicationStatus(
  id: string,
  status: HostApplication["status"]
): Promise<HostApplication | null> {
  try {
    const kv = await getKV();
    if (!kv) return null;
    const all = await kv.get<HostApplication[]>(KV_HOST_APPLICATIONS_KEY) ?? [];
    const updated = all.map((a) => (a.id === id ? { ...a, status } : a));
    await kv.set(KV_HOST_APPLICATIONS_KEY, updated);
    return updated.find((a) => a.id === id) ?? null;
  } catch (err) {
    console.warn("[KV] updateHostApplicationStatus failed:", err);
    return null;
  }
}
