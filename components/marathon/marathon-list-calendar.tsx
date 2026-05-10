"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Marathon } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DateMode = "event" | "registration";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];
const KST_OFFSET = 9 * 60 * 60 * 1000;
const GRID_COLS = "repeat(7, minmax(0, 1fr))";

const STATUS_DOT: Record<string, string> = {
  접수미정: "bg-gray-400",
  접수중: "bg-red-500",
  접수대기: "bg-blue-500",
  접수마감: "bg-gray-800",
  추가접수: "bg-green-500",
};

const LEGEND = [
  { label: "접수미정", color: "bg-gray-400" },
  { label: "접수중", color: "bg-red-500" },
  { label: "접수대기", color: "bg-blue-500" },
  { label: "추가접수", color: "bg-green-500" },
  { label: "접수마감", color: "bg-gray-800" },
];

function parseMonth(month: string): number | null {
  if (month === "전체") return null;
  const m = parseInt(month);
  return isNaN(m) ? null : m;
}

function parseYear(year: string): number | null {
  if (year === "전체") return null;
  const y = parseInt(year);
  return isNaN(y) ? null : y;
}

function toKSTDateStr(dateStr: string): { y: number; m: number; d: number } {
  const kst = new Date(new Date(dateStr).getTime() + KST_OFFSET);
  return {
    y: kst.getUTCFullYear(),
    m: kst.getUTCMonth() + 1,
    d: kst.getUTCDate(),
  };
}

function padKey(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function MarathonListCalendar({
  marathons,
  month,
  year,
}: {
  marathons: Marathon[];
  month: string;
  year: string;
}) {
  const [dateMode, setDateMode] = useState<DateMode>("event");

  const todayKST = new Date(Date.now() + KST_OFFSET);
  const displayYear = parseYear(year) ?? todayKST.getUTCFullYear();
  const displayMonth = parseMonth(month) ?? todayKST.getUTCMonth() + 1;
  const todayStr = padKey(
    todayKST.getUTCFullYear(),
    todayKST.getUTCMonth() + 1,
    todayKST.getUTCDate(),
  );

  // 달력 셀 생성
  const cells = useMemo<(number | null)[]>(() => {
    const firstDow = (new Date(displayYear, displayMonth - 1, 1).getDay() + 6) % 7;
    const totalDays = new Date(displayYear, displayMonth, 0).getDate();
    const arr: (number | null)[] = [
      ...Array(firstDow).fill(null),
      ...Array.from({ length: totalDays }, (_, i) => i + 1),
    ];
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [displayYear, displayMonth]);

  // 날짜별 마라톤 그룹핑
  const marathonsByDate = useMemo(() => {
    const map = new Map<string, Marathon[]>();
    for (const m of marathons) {
      const dateAt =
        dateMode === "registration" ? m.registration_start_at : m.event_start_at;
      if (!dateAt) continue;
      const { y, m: mo, d } = toKSTDateStr(dateAt);
      if (y !== displayYear || mo !== displayMonth) continue;
      const key = padKey(y, mo, d);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    }
    return map;
  }, [marathons, dateMode, displayYear, displayMonth]);

  return (
    <div className="marathon__list__calendar">
      <CalendarLegend dateMode={dateMode} onDateModeChange={setDateMode} />
      <CalendarGrid
        cells={cells}
        displayYear={displayYear}
        displayMonth={displayMonth}
        marathonsByDate={marathonsByDate}
        todayStr={todayStr}
      />
    </div>
  );
}

function CalendarLegend({
  dateMode,
  onDateModeChange,
}: {
  dateMode: DateMode;
  onDateModeChange: (mode: DateMode) => void;
}) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-3">
        {LEGEND.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1">
            <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
            <span className="font-anyvid text-xs text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center overflow-hidden rounded-md border border-gray-200 font-anyvid text-xs">
        <button
          className={`px-3 py-1.5 transition-colors ${
            dateMode === "event"
              ? "bg-brand text-white"
              : "text-muted-foreground hover:bg-gray-50"
          }`}
          onClick={() => onDateModeChange("event")}
        >
          대회날짜
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <button
          className={`px-3 py-1.5 transition-colors ${
            dateMode === "registration"
              ? "bg-brand text-white"
              : "text-muted-foreground hover:bg-gray-50"
          }`}
          onClick={() => onDateModeChange("registration")}
        >
          접수날짜
        </button>
      </div>
    </div>
  );
}

function CalendarGrid({
  cells,
  displayYear,
  displayMonth,
  marathonsByDate,
  todayStr,
}: {
  cells: (number | null)[];
  displayYear: number;
  displayMonth: number;
  marathonsByDate: Map<string, Marathon[]>;
  todayStr: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <div className="min-w-[640px]">
        {/* 요일 헤더 */}
        <div
          className="grid border-b border-gray-200 bg-gray-50"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          {DAY_LABELS.map((day, i) => (
            <div
              key={day}
              className={`py-2 text-center font-anyvid text-xs font-semibold ${
                i === 5
                  ? "text-blue-500"
                  : i === 6
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div className="grid" style={{ gridTemplateColumns: GRID_COLS }}>
          {cells.map((day, idx) => {
            const dateStr = day
              ? padKey(displayYear, displayMonth, day)
              : null;
            const events = dateStr ? (marathonsByDate.get(dateStr) ?? []) : [];
            const isToday = dateStr === todayStr;
            const weekday = idx % 7;
            const isLastRow = idx >= cells.length - 7;

            return (
              <div
                key={idx}
                className={`min-h-[80px] border-gray-100 p-1 md:min-h-[100px] ${
                  !isLastRow ? "border-b" : ""
                } ${weekday !== 6 ? "border-r" : ""} ${!day ? "bg-gray-50/50" : ""}`}
              >
                {day && (
                  <>
                    <div className="mb-1 flex items-center justify-center">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full font-anyvid text-xs leading-none ${
                          isToday
                            ? "bg-brand font-semibold text-white"
                            : weekday === 5
                              ? "text-blue-500"
                              : weekday === 6
                                ? "text-red-500"
                                : "text-foreground"
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {events.map((marathon) => {
                        const dotColor =
                          STATUS_DOT[marathon.registration_status] ??
                          "bg-gray-400";
                        return (
                          <Tooltip key={marathon.id}>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/marathon/${marathon.slug}`}
                                className="block"
                              >
                                <div className="group flex items-center gap-1 rounded px-1 py-0.5 transition-colors hover:bg-red-50">
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
                                  />
                                  <p className="truncate font-anyvid text-xs leading-tight text-muted-foreground group-hover:text-brand">
                                    {marathon.name}
                                  </p>
                                </div>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-[240px] font-anyvid"
                            >
                              <p className="text-xs">
                                <span className="mr-1 font-semibold">
                                  ({marathon.registration_status})
                                </span>
                                {marathon.name}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
