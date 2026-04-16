import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !isValidAuth(authHeader)) {
    return new NextResponse(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="itoito Admin", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

function isValidAuth(authHeader: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "itoito2026";

  try {
    const base64 = authHeader.replace(/^Basic\s+/i, "");
    const decoded = atob(base64);
    const colonIdx = decoded.indexOf(":");
    if (colonIdx === -1) return false;
    const user = decoded.slice(0, colonIdx);
    const pass = decoded.slice(colonIdx + 1);
    return user === expectedUser && pass === expectedPass;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
