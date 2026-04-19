/** 当日の流れの1ステップ */
export type FlowStep = {
  time: string;   // 例: "10:00" "開始30分" など
  label: string;  // 例: "集合・自己紹介"
  note?: string;  // 例: "服装チェックあり"
};

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
  flow?: FlowStep[];      // 当日の流れ（タイムライン）
  parentNote?: string;
  tags?: string[];
  skillTags?: string[];
  image?: string | null;
  images?: string[];
};

export type ApplicationStatus = "未確認" | "確認済み" | "承認" | "キャンセル";

/* ─── レビュー ─── */
export type GuestReview = {
  id: string;
  experienceId: string;
  type: "guest";
  createdAt: string;
  overallRating: number;   // 1-5
  hostRating: number;      // 1-5
  contentRating: number;   // 1-5
  goodPoints: string;
  improvements: string;
  photoUrl?: string;
  allowSnsShare: boolean;
  displayName: string;     // "Aさん" など匿名表示名
};

export type HostReview = {
  id: string;
  experienceId: string;
  type: "host";
  createdAt: string;
  guestImpression: number; // 1-5
  satisfaction: number;    // 1-5
  nextEventPlan: "yes" | "maybe" | "no";
  comment: string;
};

export type Review = GuestReview | HostReview;

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

export type HostApplicationStatus = "審査中" | "面談調整中" | "承認" | "非承認";

export type HostApplication = {
  id: string;
  createdAt: string;
  status: HostApplicationStatus;
  name: string;
  email: string;
  phone: string;
  experienceOverview: string;
  targetAge: string;
  childExperience: string;
  achievements: string;
  safetyConsideration: string;
};

/** host フィールドから表示名を取得するヘルパー */
export function hostName(host: Experience["host"]): string {
  return typeof host === "string" ? host : host.name;
}

/** host フィールドから bio を取得するヘルパー（文字列ホストは undefined） */
export function hostBio(host: Experience["host"]): string | undefined {
  return typeof host === "string" ? undefined : host.bio;
}
