"use client";

import { useState } from "react";
import { Eye, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AREAS = ["전체", "국내", "해외"];
const YEARS = ["전체", "2026", "2027"];
const MONTHS = [
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
];
const OVERSEAS_REGIONS = [
  "전체",
  "일본",
  "미국",
  "프랑스",
  "독일",
  "중국",
  "베트남",
  "태국",
  "홍콩",
];
const SUBJECTS = [
  "전체",
  "걷기",
  "마라톤",
  "사이클",
  "철인3종",
  "트레일러닝",
  "하이록스",
  "기타",
];
const REG_STATUSES = ["전체", "접수 미정", "접수 전", "접수 중", "접수 마감"];
const COURSES = ["전체", "FULL", "HALF", "10KM", "5KM", "기타"];

export default function AdminMarathon() {
  const [year, setYear] = useState("전체");
  const [month, setMonth] = useState("전체");
  const [area, setArea] = useState("전체");
  const [domesticRegion, setDomesticRegion] = useState("전체");
  const [overseasRegion, setOverseasRegion] = useState("전체");
  const [subject, setSubject] = useState("전체");
  const [regStatus, setRegStatus] = useState("전체");
  const [course, setCourse] = useState("전체");
  const [includePast, setIncludePast] = useState(false);

  return (
    <div className="admin__container">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold font-paperlogy">마라톤</h1>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          등록된 대회 정보를 관리하고 일정, 접수, 노출 상태를 점검하세요.
        </p>
      </div>

      {/* 통계 */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <dt className="text-sm text-muted-foreground font-paperlogy">
            전체 마라톤
          </dt>
          <dd className="text-2xl font-semibold font-paperlogy">149</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <dt className="text-sm text-muted-foreground font-paperlogy">
            진행중
          </dt>
          <dd className="text-2xl font-semibold font-paperlogy text-red-600">
            122
          </dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <dt className="text-sm text-muted-foreground font-paperlogy">
            접수중
          </dt>
          <dd className="text-2xl font-semibold font-paperlogy text-blue-600">
            27
          </dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <dt className="text-sm text-muted-foreground font-paperlogy">
            접수대기
          </dt>
          <dd className="text-2xl font-semibold font-paperlogy text-green-600">
            10
          </dd>
        </div>
      </dl>

      {/* 필터 */}
      <div className="space-y-1 rounded-lg border p-4">
        {/* 년도 */}
        <div
          role="group"
          aria-label="년도"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {YEARS.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={year === item ? "destructive" : "ghost"}
              aria-pressed={year === item}
              className="w-full"
              onClick={() => setYear(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 월 */}
        <div
          role="group"
          aria-label="월"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {MONTHS.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={month === item ? "destructive" : "ghost"}
              aria-pressed={month === item}
              className="w-full"
              onClick={() => setMonth(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 국내/해외 */}
        <div
          role="group"
          aria-label="국내/해외"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {AREAS.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={area === item ? "destructive" : "ghost"}
              aria-pressed={area === item}
              className="w-full"
              onClick={() => setArea(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 국내 지역 */}
        {area === "국내" && (
          <div
            role="group"
            aria-label="국내 지역"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
          >
            {DOMESTIC_REGIONS.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={domesticRegion === item ? "destructive" : "ghost"}
                aria-pressed={domesticRegion === item}
                className="w-full"
                onClick={() => setDomesticRegion(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        )}

        {/* 해외 지역 */}
        {area === "해외" && (
          <div
            role="group"
            aria-label="해외 지역"
            className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
          >
            {OVERSEAS_REGIONS.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={overseasRegion === item ? "destructive" : "ghost"}
                aria-pressed={overseasRegion === item}
                className="w-full"
                onClick={() => setOverseasRegion(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        )}

        {/* 종목 */}
        <div
          role="group"
          aria-label="종목"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {SUBJECTS.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={subject === item ? "destructive" : "ghost"}
              aria-pressed={subject === item}
              className="w-full"
              onClick={() => setSubject(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 접수 상태 */}
        <div
          role="group"
          aria-label="접수 상태"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {REG_STATUSES.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={regStatus === item ? "destructive" : "ghost"}
              aria-pressed={regStatus === item}
              className="w-full"
              onClick={() => setRegStatus(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 코스 */}
        <div
          role="group"
          aria-label="코스"
          className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-9 xl:grid-cols-[repeat(13,minmax(0,1fr))]"
        >
          {COURSES.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={course === item ? "destructive" : "ghost"}
              aria-pressed={course === item}
              className="w-full"
              onClick={() => setCourse(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 지난 대회 */}
        <div
          role="group"
          aria-label="지난 대회 포함 여부"
          className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-[repeat(6,minmax(0,1fr))]"
        >
          <Button
            size="sm"
            variant={!includePast ? "destructive" : "ghost"}
            aria-pressed={!includePast}
            onClick={() => setIncludePast(false)}
          >
            지난 대회 비포함
          </Button>
          <Button
            size="sm"
            variant={includePast ? "destructive" : "ghost"}
            aria-pressed={includePast}
            onClick={() => setIncludePast(true)}
          >
            지난 대회 포함
          </Button>
        </div>
      </div>

      {/* 검색 */}
      <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-10">
        <div className="md:col-span-3">
          <div className="relative h-full">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="마라톤 검색"
              className="h-full rounded-lg pl-10"
            />
          </div>
        </div>
        <div className="md:col-span-7 font-anyvid flex items-center justify-center rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
          <p>
            현재 <span className="text-brand">55</span>개의 마라톤이 있습니다.
          </p>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[40px] text-center hidden sm:table-cell">
                No
              </TableHead>
              <TableHead className="hidden md:table-cell">타입</TableHead>
              <TableHead className="hidden md:table-cell">지역</TableHead>
              <TableHead className="hidden sm:table-cell">대회날짜</TableHead>
              <TableHead>마라톤명</TableHead>
              <TableHead className="w-[90px]">접수상태</TableHead>
              <TableHead className="hidden lg:table-cell">접수기간</TableHead>
              <TableHead className="w-[60px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <div className="flex flex-col items-center gap-2">
                  <Trophy className="w-8 h-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    등록된 마라톤이 없습니다.
                  </p>
                </div>
              </TableCell>
            </TableRow> */}

            <TableRow className="hover:bg-gray-50">
              <TableCell className="text-center">1</TableCell>
              <TableCell className="hidden md:table-cell">마라톤</TableCell>
              <TableCell className="hidden md:table-cell">서울</TableCell>
              <TableCell>2027년 3월 21일(일)</TableCell>
              <TableCell>2027 서울 마라톤</TableCell>
              <TableCell>
                <Badge variant="secondary">접수대기</Badge>
              </TableCell>
              <TableCell>2027년 3월 21일(일) ~ 2027년 4월 21일(일)</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
