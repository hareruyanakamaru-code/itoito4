import { NextRequest, NextResponse } from "next/server";

const LOGIN_PATH = "/admin/login";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("admin_session")?.value;
  const isLoggedIn = session === "authenticated";

  // ログイン済みでログインページにアクセス → 管理画面にリダイレクト
  if (isLoggedIn && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 未ログインで管理画面にアクセス → ログインページにリダイレクト
  if (!isLoggedIn && pathname !== LOGIN_PATH) {
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
