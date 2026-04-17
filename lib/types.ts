/** 体験データの型定義（クライアント・サーバー共用） */
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
  skillTags?: string[];
  image?: string | null;
  images?: string[];
};

export type ApplicationStatus = "未確認" | "確認済み" | "承認" | "キャンセル";

export type Application = {
  id: string;
  experienceId: string;
  name: string;
  email: string;
  childAge: string;
  adults: number;
  children: number;
  message: string;
  createdAt: string;
  status: ApplicationStatus;
};

export type AdminConfig = { username: string; password: string };

/** host フィールドから表示名を取得するヘルパー */
export function hostName(host: Experience["host"]): string {
  return typeof host === "string" ? host : host.name;
}

/** host フィールドから bio を取得するヘルパー（文字列ホストは undefined） */
export function hostBio(host: Experience["host"]): string | undefined {
  return typeof host === "string" ? undefined : host.bio;
}
