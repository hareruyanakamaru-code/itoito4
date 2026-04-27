"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const TABS = [
  { value: "",        label: "すべて" },
  { value: "offline", label: "📍 現地開催" },
  { value: "online",  label: "💻 オンライン" },
];

export default function FormatTabs({ currentFormat }: { currentFormat?: string }) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const active = currentFormat ?? "";

  function handleTab(format: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (format === "") {
      params.delete("format");
    } else {
      params.set("format", format);
    }
    const qs = params.toString();
    startTransition(() => {
      router.push(`/${qs ? `?${qs}` : ""}#experiences`);
    });
  }

  return (
    <div className="bg-white border-b border-stone-100 sticky top-[57px] z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTab(tab.value)}
              className={`shrink-0 text-sm font-semibold px-6 py-3.5 border-b-2 transition-all whitespace-nowrap ${
                active === tab.value
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
