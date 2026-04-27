"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";

/* ─── 型 ─── */
type QuickFilter = "this-weekend" | "next-weekend" | "this-month" | "next-month";

/* ─── 定数 ─── */
const DAY_NAMES  = ["日", "月", "火", "水", "木", "金", "土"];
const MONTH_NAMES = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

/* ─── ユーティリティ ─── */
function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

/** 体験が開催する全日付文字列を返す（期間体験はその間を展開） */
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

/** 指定年月のカレンダーセル配列（null = 空白） */
function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const lastDate = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= lastDate; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function getWeekendDates(weekOffset: 0 | 1): string[] {
  const today = new Date();
  const daysToSat = ((6 - today.getDay() + 7) % 7) + weekOffset * 7;
  const sat = new Date(today); sat.setDate(today.getDate() + daysToSat);
  const sun = new Date(sat);   sun.setDate(sat.getDate() + 1);
  return [toDateStr(sat), toDateStr(sun)];
}

function getMonthDates(monthOffset: 0 | 1): string[] {
  const today   = new Date();
  const rawMo   = today.getMonth() + monthOffset;
  const year    = rawMo > 11 ? today.getFullYear() + 1 : today.getFullYear();
  const month   = rawMo % 12;
  const daysCnt = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysCnt }, (_, i) =>
    `${year}-${String(month + 1).padStart(2,"0")}-${String(i + 1).padStart(2,"0")}`
  );
}

/* ─── Props ─── */
interface Props {
  experiences: Experience[];
  compact?: boolean;
  initialDate?: string;         // YYYY-MM-DD
  initialFilter?: QuickFilter | null;
}

/* ─── コンポーネント ─── */
export default function DateCalendar({
  experiences,
  compact = false,
  initialDate,
  initialFilter,
}: Props) {
  const today    = new Date();
  const todayStr = toDateStr(today);

  const [viewYear,  setViewYear ] = useState(() =>
    initialDate ? parseInt(initialDate.split("-")[0]) : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(() =>
    initialDate ? parseInt(initialDate.split("-")[1]) - 1 : today.getMonth()
  );
  const [selected,     setSelected    ] = useState<string | null>(initialDate ?? null);
  const [quickFilter,  setQuickFilter ] = useState<QuickFilter | null>(initialFilter ?? null);

  /* ── 開催日セット ── */
  const eventSet = useMemo(() => {
    const s = new Set<string>();
    for (const exp of experiences) getExpDateStrings(exp).forEach(d => s.add(d));
    return s;
  }, [experiences]);

  /* ── カレンダーセル ── */
  const calCells = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);

  /* ── クイックフィルター対象日セット ── */
  const highlightSet = useMemo(() => {
    if (!quickFilter) return new Set<string>();
    const dates =
      quickFilter === "this-weekend" ? getWeekendDates(0) :
      quickFilter === "next-weekend" ? getWeekendDates(1) :
      quickFilter === "this-month"   ? getMonthDates(0)   :
                                       getMonthDates(1);
    return new Set(dates);
  }, [quickFilter]);

  /* ── 絞り込み後の体験 ── */
  const filtered = useMemo(() => {
    const filterSet = quickFilter
      ? highlightSet
      : selected
      ? new Set([selected])
      : null;
    if (!filterSet) return [];
    return experiences.filter(exp =>
      getExpDateStrings(exp).some(d => filterSet.has(d))
    );
  }, [selected, quickFilter, highlightSet, experiences]);

  /* ── 月ナビ ── */
  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  /* ── ハンドラ ── */
  function handleDay(dateStr: string) {
    setSelected(prev => prev === dateStr ? null : dateStr);
    setQuickFilter(null);
  }
  function handleQuick(filter: QuickFilter) {
    if (quickFilter === filter) { setQuickFilter(null); return; }
    setQuickFilter(filter);
    setSelected(null);
    if (filter === "next-month") {
      const nm = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      setViewYear(nm.getFullYear()); setViewMonth(nm.getMonth());
    } else {
      setViewYear(today.getFullYear()); setViewMonth(today.getMonth());
    }
  }

  /* ── ラベル ── */
  const quickBtns: { key: QuickFilter; label: string }[] = [
    { key: "this-weekend", label: "今週末" },
    { key: "next-weekend", label: "来週末" },
    { key: "this-month",   label: "今月"   },
    { key: "next-month",   label: "来月"   },
  ];
  const resultLabel =
    selected
      ? `${parseInt(selected.split("-")[1])}月${parseInt(selected.split("-")[2])}日の学び体験`
      : quickFilter
      ? `${quickBtns.find(b => b.key === quickFilter)?.label}の学び体験`
      : null;

  const calLink =
    selected     ? `/experiences/calendar?date=${selected}` :
    quickFilter  ? `/experiences/calendar?filter=${quickFilter}` :
                   "/experiences/calendar";

  /* ─────────── UI ─────────── */
  return (
    <div>
      {/* ── クイック絞り込みボタン ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {quickBtns.map(btn => (
          <button
            key={btn.key}
            onClick={() => handleQuick(btn.key)}
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

      {/* ── カレンダー本体 ── */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-6 overflow-x-auto">
        {/* 月ナビ */}
        <div className="flex items-center justify-between mb-4 min-w-[280px]">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-full hover:bg-amber-50 flex items-center justify-center text-stone-500 hover:text-amber-600 transition-colors text-2xl leading-none"
            aria-label="前の月"
          >‹</button>
          <p className="text-sm font-bold text-stone-800">
            {viewYear}年 {MONTH_NAMES[viewMonth]}
          </p>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full hover:bg-amber-50 flex items-center justify-center text-stone-500 hover:text-amber-600 transition-colors text-2xl leading-none"
            aria-label="次の月"
          >›</button>
        </div>

        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 min-w-[280px]">
          {DAY_NAMES.map((name, i) => (
            <div
              key={name}
              className={`text-center text-xs font-semibold py-1.5 ${
                i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-stone-400"
              }`}
            >
              {name}
            </div>
          ))}
        </div>

        {/* 日グリッド */}
        <div className="grid grid-cols-7 gap-y-1 min-w-[280px]">
          {calCells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} />;

            const dateStr    = toDateStr(day);
            const isSelected = selected === dateStr;
            const isHighlit  = highlightSet.has(dateStr);
            const isToday    = dateStr === todayStr;
            const hasEvent   = eventSet.has(dateStr);
            const isSun      = day.getDay() === 0;
            const isSat      = day.getDay() === 6;

            let textColor = "text-stone-700";
            if (!isSelected && !isHighlit) {
              if (isToday)     textColor = "text-amber-500 font-bold";
              else if (isSun)  textColor = "text-red-400";
              else if (isSat)  textColor = "text-blue-400";
            }

            return (
              <button
                key={dateStr}
                onClick={() => handleDay(dateStr)}
                aria-label={`${viewYear}年${viewMonth + 1}月${day.getDate()}日`}
                className={`relative flex flex-col items-center justify-center h-10 rounded-full text-sm transition-all ${
                  isSelected
                    ? "bg-amber-500 text-white font-bold"
                    : isHighlit
                    ? "bg-amber-100 text-amber-700 font-semibold"
                    : `${textColor} hover:bg-amber-50`
                }`}
              >
                <span className="leading-none">{day.getDate()}</span>
                {/* 開催日ドット */}
                {hasEvent && (
                  <span
                    className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      isSelected ? "bg-white/70" : "bg-amber-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 凡例 */}
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-stone-100">
          <span className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            体験開催日
          </span>
          <span className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className="w-5 h-5 rounded-full bg-amber-500 shrink-0" />
            選択中
          </span>
        </div>
      </div>

      {/* ── 検索結果 ── */}
      {(selected !== null || quickFilter !== null) && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-stone-700">
              {resultLabel}
              <span className="ml-2 text-amber-500 font-normal">{filtered.length}件</span>
            </p>
            {compact && (
              <Link
                href={calLink}
                className="text-xs text-amber-600 hover:text-amber-700 hover:underline"
              >
                カレンダーページで見る →
              </Link>
            )}
          </div>

          {filtered.length === 0 ? (
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
              {filtered.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
