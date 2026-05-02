"use client";

import { useState } from "react";
import Link from "next/link";
import { socialMenu } from "@/lib/menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AreaType = "all" | "domestic" | "overseas";

export default function MarathonFilter() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [area, setArea] = useState<AreaType>("all");

  return (
    <div className="marathon__filter">
      {/* 버튼 */}
      <div
        role="toolbar"
        aria-label="도구 모음"
        className="flex justify-center gap-1"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isPanelOpen ? "destructive" : "outline"}
              className="h-10 w-10 rounded-full"
              aria-label="검색 필터 열기"
              aria-pressed={isPanelOpen}
              aria-expanded={isPanelOpen}
              onClick={() => setIsPanelOpen((prev) => !prev)}
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>검색 필터 {isPanelOpen ? "닫기" : "열기"}</p>
          </TooltipContent>
        </Tooltip>

        {socialMenu.map(({ href, label, path }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-10 w-10 rounded-full"
                asChild
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (새 탭에서 열림)`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d={path} fill="currentColor" />
                  </svg>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* 패널 */}
      {isPanelOpen && (
        <div className="mt-2 space-y-1.5 rounded-lg border p-4">
          {/* 국내/해외 */}
          <div
            role="group"
            aria-label="국내/해외"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
          >
            <Button
              size="sm"
              variant={area === "all" ? "destructive" : "ghost"}
              aria-pressed={area === "all"}
              onClick={() => setArea("all")}
            >
              전체
            </Button>
            <Button
              size="sm"
              variant={area === "domestic" ? "destructive" : "ghost"}
              aria-pressed={area === "domestic"}
              onClick={() => setArea("domestic")}
            >
              국내
            </Button>
            <Button
              size="sm"
              variant={area === "overseas" ? "destructive" : "ghost"}
              aria-pressed={area === "overseas"}
              onClick={() => setArea("overseas")}
            >
              해외
            </Button>
          </div>

          {/* 국내 지역 */}
          {area === "domestic" && (
            <div
              role="group"
              aria-label="국내 지역"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
            >
              {[
                "전체", "서울", "경기", "인천", "강원", "충북", "충남",
                "대전", "세종", "전북", "전남", "광주", "경북", "경남",
                "대구", "부산", "울산", "제주",
              ].map((region) => (
                <Button
                  key={region}
                  size="sm"
                  variant={region === "전체" ? "destructive" : "ghost"}
                  aria-pressed={region === "전체"}
                  className="w-full"
                >
                  {region}
                </Button>
              ))}
            </div>
          )}

          {/* 해외 지역 */}
          {area === "overseas" && (
            <div
              role="group"
              aria-label="해외 지역"
              className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
            >
              {["전체", "일본", "미국", "프랑스", "독일", "중국", "베트남", "태국", "홍콩"].map(
                (region) => (
                  <Button
                    key={region}
                    size="sm"
                    variant={region === "전체" ? "destructive" : "ghost"}
                    aria-pressed={region === "전체"}
                    className="w-full"
                  >
                    {region}
                  </Button>
                ),
              )}
            </div>
          )}

          {/* 종목 */}
          <div
            role="group"
            aria-label="종목"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
          >
            {["전체", "걷기", "마라톤", "사이클", "철인3종", "트레일러닝", "하이록스", "기타"].map(
              (item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={item === "전체" ? "destructive" : "ghost"}
                  aria-pressed={item === "전체"}
                  className="w-full"
                >
                  {item}
                </Button>
              ),
            )}
          </div>

          {/* 접수 상태 */}
          <div
            role="group"
            aria-label="접수 상태"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
          >
            {["전체", "접수 미정", "접수 전", "접수 중", "접수 마감"].map((item) => (
              <Button
                key={item}
                size="sm"
                variant={item === "전체" ? "destructive" : "ghost"}
                aria-pressed={item === "전체"}
                className="w-full"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* 코스 */}
          <div
            role="group"
            aria-label="코스"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]"
          >
            {["전체", "FULL", "HALF", "10KM", "5KM", "기타"].map((item) => (
              <Button
                key={item}
                size="sm"
                variant={item === "전체" ? "destructive" : "ghost"}
                aria-pressed={item === "전체"}
                className="w-full"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* 지난대회 */}
          <div
            role="group"
            aria-label="지난 대회 포함 여부"
            className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-[repeat(6,minmax(0,1fr))]"
          >
            <Button size="sm" variant="destructive" aria-pressed={true}>
              지난 대회 비포함
            </Button>
            <Button size="sm" variant="ghost" aria-pressed={false}>
              지난 대회 포함
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
