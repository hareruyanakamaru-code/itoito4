import fs from "fs";
import path from "path";

// 型・純粋ヘルパーは lib/types.ts から re-export（クライアントコンポーネントでも使用可能）
export type { Experience, Application, ApplicationStatus, AdminConfig } from "./types";
export { hostName, hostBio } from "./types";

import type { Experience, Application, ApplicationStatus, AdminConfig } from "./types";

const experiencesPath = path.join(process.cwd(), "data", "experiences.json");
const applicationsPath = path.join(process.cwd(), "data", "applications.json");
const adminConfigPath = path.join(process.cwd(), "data", "admin-config.json");

export function getAdminCredentials(): AdminConfig {
  try {
    if (fs.existsSync(adminConfigPath)) {
      return JSON.parse(fs.readFileSync(adminConfigPath, "utf-8")) as AdminConfig;
    }
  } catch { /* fall through */ }
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "itoito2026",
  };
}

export function updateAdminCredentials(username: string, password: string): void {
  try {
    fs.writeFileSync(adminConfigPath, JSON.stringify({ username, password }, null, 2), "utf-8");
  } catch {
    console.warn("[admin-config] 書き込みをスキップしました（読み取り専用環境）");
  }
}

export function getAllExperiences(): Experience[] {
  const raw = fs.readFileSync(experiencesPath, "utf-8");
  return JSON.parse(raw) as Experience[];
}

export function getExperienceById(id: string): Experience | undefined {
  return getAllExperiences().find((e) => e.id === id);
}

export function addExperience(experience: Omit<Experience, "id">): Experience {
  const all = getAllExperiences();
  const newId = String(Date.now());
  const newExp: Experience = { id: newId, ...experience };
  all.push(newExp);
  fs.writeFileSync(experiencesPath, JSON.stringify(all, null, 2), "utf-8");
  return newExp;
}

export function getAllApplications(): Application[] {
  // ファイルが存在しない場合（Vercel本番環境など）は空配列を返す
  if (!fs.existsSync(applicationsPath)) return [];
  try {
    const raw = fs.readFileSync(applicationsPath, "utf-8");
    return JSON.parse(raw) as Application[];
  } catch {
    return [];
  }
}

export function addApplication(
  app: Omit<Application, "id" | "createdAt" | "status">
): Application {
  const all = getAllApplications();
  const newApp: Application = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    status: "未確認",
    ...app,
  };
  all.push(newApp);
  // ディレクトリが存在しない場合は作成してから書き込む
  const dir = path.dirname(applicationsPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try {
    fs.writeFileSync(applicationsPath, JSON.stringify(all, null, 2), "utf-8");
  } catch {
    // Vercel本番環境ではファイル書き込みができないため無視
    console.warn("[applications] ファイル書き込みをスキップしました（読み取り専用環境）");
  }
  return newApp;
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): void {
  const all = getAllApplications();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error(`Application ${id} not found`);
  all[idx].status = status;
  try {
    fs.writeFileSync(applicationsPath, JSON.stringify(all, null, 2), "utf-8");
  } catch {
    console.warn("[applications] ファイル書き込みをスキップしました（読み取り専用環境）");
  }
}
