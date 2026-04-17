import {
  getAllApplications,
  getAllExperiences,
  getAllHostApplications,
  type ApplicationStatus,
  type HostApplicationStatus,
} from "@/lib/experiences";
import {
  kvGetApplications,
  kvGetHostApplications,
} from "@/lib/kv-store";
import {
  changeApplicationStatus,
  changeHostApplicationStatus,
  logoutAdmin,
  changeAdminPassword,
} from "@/lib/actions";
import Link from "next/link";

const statusConfig: Record<
  ApplicationStatus,
  { label: string; bg: string; text: string }
> = {
  未確認: { label: "未確認", bg: "bg-stone-100", text: "text-stone-600" },
  確認済み: { label: "確認済み", bg: "bg-blue-100", text: "text-blue-700" },
  承認: { label: "承認", bg: "bg-emerald-100", text: "text-emerald-700" },
  キャンセル: { label: "キャンセル", bg: "bg-red-100", text: "text-red-600" },
};

const nextStatuses: Record<ApplicationStatus, ApplicationStatus[]> = {
  未確認: ["確認済み", "承認", "キャンセル"],
  確認済み: ["承認", "キャンセル", "未確認"],
  承認: ["キャンセル", "確認済み"],
  キャンセル: ["未確認"],
};

const hostAppStatusConfig: Record<HostApplicationStatus, { label: string; bg: string; text: string }> = {
  審査中:     { label: "審査中",     bg: "bg-amber-100",   text: "text-amber-700"   },
  面談調整中:  { label: "面談調整中", bg: "bg-blue-100",    text: "text-blue-700"    },
  承認:       { label: "承認",       bg: "bg-emerald-100", text: "text-emerald-700" },
  非承認:     { label: "非承認",     bg: "bg-red-100",     text: "text-red-600"     },
};

const hostAppNextStatuses: Record<HostApplicationStatus, HostApplicationStatus[]> = {
  審査中:    ["面談調整中", "承認", "非承認"],
  面談調整中: ["承認", "非承認", "審査中"],
  承認:      ["非承認"],
  非承認:    ["審査中"],
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ passwordChanged?: string; passwordError?: string; tab?: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab ?? "applications";

  // KVから最新データを取得（ファイルシステムにフォールバック）
  const [kvApps, kvHostApps] = await Promise.all([
    kvGetApplications(),
    kvGetHostApplications(),
  ]);
  const fileApps = getAllApplications();
  const fileHostApps = getAllHostApplications();

  // KVにデータがあればKVを優先、なければファイルシステムを使用
  const rawApplications = kvApps.length > 0 ? kvApps : fileApps;
  const rawHostApplications = kvHostApps.length > 0 ? kvHostApps : fileHostApps;

  const applications = rawApplications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const experiences = getAllExperiences();
  const expMap = Object.fromEntries(experiences.map((e) => [e.id, e.title]));
  const hostApplications = rawHostApplications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const counts = {
    total: applications.length,
    未確認: applications.filter((a) => a.status === "未確認").length,
    承認: applications.filter((a) => a.status === "承認").length,
  };
  const hostCounts = {
    total: hostApplications.length,
    審査中: hostApplications.filter((a) => a.status === "審査中").length,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* ── ヘッダー ── */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">申し込み管理</h1>
          <p className="text-sm text-stone-500 mt-0.5">
            申し込みの確認・ステータス変更ができます
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors"
          >
            ← サイトに戻る
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-sm text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>

      {/* ── タブ ── */}
      <div className="flex gap-2 mb-6 border-b border-stone-100">
        <a
          href="/admin?tab=applications"
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "applications"
              ? "border-amber-500 text-amber-700"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          📋 申し込み一覧
          {counts.未確認 > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {counts.未確認}
            </span>
          )}
        </a>
        <a
          href="/admin?tab=hosts"
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "hosts"
              ? "border-amber-500 text-amber-700"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          🌿 ホスト申請
          {hostCounts.審査中 > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {hostCounts.審査中}
            </span>
          )}
        </a>
      </div>

      {/* ── 申し込みタブ ── */}
      {activeTab === "applications" && (
      <>
      {/* ── サマリーカード ── */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <SummaryCard label="申し込み総数" value={counts.total} color="amber" />
        <SummaryCard label="未確認" value={counts.未確認} color="stone" />
        <SummaryCard label="承認済み" value={counts.承認} color="emerald" />
      </div>

      {/* ── 申し込み一覧 ── */}
      {applications.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-stone-400">まだ申し込みはありません</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const sc = statusConfig[app.status] ?? statusConfig["未確認"];
            const nexts = nextStatuses[app.status] ?? [];
            const dateStr = new Date(app.createdAt).toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5 flex flex-col gap-4"
              >
                {/* 上段：日時・体験名・ステータス */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-xs text-stone-400">{dateStr}</p>
                    <p className="font-bold text-stone-800 leading-snug text-sm sm:text-base">
                      {expMap[app.experienceId] ?? `体験ID: ${app.experienceId}`}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${sc.bg} ${sc.text}`}
                  >
                    {sc.label}
                  </span>
                </div>

                {/* 中段：申し込み者情報 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">申し込み者</p>
                    <p className="font-medium text-stone-800">{app.name}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">メールアドレス</p>
                    <a
                      href={`mailto:${app.email}`}
                      className="font-medium text-amber-700 hover:underline break-all"
                    >
                      {app.email}
                    </a>
                  </div>
                  {app.message && (
                    <div className="bg-stone-50 rounded-xl px-4 py-3 sm:col-span-2">
                      <p className="text-xs text-stone-400 mb-0.5">メッセージ</p>
                      <p className="text-stone-700 whitespace-pre-wrap text-sm">{app.message}</p>
                    </div>
                  )}
                </div>

                {/* 下段：ステータス変更ボタン */}
                {nexts.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap border-t border-stone-100 pt-3">
                    <span className="text-xs text-stone-400">ステータスを変更：</span>
                    {nexts.map((next) => {
                      const nc = statusConfig[next];
                      return (
                        <form action={changeApplicationStatus} key={next}>
                          <input type="hidden" name="id" value={app.id} />
                          <input type="hidden" name="status" value={next} />
                          <button
                            type="submit"
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${nc.bg} ${nc.text} hover:opacity-80`}
                          >
                            {nc.label} にする
                          </button>
                        </form>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      </>
      )}

      {/* ── ホスト申請タブ ── */}
      {activeTab === "hosts" && (
      <>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <SummaryCard label="申請総数" value={hostCounts.total} color="amber" />
        <SummaryCard label="審査中" value={hostCounts.審査中} color="stone" />
      </div>

      {hostApplications.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-stone-400">まだホスト申請はありません</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {hostApplications.map((app) => {
            const sc = hostAppStatusConfig[app.status];
            const nexts = hostAppNextStatuses[app.status] ?? [];
            const dateStr = new Date(app.createdAt).toLocaleString("ja-JP", {
              year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
            });
            return (
              <div key={app.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-xs text-stone-400">{dateStr}</p>
                    <p className="font-bold text-stone-800 text-sm sm:text-base mt-0.5">{app.name}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">メールアドレス</p>
                    <a href={`mailto:${app.email}`} className="font-medium text-amber-700 hover:underline break-all">{app.email}</a>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">電話番号</p>
                    <p className="font-medium text-stone-800">{app.phone}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-4 py-3 sm:col-span-2">
                    <p className="text-xs text-stone-400 mb-0.5">体験の概要</p>
                    <p className="text-stone-700 whitespace-pre-wrap text-sm">{app.experienceOverview}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">対象年齢</p>
                    <p className="font-medium text-stone-800">{app.targetAge}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-stone-400 mb-0.5">子どもとの関わり経験</p>
                    <p className="text-stone-700 text-sm">{app.childExperience}</p>
                  </div>
                  {app.achievements && (
                    <div className="bg-stone-50 rounded-xl px-4 py-3 sm:col-span-2">
                      <p className="text-xs text-stone-400 mb-0.5">活動実績・SNS</p>
                      <p className="text-stone-700 text-sm">{app.achievements}</p>
                    </div>
                  )}
                  <div className="bg-stone-50 rounded-xl px-4 py-3 sm:col-span-2">
                    <p className="text-xs text-stone-400 mb-0.5">安全への配慮</p>
                    <p className="text-stone-700 whitespace-pre-wrap text-sm">{app.safetyConsideration}</p>
                  </div>
                </div>

                {nexts.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap border-t border-stone-100 pt-3">
                    <span className="text-xs text-stone-400">ステータスを変更：</span>
                    {nexts.map((next) => {
                      const nc = hostAppStatusConfig[next];
                      return (
                        <form action={changeHostApplicationStatus} key={next}>
                          <input type="hidden" name="id" value={app.id} />
                          <input type="hidden" name="status" value={next} />
                          <button type="submit"
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${nc.bg} ${nc.text} hover:opacity-80`}>
                            {nc.label} にする
                            {next === "承認" && " ✉️"}
                          </button>
                        </form>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </>
      )}

      {/* ── 管理者設定（パスワード変更） ── */}
      <div className="mt-10 bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-stone-800 mb-1">⚙️ 管理者設定</h2>
        <p className="text-xs text-stone-400 mb-5">ログイン情報を変更できます</p>

        {params.passwordChanged && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-emerald-700">
            ✅ パスワードを変更しました
          </div>
        )}
        {params.passwordError === "wrong" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-red-600">
            現在のパスワードが正しくありません
          </div>
        )}
        {params.passwordError === "mismatch" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-red-600">
            新しいパスワードが一致しません
          </div>
        )}

        <form
          action={changeAdminPassword}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-600">
              新しいユーザー名 <span className="text-stone-400 font-normal">（空欄で変更なし）</span>
            </label>
            <input
              name="newUsername"
              type="text"
              placeholder="admin"
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-600">
              現在のパスワード <span className="text-red-400">必須</span>
            </label>
            <input
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-600">
              新しいパスワード <span className="text-red-400">必須</span>
            </label>
            <input
              name="newPassword"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-stone-600">
              新しいパスワード（確認）
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              className="border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              変更を保存
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "amber" | "stone" | "emerald";
}) {
  const styles = {
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    stone: "bg-stone-50 border-stone-100 text-stone-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
  };
  return (
    <div className={`rounded-2xl border p-3 sm:p-4 text-center ${styles[color]}`}>
      <p className="text-2xl sm:text-3xl font-extrabold">{value}</p>
      <p className="text-xs mt-1 opacity-80">{label}</p>
    </div>
  );
}
