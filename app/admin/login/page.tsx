import { loginAdmin } from "@/lib/actions";

export const metadata = { title: "管理画面ログイン | itoito" };

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <span className="text-4xl">🌱</span>
          <h1 className="text-xl font-bold text-stone-800 mt-2">itoito 管理画面</h1>
          <p className="text-sm text-stone-500 mt-1">ログインしてください</p>
        </div>

        {/* エラーメッセージ */}
        <LoginError searchParams={searchParams} />

        {/* ログインフォーム */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <form action={loginAdmin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm font-medium text-stone-700">
                ユーザー名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-stone-700">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

async function LoginError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-600 text-center">
      ユーザー名またはパスワードが正しくありません
    </div>
  );
}
