"use client";

import { Button } from "@/components/ui/button";

const months = [
  "전체",
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface MarathonMonthBarProps {
  month: string;
  onMonthChange: (month: string) => void;
}

export default function MarathonMonthBar({
  month,
  onMonthChange,
}: MarathonMonthBarProps) {
  return (
    <div
      role="group"
      aria-label="월별 필터"
      className="marathon__month__bar mt-2 grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(13,minmax(0,1fr))] mb-3"
    >
      {months.map((m) => (
        <Button
          key={m}
          variant={month === m ? "destructive" : "ghost"}
          aria-pressed={month === m}
          className="w-full"
          onClick={() => onMonthChange(m)}
        >
          {m}
        </Button>
      ))}
    </div>
  );
}
