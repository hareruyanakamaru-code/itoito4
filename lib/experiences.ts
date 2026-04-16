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
  target?: string;
  host: string | { name: string; bio: string };
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

export type Application = {
  id: string;
  experienceId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
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
  const raw = fs.readFileSync(applicationsPath, "utf-8");
  return JSON.parse(raw) as Application[];
}

export function addApplication(
  app: Omit<Application, "id" | "createdAt">
): Application {
  const all = getAllApplications();
  const newApp: Application = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    ...app,
  };
  all.push(newApp);
  fs.writeFileSync(applicationsPath, JSON.stringify(all, null, 2), "utf-8");
  return newApp;
}
