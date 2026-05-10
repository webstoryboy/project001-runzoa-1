"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ViewType } from "./marathon-main";
import { CalendarDays, ClipboardList, Grid, Search, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarathonSearchBarProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MarathonSearchBar({
  view,
  onViewChange,
  searchQuery,
  onSearchChange,
}: MarathonSearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    onSearchChange(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
  };

  return (
    <div className="marathon__search__bar">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* 검색 입력 */}
        <form
          role="search"
          aria-label="대회 검색"
          className="relative flex w-full flex-col gap-2 sm:w-80 sm:flex-row sm:gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-center gap-2">
            <div className="relative w-full">
              <Input
                aria-label="대회 검색"
                placeholder="대회명 검색"
                className="h-10 w-full pr-8"
                maxLength={100}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputValue && (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={handleClear}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              variant="ghost"
              className="h-10 w-10 shrink-0"
              aria-label="검색"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>

        {/* 보기 방식 선택 */}
        <div
          role="group"
          aria-label="보기 방식"
          className="mt-2 flex w-full justify-center gap-1 sm:mt-0 sm:w-auto sm:justify-start"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={view === "card" ? "destructive" : "outline"}
                className="h-10 w-10 rounded-full"
                aria-label="카드형 보기"
                aria-pressed={view === "card"}
                onClick={() => onViewChange("card")}
              >
                <Grid className="h-4 w-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>카드형</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={view === "table" ? "destructive" : "outline"}
                className="h-10 w-10 rounded-full"
                aria-label="테이블형 보기"
                aria-pressed={view === "table"}
                onClick={() => onViewChange("table")}
              >
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>테이블형</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={view === "calendar" ? "destructive" : "outline"}
                className="h-10 w-10 rounded-full"
                aria-label="달력형 보기"
                aria-pressed={view === "calendar"}
                onClick={() => onViewChange("calendar")}
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>달력형</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
