import { getAllApplications, getAllExperiences, type ApplicationStatus } from "@/lib/experiences";
import { changeApplicationStatus } from "@/lib/actions";
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

export default function AdminPage() {
  const applications = getAllApplications().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const experiences = getAllExperiences();
  const expMap = Object.fromEntries(experiences.map((e) => [e.id, e.title]));

  const counts = {
    total: applications.length,
    未確認: applications.filter((a) => a.status === "未確認").length,
    承認: applications.filter((a) => a.status === "承認").length,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">申し込み管理</h1>
          <p className="text-sm text-stone-500 mt-0.5">
            申し込みの確認・ステータス変更ができます
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-amber-700 transition-colors"
        >
          ← サイトに戻る
        </Link>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <SummaryCard label="申し込み総数" value={counts.total} color="amber" />
        <SummaryCard label="未確認" value={counts.未確認} color="stone" />
        <SummaryCard label="承認済み" value={counts.承認} color="emerald" />
      </div>

      {/* 申し込み一覧 */}
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
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-4"
              >
                {/* 上段：日時・体験名・ステータス */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-stone-400">{dateStr}</p>
                    <p className="font-bold text-stone-800 leading-snug">
                      {expMap[app.experienceId] ?? `体験ID: ${app.experienceId}`}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${sc.bg} ${sc.text}`}
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
                      <p className="text-stone-700 whitespace-pre-wrap">{app.message}</p>
                    </div>
                  )}
                </div>

                {/* 下段：ステータス変更ボタン */}
                {nexts.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap border-t border-stone-100 pt-3">
                    <span className="text-xs text-stone-400 mr-1">ステータスを変更：</span>
                    {nexts.map((next) => {
                      const nc = statusConfig[next];
                      return (
                        <form action={changeApplicationStatus} key={next}>
                          <input type="hidden" name="id" value={app.id} />
                          <input type="hidden" name="status" value={next} />
                          <button
                            type="submit"
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer
                              ${nc.bg} ${nc.text} hover:opacity-80`}
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
    <div className={`rounded-2xl border p-4 text-center ${styles[color]}`}>
      <p className="text-3xl font-extrabold">{value}</p>
      <p className="text-xs mt-1 opacity-80">{label}</p>
    </div>
  );
}
