"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyApply({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-stone-100 shadow-lg px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-stone-700 line-clamp-1 flex-1 hidden sm:block">
          {title}
        </p>
        <Link
          href={`/experiences/${id}/apply`}
          className="w-full sm:w-auto text-center shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold px-7 py-2.5 rounded-full transition-colors shadow-sm text-sm"
        >
          この体験に申し込む
        </Link>
      </div>
    </div>
  );
}
