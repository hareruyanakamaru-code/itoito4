import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE_URL = "https://itoito4.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "itoito（イトイト）— 子どもの「やってみたい」をかなえる体験マッチング",
    template: "%s | itoito",
  },
  description:
    "料理・竹細工・農業・絵本づくり——学校では出会えない大人と、教科書には載っていない体験。子どもの「なんで？」「やりたい！」に本気で向き合う体験マッチングプラットフォーム。",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "itoito（イトイト）",
    title: "itoito（イトイト）— 子どもの「やってみたい」をかなえる体験マッチング",
    description:
      "料理・竹細工・農業・絵本づくり——学校では出会えない大人と、教科書には載っていない体験。子どもの「なんで？」「やりたい！」に本気で向き合う体験マッチングプラットフォーム。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "itoito — 子どもの体験マッチングプラットフォーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "itoito（イトイト）— 子どもの「やってみたい」をかなえる体験マッチング",
    description:
      "料理・竹細工・農業・絵本づくり——学校では出会えない大人と教科書には載っていない体験。",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-[#fdfaf6]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
