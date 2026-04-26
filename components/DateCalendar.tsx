"use client";

import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { ja } from "date-fns/locale";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";

/* ── 型 ── */
type QuickFilter = "this-weekend" | "next-weekend" | "this-month" | "next-month";

/* ── ユーティリティ ── */
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getExpDateStrings(exp: Experience): string[] {
  if (!exp.dateTo) return [exp.date];
  const result: string[] = [];
  const start = new Date(exp.date + "T00:00:00");
  const end   = new Date(exp.dateTo + "T00:00:00");
  const cur   = new Date(start);
  while (cur <= end) {
    result.push(toDateStr(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return result;
}

function getWeekendDates(weekOffset: 0 | 1): string[] {
  const today = new Date();
  const day = today.getDay(); // 0=Sun,6=Sat
  const daysToSat = ((6 - day + 7) % 7) + weekOffset * 7;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysToSat);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return [toDateStr(sat), toDateStr(sun)];
}

function getMonthDates(monthOffset: 0 | 1): string[] {
  const today = new Date();
  const rawMonth = today.getMonth() + monthOffset;
  const year  = rawMonth > 11 ? today.getFullYear() + 1 : today.getFullYear();
  const month = rawMonth % 12;
  const days  = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
  );
}

/* ── Props ── */
interface Props {
  experiences: Experience[];
  compact?: boolean;
  initialDate?: string;
  initialFilter?: QuickFilter | null;
}

/* ── コンポーネント ── */
export default function DateCalendar({
  experiences,
  compact = false,
  initialDate,
  initialFilter,
}: Props) {
  const today = new Date();

  const [month, setMonth] = useState<Date>(() => {
    if (initialDate) {
      const [y, m] = initialDate.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    if (initialDate) {
      const [y, m, d] = initialDate.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return undefined;
  });

  const [quickFilter, setQuickFilter] = useState<QuickFilter | null>(initialFilter ?? null);

  /* ── 開催日セット ── */
  const eventDateSet = useMemo(() => {
    const set = new Set<string>();
    for (const exp of experiences) getExpDateStrings(exp).forEach(d => set.add(d));
    return set;
  }, [experiences]);

  const eventDays = useMemo(() =>
    [...eventDateSet].map(d => {
      const [y, m, day] = d.split("-").map(Number);
      return new Date(y, m - 1, day);
    }),
  [eventDateSet]);

  /* ── フィルター後の体験 ── */
  const filteredExperiences = useMemo(() => {
    let filterSet: Set<string> | null = null;

    if (quickFilter) {
      const dates =
        quickFilter === "this-weekend"  ? getWeekendDates(0) :
        quickFilter === "next-weekend"  ? getWeekendDates(1) :
        quickFilter === "this-month"    ? getMonthDates(0)   :
                                          getMonthDates(1);
      filterSet = new Set(dates);
    } else if (selectedDate) {
      filterSet = new Set([toDateStr(selectedDate)]);
    }

    if (!filterSet) return [];
    return experiences.filter(exp => getExpDateStrings(exp).some(d => filterSet!.has(d)));
  }, [selectedDate, quickFilter, experiences]);

  /* ── ハンドラ ── */
  function handleDaySelect(day: Date | undefined) {
    setSelectedDate(day);
    setQuickFilter(null);
  }

  function handleQuickFilter(filter: QuickFilter) {
    if (quickFilter === filter) { setQuickFilter(null); return; }
    setQuickFilter(filter);
    setSelectedDate(undefined);
    setMonth(
      filter === "next-month"
        ? new Date(today.getFullYear(), today.getMonth() + 1, 1)
        : new Date(today.getFullYear(), today.getMonth(), 1)
    );
  }

  /* ── ラベル ── */
  const quickButtons: { key: QuickFilter; label: string }[] = [
    { key: "this-weekend", label: "今週末" },
    { key: "next-weekend", label: "来週末" },
    { key: "this-month",   label: "今月"   },
    { key: "next-month",   label: "来月"   },
  ];
  const selectedLabel =
    selectedDate
      ? `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日の学び体験`
      : quickFilter
      ? `${quickButtons.find(b => b.key === quickFilter)?.label}の学び体験`
      : null;

  const calendarLink =
    selectedDate  ? `/experiences/calendar?date=${toDateStr(selectedDate)}` :
    quickFilter   ? `/experiences/calendar?filter=${quickFilter}` :
                    "/experiences/calendar";

  /* ── UI ── */
  return (
    <div>
      {/* クイック絞り込みボタン */}
      <div className="flex flex-wrap gap-2 mb-5">
        {quickButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => handleQuickFilter(btn.key)}
            className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-all ${
              quickFilter === btn.key
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* カレンダー本体 */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-x-auto p-4 sm:p-6">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDaySelect}
          month={month}
          onMonthChange={setMonth}
          locale={ja}
          modifiers={{ hasEvent: eventDays }}
          components={{
            /* 開催日ドット */
            DayContent: ({ date, activeModifiers }: { date: Date; activeModifiers: Record<string, boolean> }) => (
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <span className={activeModifiers.hasEvent ? "font-semibold" : ""}>
                  {date.getDate()}
                </span>
                {activeModifiers.hasEvent && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
            ),
            /* ナビゲーションアイコン */
            IconLeft:  () => <span className="text-stone-500 text-xl leading-none">‹</span>,
            IconRight: () => <span className="text-stone-500 text-xl leading-none">›</span>,
          }}
          classNames={{
            months:              "flex flex-col sm:flex-row gap-6 justify-center",
            month:               "min-w-[280px]",
            caption:             "flex justify-center py-2 relative items-center mb-3",
            caption_label:       "text-sm font-bold text-stone-800",
            nav:                 "flex items-center",
            nav_button:          "absolute p-1 w-8 h-8 rounded-full hover:bg-amber-50 flex items-center justify-center transition-colors",
            nav_button_previous: "left-0",
            nav_button_next:     "right-0",
            table:               "w-full border-collapse",
            head_row:            "flex",
            head_cell:           "text-xs text-stone-400 font-medium text-center flex-1 pb-2",
            row:                 "flex w-full mt-1",
            cell:                "flex-1 p-0.5",
            day:                 "w-full h-10 flex items-center justify-center text-sm rounded-full hover:bg-amber-50 transition-colors cursor-pointer text-stone-700 mx-auto",
            day_selected:        "bg-amber-500 text-white font-bold hover:bg-amber-600",
            day_today:           "font-bold text-amber-500",
            day_outside:         "text-stone-300 opacity-40",
            day_disabled:        "text-stone-300 opacity-30 cursor-default",
          }}
        />
      </div>

      {/* 検索結果 */}
      {(selectedDate !== undefined || quickFilter) && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-stone-700">
              {selectedLabel}
              <span className="ml-2 text-amber-500 font-normal">
                {filteredExperiences.length}件
              </span>
            </p>
            <Link
              href={calendarLink}
              className="text-xs text-amber-600 hover:text-amber-700 hover:underline"
            >
              カレンダーページで見る →
            </Link>
          </div>

          {filteredExperiences.length === 0 ? (
            <div className="text-center py-10 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="text-3xl block mb-2">📅</span>
              <p className="text-stone-400 text-sm">この日程の体験はまだありません</p>
              <p className="text-xs text-stone-300 mt-1">別の日程を選んでみてください</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              compact
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {filteredExperiences.map(exp => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
