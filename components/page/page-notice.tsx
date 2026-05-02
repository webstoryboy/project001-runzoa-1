"use client";

import Image from "next/image";
import { useState } from "react";
import { notices } from "@/lib/data";
import { Badge } from "../ui/badge";
import { CalendarDays, ChevronRight, ChevronDown } from "lucide-react";

export default function PageNotice() {
  const [selected, setSelected] = useState(notices[0]);

  return (
    <div className="rounded-lg border border-dashed border-gray-200 p-4 sm:p-6">
      {/* 모바일: 아코디언 */}
      <div className="lg:hidden space-y-2">
        {notices.map((notice) => (
          <details
            key={notice.id}
            className="group rounded-lg border border-gray-200 overflow-hidden open:border-brand/40"
          >
            <summary className="list-none [&::-webkit-details-marker]:hidden [&::marker]:hidden cursor-pointer px-4 py-4 flex items-center gap-3 hover:bg-gray-50 open:bg-brand/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
              <Badge
                variant={notice.category === "중요" ? "destructive" : "default"}
                className="text-xs shrink-0"
              >
                {notice.category}
              </Badge>
              <span className="font-anyvid text-sm text-gray-700 flex-1 line-clamp-1 group-open:text-brand transition-colors">
                {notice.title}
              </span>
              <ChevronRight
                aria-hidden="true"
                className="w-4 h-4 text-gray-400 shrink-0 group-open:hidden"
              />
              <ChevronDown
                aria-hidden="true"
                className="w-4 h-4 text-brand shrink-0 hidden group-open:block"
              />
            </summary>
            <div className="px-4 pb-4 pt-3 border-t border-gray-100 bg-white">
              <p className="font-anyvid text-sm text-muted-foreground leading-relaxed break-keep mb-3">
                {notice.content}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground font-anyvid">
                <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                <time dateTime={notice.date}>{notice.date}</time>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* 데스크톱: 2컬럼 (목록 + 상세) */}
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {/* 왼쪽 - 공지 목록 */}
        <nav aria-label="공지사항 목록" className="space-y-2">
          {notices.map((notice) => {
            const isSelected = selected.id === notice.id;
            return (
              <button
                key={notice.id}
                type="button"
                onClick={() => setSelected(notice)}
                aria-current={isSelected ? "true" : undefined}
                className={`w-full cursor-pointer text-left font-anyvid rounded-lg border px-4 py-5 flex items-center gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isSelected
                    ? "border-brand/40 bg-brand/5"
                    : "border-gray-200 hover:border-brand/30 hover:bg-gray-50"
                }`}
              >
                <Badge
                  variant={
                    notice.category === "중요" ? "destructive" : "default"
                  }
                  className="text-xs shrink-0"
                >
                  {notice.category}
                </Badge>
                <span
                  className={`text-sm flex-1 line-clamp-1 transition-colors ${
                    isSelected ? "text-brand" : "text-gray-700"
                  }`}
                >
                  {notice.title}
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isSelected ? "text-brand" : "text-gray-400"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* 오른쪽 - 선택된 공지 내용 */}
        <article
          aria-live="polite"
          aria-label="공지 상세 내용"
          className="border border-gray-200 rounded-lg p-6 flex items-center justify-center min-h-[320px]"
        >
          <div className="flex flex-col items-center w-full text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 mb-4 overflow-hidden shrink-0">
              <Image
                src="/face/face01.webp"
                alt="런조아 관리자 프로필"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <Badge
              variant={selected.category === "중요" ? "destructive" : "default"}
              className="text-xs font-anyvid mb-3"
            >
              {selected.category}
            </Badge>
            <h3
              title={selected.title}
              className="text-gray-800 font-nanumNeo text-xl mb-3 line-clamp-2"
            >
              {selected.title}
            </h3>
            <p className="text-sm text-muted-foreground font-anyvid leading-relaxed mb-4 break-keep">
              {selected.content}
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-anyvid">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              <time dateTime={selected.date}>{selected.date}</time>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
