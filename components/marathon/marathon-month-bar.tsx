"use client";

import { useState } from "react";
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

export default function MarathonMonthBar() {
  const [selected, setSelected] = useState("전체");

  return (
    <div
      role="group"
      aria-label="월별 필터"
      className="marathon__month__bar mt-2 grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(13,minmax(0,1fr))] mb-3"
    >
      {months.map((month) => (
        <Button
          key={month}
          variant={selected === month ? "destructive" : "ghost"}
          aria-pressed={selected === month}
          className="w-full"
          onClick={() => setSelected(month)}
        >
          {month}
        </Button>
      ))}
    </div>
  );
}
