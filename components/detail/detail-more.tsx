"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, List, MoveRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMarathons } from "@/contexts/context-marathons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatMarathonDate,
  formatMarathonDatetime,
  getMarathonDDay,
  getMarathonDDayVariant,
  getMarathonStatusVariant,
} from "@/lib/utils";
import MarathonNoData from "@/components/marathon/marathon-no-data";

const MONTH_NAMES = [
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

const ROW_HEIGHT = 50;
const VISIBLE_ROWS = 10;

export default function DetailMore() {
  const marathons = useMarathons();

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const items = marathons
    .filter((m) => {
      if (!m.event_start_at) return false;
      const eventDate = new Date(m.event_start_at);
      eventDate.setHours(0, 0, 0, 0);
      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() + 1 === currentMonth &&
        eventDate >= now
      );
    })
    .sort(
      (a, b) =>
        new Date(a.event_start_at!).getTime() -
        new Date(b.event_start_at!).getTime(),
    );

  const title = `${MONTH_NAMES[currentMonth - 1]} 대회 목록`;
  const needsScroll = items.length > VISIBLE_ROWS;
  const scrollHeight = ROW_HEIGHT * VISIBLE_ROWS;

  return (
    <div className="detail__box">
      <div className="detail__title">
        <List className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <h2 className="font-paperlogy font-semibold text-lg">{title}</h2>
        <Link
          href="/?view=table"
          className="ml-auto flex items-center gap-1 font-anyvid text-xs text-muted-foreground transition-colors hover:text-brand"
          aria-label="전체 목록 테이블 뷰로 이동"
        >
          더보기
          <MoveRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="p-4 md:p-6">
          <MarathonNoData />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <ScrollArea
            style={needsScroll ? { height: scrollHeight } : undefined}
          >
            <Table aria-label={`${title} 테이블`} className="font-anyvid">
              {/* <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[46px] text-center">No</TableHead>
                  <TableHead className="w-[64px]">디데이</TableHead>
                  <TableHead className="w-[160px]">대회날짜</TableHead>
                  <TableHead className="w-[46px]">지역</TableHead>
                  <TableHead>마라톤명</TableHead>
                  <TableHead className="w-[80px]">접수상태</TableHead>
                  <TableHead className="w-[160px]">접수날짜</TableHead>
                  <TableHead className="w-[52px] text-center">보기</TableHead>
                </TableRow>
              </TableHeader> */}
              <TableBody>
                {items.map((marathon, index) => {
                  const dday = getMarathonDDay(marathon.event_start_at);
                  const href = `/marathon/${marathon.slug}`;

                  return (
                    <TableRow
                      key={marathon.id}
                      className="hover:bg-gray-50 text-muted-foreground"
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>
                        {dday !== "-" ? (
                          <Badge
                            variant={getMarathonDDayVariant(dday)}
                            className="font-anyvid"
                          >
                            {dday}
                          </Badge>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatMarathonDate(marathon.event_start_at)}
                      </TableCell>
                      <TableCell>
                        {marathon.location_region ?? "미정"}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={href}
                          className="block max-w-xs truncate hover:underline underline-offset-4 hover:text-brand"
                        >
                          {marathon.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getMarathonStatusVariant(
                            marathon.registration_status,
                          )}
                          className="font-anyvid"
                        >
                          {marathon.registration_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatMarathonDatetime(marathon.registration_start_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 rounded hover:bg-brand/8 hover:text-brand"
                          aria-label={`${marathon.name} 자세히 보기`}
                          asChild
                        >
                          <Link href={href}>
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
