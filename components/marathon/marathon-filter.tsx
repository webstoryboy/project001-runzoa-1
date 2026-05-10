"use client";

import Link from "next/link";
import { useState } from "react";
import { socialMenu } from "@/lib/menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  CountryFilter,
  DistanceFilter,
  EventType,
  PastMarathonFilter,
  RegFilter,
  YearFilter,
} from "./marathon-main";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 반복되는 필터 버튼 그룹 레이아웃
const FILTER_GRID_CLASS =
  "grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(11,minmax(0,1fr))]";
const TOGGLE_GRID_CLASS =
  "grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-[repeat(6,minmax(0,1fr))]";

// 상단에서 바로 수정할 수 있도록 필터 옵션을 한곳에 모음
const COUNTRY_OPTIONS: { label: string; value: CountryFilter }[] = [
  { label: "전체", value: "all" },
  { label: "국내", value: "domestic" },
  { label: "해외", value: "international" },
];
const COUNTRY_LABELS = COUNTRY_OPTIONS.map(({ label }) => label) as readonly string[];
const COUNTRY_LABEL_TO_VALUE: Record<string, CountryFilter> = {
  전체: "all",
  국내: "domestic",
  해외: "international",
};
const DOMESTIC_REGIONS = [
  "전체",
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "대전",
  "세종",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "부산",
  "울산",
  "제주",
] as const;
const OVERSEAS_REGIONS = ["전체", "일본", "미국", "중국"] as const;
const YEARS = ["전체", "2026", "2027"] as const;
const COURSES = ["전체", "FULL", "HALF", "10KM", "5KM", "기타"] as const;
const EVENT_TYPES = [
  "전체",
  "걷기",
  "마라톤",
  "사이클",
  "철인3종",
  "트레일러닝",
  "하이록스",
  "기타",
] as const;
const REGISTRATION_STATUSES = [
  "전체",
  "접수 미정",
  "접수 대기",
  "접수 중",
  "접수 마감",
  "추가접수",
] as const;
const PAST_EVENT_OPTIONS = ["지난 대회 비포함", "지난 대회 포함"] as const;
const PAST_EVENT_LABEL_TO_VALUE: Record<string, PastMarathonFilter> = {
  "지난 대회 비포함": "exclude",
  "지난 대회 포함": "include",
};

interface FilterOptionGroupProps {
  ariaLabel: string;
  options: readonly string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

interface MarathonFilterProps {
  countryFilter: CountryFilter;
  onCountryFilterChange: (filter: CountryFilter) => void;
  regionFilter: string;
  onRegionFilterChange: (region: string) => void;
  eventTypeFilter: EventType;
  onEventTypeFilterChange: (type: EventType) => void;
  regFilter: RegFilter;
  onRegFilterChange: (status: RegFilter) => void;
  distanceFilter: DistanceFilter;
  onDistanceFilterChange: (course: DistanceFilter) => void;
  pastFilter: PastMarathonFilter;
  onPastFilterChange: (filter: PastMarathonFilter) => void;
  yearFilter: YearFilter;
  onYearFilterChange: (year: YearFilter) => void;
}

function FilterOptionGroup({
  ariaLabel,
  options,
  selectedValue,
  onSelect,
  className = FILTER_GRID_CLASS,
}: FilterOptionGroupProps) {
  return (
    <div role="group" aria-label={ariaLabel} className={className}>
      {options.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={selectedValue === option ? "destructive" : "ghost"}
          aria-pressed={selectedValue === option}
          className="w-full"
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default function MarathonFilter({
  countryFilter,
  onCountryFilterChange,
  regionFilter,
  onRegionFilterChange,
  eventTypeFilter,
  onEventTypeFilterChange,
  regFilter,
  onRegFilterChange,
  distanceFilter,
  onDistanceFilterChange,
  pastFilter,
  onPastFilterChange,
  yearFilter,
  onYearFilterChange,
}: MarathonFilterProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelId = "marathon-filter-panel";
  const countryLabel =
    countryFilter === "all"
      ? "전체"
      : countryFilter === "domestic"
        ? "국내"
        : "해외";
  const pastFilterLabel =
    pastFilter === "include" ? "지난 대회 포함" : "지난 대회 비포함";

  return (
    <div className="marathon__filter">
      {/* 상단 도구 버튼 */}
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
              aria-label={`검색 필터 ${isPanelOpen ? "닫기" : "열기"}`}
              aria-pressed={isPanelOpen}
              aria-expanded={isPanelOpen}
              aria-controls={panelId}
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

      {/* 펼침형 필터 패널 */}
      {isPanelOpen && (
        <section
          id={panelId}
          aria-label="마라톤 검색 필터"
          className="mt-2 space-y-1.5 rounded-lg border p-4"
        >
          {/* 연도 */}
          <FilterOptionGroup
            ariaLabel="연도"
            options={YEARS}
            selectedValue={yearFilter}
            onSelect={(value) => onYearFilterChange(value as YearFilter)}
          />

          {/* 국내/해외 */}
          <FilterOptionGroup
            ariaLabel="국내/해외"
            options={COUNTRY_LABELS}
            selectedValue={countryLabel}
            onSelect={(value) =>
              onCountryFilterChange(COUNTRY_LABEL_TO_VALUE[value] ?? "all")
            }
          />

          {/* 지역 */}
          {countryFilter === "domestic" && (
            <FilterOptionGroup
              ariaLabel="국내 지역"
              options={DOMESTIC_REGIONS}
              selectedValue={regionFilter}
              onSelect={onRegionFilterChange}
            />
          )}

          {countryFilter === "international" && (
            <FilterOptionGroup
              ariaLabel="해외 지역"
              options={OVERSEAS_REGIONS}
              selectedValue={regionFilter}
              onSelect={onRegionFilterChange}
            />
          )}

          {/* 종목 */}
          <FilterOptionGroup
            ariaLabel="종목"
            options={EVENT_TYPES}
            selectedValue={eventTypeFilter}
            onSelect={(value) => onEventTypeFilterChange(value as EventType)}
          />

          {/* 접수 상태 */}
          <FilterOptionGroup
            ariaLabel="접수 상태"
            options={REGISTRATION_STATUSES}
            selectedValue={regFilter}
            onSelect={(value) =>
              onRegFilterChange(value as RegFilter)
            }
          />

          {/* 코스 */}
          <FilterOptionGroup
            ariaLabel="코스"
            options={COURSES}
            selectedValue={distanceFilter}
            onSelect={(value) => onDistanceFilterChange(value as DistanceFilter)}
          />

          {/* 지난 대회 포함 여부 */}
          <FilterOptionGroup
            ariaLabel="지난 대회 포함 여부"
            options={PAST_EVENT_OPTIONS}
            selectedValue={pastFilterLabel}
            onSelect={(value) =>
              onPastFilterChange(PAST_EVENT_LABEL_TO_VALUE[value] ?? "exclude")
            }
            className={TOGGLE_GRID_CLASS}
          />
        </section>
      )}
    </div>
  );
}
