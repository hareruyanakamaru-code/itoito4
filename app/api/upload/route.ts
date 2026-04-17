import { NextRequest, NextResponse } from "next/server";

// ImgBBへのアップロードをサーバー側で処理
// APIキーはサーバー環境変数（IMGBB_API_KEY）に保管し、クライアントに露出しない
export async function POST(req: NextRequest) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Upload not configured" }, { status: 503 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ファイルサイズ制限（5MB）
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    // ImgBBにアップロード
    const imgbbForm = new FormData();
    imgbbForm.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbForm,
    });

    const data = await res.json();
    if (!data.success) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: data.data.url });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
