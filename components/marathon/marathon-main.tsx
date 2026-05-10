"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMarathons } from "@/contexts/context-marathons";
import { matchesMarathonCourse } from "@/lib/utils";

import MarathonFilter from "./marathon-filter";
import MarathonTitle from "./marathon-title";
import MarathonMonthBar from "./marathon-month-bar";
import MarathonNotice from "./marathon-notice";
import MarathonSearchBar from "./marathon-search-bar";
import MarathonListCard from "./marathon-list-card";
import MarathonListTable from "./marathon-list-table";
import MarathonListCalendar from "./marathon-list-calendar";

export type ViewType = "card" | "table" | "calendar";
export type CountryFilter = "all" | "domestic" | "international";
export type YearFilter = "전체" | "2026" | "2027";
export type RegionFilter = string;
export type EventType = string;
export type DistanceFilter = "전체" | "FULL" | "HALF" | "10KM" | "5KM" | "기타";
export type PastMarathonFilter = "exclude" | "include";
export type RegFilter =
  | "전체"
  | "접수 미정"
  | "접수 대기"
  | "접수 중"
  | "접수 마감"
  | "추가접수";

function normalizeView(view: string | null): ViewType {
  if (view === "table" || view === "calendar") return view;
  return "card";
}

function normalizeRegistrationStatus(status: string) {
  return status.replaceAll(" ", "");
}

export default function MarathonMain() {
  const allMarathons = useMarathons();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [yearFilter, setYearFilter] = useState<YearFilter>("전체");
  const [month, setMonth] = useState("전체");
  const [countryFilter, setCountryFilter] = useState<CountryFilter>("all");
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("전체");
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType>("전체");
  const [regFilter, setRegFilter] = useState<RegFilter>("전체");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("전체");
  const [pastFilter, setPastFilter] = useState<PastMarathonFilter>("exclude");
  const view = normalizeView(searchParams?.get("view") ?? null);

  const handleViewChange = (nextView: ViewType) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (nextView === "card") params.delete("view");
    else params.set("view", nextView);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleCountryFilterChange = (nextFilter: CountryFilter) => {
    setCountryFilter(nextFilter);
    setRegionFilter("전체");
  };

  // 활성 필터 라벨 목록 (배지·요약 메시지용)
  const activeLabels = useMemo(() => {
    const labels: string[] = [];
    if (yearFilter !== "전체") labels.push(yearFilter);
    if (countryFilter === "domestic") labels.push("국내");
    else if (countryFilter === "international") labels.push("해외");
    if (regionFilter !== "전체") labels.push(regionFilter);
    if (eventTypeFilter !== "전체") labels.push(eventTypeFilter);
    if (regFilter !== "전체") labels.push(regFilter);
    if (distanceFilter !== "전체") labels.push(distanceFilter);
    if (pastFilter === "include") labels.push("지난대회 포함");
    if (month !== "전체") labels.push(month);
    if (searchQuery.trim()) labels.push(`"${searchQuery.trim()}"`);
    return labels;
  }, [
    yearFilter,
    countryFilter,
    regionFilter,
    eventTypeFilter,
    regFilter,
    distanceFilter,
    pastFilter,
    month,
    searchQuery,
  ]);

  // 선택한 조건에 맞게 마라톤 목록 필터링
  const filtered = useMemo(() => {
    let result = allMarathons;
    if (countryFilter === "domestic") {
      result = result.filter((m) => m.location_country === "대한민국");
      if (regionFilter !== "전체")
        result = result.filter((m) => m.location_region === regionFilter);
    } else if (countryFilter === "international") {
      result = result.filter((m) => m.location_country !== "대한민국");
      if (regionFilter !== "전체")
        result = result.filter((m) => m.location_country === regionFilter);
    }
    if (eventTypeFilter !== "전체")
      result = result.filter((m) => m.event_type === eventTypeFilter);
    if (regFilter !== "전체")
      result = result.filter(
        (m) => m.registration_status === normalizeRegistrationStatus(regFilter),
      );
    if (distanceFilter !== "전체")
      result = result.filter((m) =>
        matchesMarathonCourse(m.registration_price, distanceFilter),
      );
    if (pastFilter === "exclude") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      result = result.filter(
        (m) => !m.event_start_at || new Date(m.event_start_at) >= today,
      );
    }
    if (month !== "전체") {
      const monthNum = parseInt(month);
      result = result.filter(
        (m) =>
          m.event_start_at &&
          new Date(m.event_start_at).getMonth() + 1 === monthNum,
      );
    }
    if (yearFilter !== "전체") {
      const yearNum = parseInt(yearFilter);
      result = result.filter(
        (m) =>
          m.event_start_at &&
          new Date(m.event_start_at).getFullYear() === yearNum,
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q));
    }
    return result;
  }, [
    allMarathons,
    countryFilter,
    regionFilter,
    eventTypeFilter,
    regFilter,
    distanceFilter,
    pastFilter,
    month,
    yearFilter,
    searchQuery,
  ]);

  // 달력용: 모든 기간 포함
  const filteredAll = useMemo(() => {
    let result = allMarathons;
    if (countryFilter === "domestic") {
      result = result.filter((m) => m.location_country === "대한민국");
      if (regionFilter !== "전체")
        result = result.filter((m) => m.location_region === regionFilter);
    } else if (countryFilter === "international") {
      result = result.filter((m) => m.location_country !== "대한민국");
      if (regionFilter !== "전체")
        result = result.filter((m) => m.location_country === regionFilter);
    }
    if (eventTypeFilter !== "전체")
      result = result.filter((m) => m.event_type === eventTypeFilter);
    if (regFilter !== "전체")
      result = result.filter(
        (m) => m.registration_status === normalizeRegistrationStatus(regFilter),
      );
    if (distanceFilter !== "전체")
      result = result.filter((m) =>
        matchesMarathonCourse(m.registration_price, distanceFilter),
      );
    if (month !== "전체") {
      const monthNum = parseInt(month);
      result = result.filter(
        (m) =>
          m.event_start_at &&
          new Date(m.event_start_at).getMonth() + 1 === monthNum,
      );
    }
    if (yearFilter !== "전체") {
      const yearNum = parseInt(yearFilter);
      result = result.filter(
        (m) =>
          m.event_start_at &&
          new Date(m.event_start_at).getFullYear() === yearNum,
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((m) => m.name.toLowerCase().includes(q));
    }
    return result;
  }, [
    allMarathons,
    countryFilter,
    regionFilter,
    eventTypeFilter,
    regFilter,
    distanceFilter,
    month,
    yearFilter,
    searchQuery,
  ]);

  return (
    <>
      {/* 마라톤 페이지 상단 타이틀 영역 */}
      <MarathonTitle />

      {/* 국내/해외 조건을 선택하는 필터 영역 */}
      <MarathonFilter
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        countryFilter={countryFilter}
        onCountryFilterChange={handleCountryFilterChange}
        regionFilter={regionFilter}
        onRegionFilterChange={setRegionFilter}
        eventTypeFilter={eventTypeFilter}
        onEventTypeFilterChange={setEventTypeFilter}
        regFilter={regFilter}
        onRegFilterChange={setRegFilter}
        distanceFilter={distanceFilter}
        onDistanceFilterChange={setDistanceFilter}
        pastFilter={pastFilter}
        onPastFilterChange={setPastFilter}
      />

      {/* 이용 안내 문구를 보여주는 공지 영역 */}
      <MarathonNotice
        filteredCount={filtered.length}
        activeLabels={activeLabels}
      />

      {/* 목록 보기 방식을 전환하는 검색 및 뷰 제어 영역 */}
      <MarathonSearchBar
        view={view}
        onViewChange={handleViewChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 월별 탐색을 위한 상단 월 선택 영역 */}
      <MarathonMonthBar month={month} onMonthChange={setMonth} />

      {/* 선택한 보기 방식에 따라 목록 UI를 분기 렌더링 */}
      {view === "card" && <MarathonListCard marathons={filtered} />}
      {view === "table" && <MarathonListTable marathons={filtered} />}
      {view === "calendar" && (
        <MarathonListCalendar
          marathons={filteredAll}
          month={month}
          year={yearFilter}
        />
      )}
    </>
  );
}
