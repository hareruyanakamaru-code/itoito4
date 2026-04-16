import fs from "fs";
import path from "path";

export type Experience = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  dateTo?: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  targetAge?: string;
  target?: string;
  host: string | { name: string; bio: string };
  hostProfile?: string;
  benefits?: string[];
  parentNote?: string;
  tags?: string[];
  image?: string | null;
};

/** host フィールドから表示名を取得するヘルパー */
export function hostName(host: Experience["host"]): string {
  return typeof host === "string" ? host : host.name;
}

/** host フィールドから bio を取得するヘルパー（文字列ホストは undefined） */
export function hostBio(host: Experience["host"]): string | undefined {
  return typeof host === "string" ? undefined : host.bio;
}

export type ApplicationStatus = "未確認" | "確認済み" | "承認" | "キャンセル";

export type Application = {
  id: string;
  experienceId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: ApplicationStatus;
};

const experiencesPath = path.join(process.cwd(), "data", "experiences.json");
const applicationsPath = path.join(
  process.cwd(),
  "data",
  "applications.json"
);

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
