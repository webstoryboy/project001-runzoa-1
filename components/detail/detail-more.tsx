import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, List } from "lucide-react";

const events = [
  {
    no: 1,
    dday: "D-5",
    date: "2026년 05월 09일(토)",
    region: "경남",
    name: "2026 세이브더칠드런 국제어린이마라톤",
    status: "접수중",
    statusVariant: "destructive",
    regDate: "2026년 04월 08일(수)",
  },
  {
    no: 2,
    dday: "D-7",
    date: "2026년 05월 11일(월)",
    region: "서울",
    name: "2026 서울 하프 마라톤",
    status: "접수중",
    statusVariant: "destructive",
    regDate: "2026년 04월 10일(금)",
  },
  {
    no: 3,
    dday: "D-12",
    date: "2026년 05월 16일(토)",
    region: "부산",
    name: "2026 부산 국제 마라톤",
    status: "접수중",
    statusVariant: "destructive",
    regDate: "2026년 04월 15일(수)",
  },
  {
    no: 4,
    dday: "D-14",
    date: "2026년 05월 18일(일)",
    region: "강원",
    name: "2026 춘천 마라톤",
    status: "접수중",
    statusVariant: "destructive",
    regDate: "2026년 04월 01일(수)",
  },
  {
    no: 5,
    dday: "D-18",
    date: "2026년 05월 22일(금)",
    region: "제주",
    name: "2026 제주 국제 마라톤",
    status: "접수중",
    statusVariant: "destructive",
    regDate: "2026년 04월 20일(일)",
  },
  {
    no: 6,
    dday: "D-20",
    date: "2026년 05월 24일(일)",
    region: "대구",
    name: "제15회 대구 국제 마라톤",
    status: "접수전",
    statusVariant: "outline",
    regDate: "2026년 04월 25일(금)",
  },
  {
    no: 7,
    dday: "D-26",
    date: "2026년 05월 30일(월)",
    region: "경남",
    name: "2026 코리아 정글 트레일",
    status: "접수마감",
    statusVariant: "secondary",
    regDate: "2026년 03월 01일(금)",
  },
  {
    no: 8,
    dday: "D-27",
    date: "2026년 05월 31일(토)",
    region: "울산",
    name: "2026 울산 마라톤",
    status: "접수전",
    statusVariant: "outline",
    regDate: "2026년 04월 28일(화)",
  },
];

type BadgeVariant = "destructive" | "outline" | "secondary" | "default";

export default function DetailMore() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <List className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">7월 대회 목록</h3>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="전체 대회 목록" className="font-anyvid">
          <TableHeader>
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
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow
                key={event.no}
                className="hover:bg-gray-50 text-muted-foreground"
              >
                <TableCell className="text-center">{event.no}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="font-anyvid">
                    {event.dday}
                  </Badge>
                </TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.region}</TableCell>
                <TableCell>
                  <Link
                    href="/"
                    className="block max-w-xs truncate hover:underline underline-offset-4 hover:text-brand"
                  >
                    {event.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={event.statusVariant as BadgeVariant}
                    className="font-anyvid"
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>{event.regDate}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-8 w-8 rounded hover:bg-brand/8 hover:text-brand"
                    aria-label={`${event.name} 자세히 보기`}
                    asChild
                  >
                    <Link href="/">
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
