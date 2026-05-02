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
import { Eye } from "lucide-react";

export default function MarathonListTable() {
  return (
    <div className="marathon__list__table">
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table aria-label="마라톤 대회 목록">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[70px]">디데이</TableHead>
              <TableHead className="w-[150px]">대회날짜</TableHead>
              <TableHead className="w-[50px]">지역</TableHead>
              <TableHead>마라톤명</TableHead>
              <TableHead className="w-[90px]">접수상태</TableHead>
              <TableHead className="w-[150px]">접수날짜</TableHead>
              <TableHead className="w-[60px] text-center">보기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">1</TableCell>
              <TableCell>
                <Badge variant="destructive">D-Day</Badge>
              </TableCell>
              <TableCell>2026년 3월 30일(수)</TableCell>
              <TableCell>서울</TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="hover:underline underline-offset-4 truncate block max-w-xs"
                >
                  2026 서울 마라톤
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="destructive">접수중</Badge>
              </TableCell>
              <TableCell>2025년 3월 1일(금)</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="w-8 h-8 rounded hover:bg-brand/8 hover:text-brand hover:border-brand/20"
                  aria-label="2026 서울 마라톤 자세히 보기"
                  asChild
                >
                  <Link href="/">
                    <Eye className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-gray-50 text-muted-foreground">
              <TableCell className="text-center">2</TableCell>
              <TableCell>
                <Badge variant="destructive">D-11</Badge>
              </TableCell>
              <TableCell>2026년 5월 30일(월)</TableCell>
              <TableCell>경남</TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="hover:underline underline-offset-4 truncate block max-w-xs"
                >
                  2026 코리아 정글 트레일
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="ghost">접수마감</Badge>
              </TableCell>
              <TableCell>2025년 3월 1일(금)</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="w-8 h-8 rounded hover:bg-brand/8 hover:text-brand hover:border-brand/20"
                  aria-label="2026 코리아 정글 트레일 자세히 보기"
                  asChild
                >
                  <Link href="/">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-gray-50 text-muted-foreground">
              <TableCell className="text-center">3</TableCell>
              <TableCell>
                <Badge variant="destructive">D-10</Badge>
              </TableCell>
              <TableCell>2026년 5월 27일(월)</TableCell>
              <TableCell>경남</TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="hover:underline underline-offset-4 truncate block max-w-xs"
                >
                  2026 세븐 브릿지 투어
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="ghost">접수미정</Badge>
              </TableCell>
              <TableCell>2025년 3월 11일(금)</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="w-8 h-8 rounded hover:bg-brand/8 hover:text-brand hover:border-brand/20"
                  aria-label="2026 세븐 브릿지 투어 자세히 보기"
                  asChild
                >
                  <Link href="/">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-gray-50 text-muted-foreground">
              <TableCell className="text-center">4</TableCell>
              <TableCell>
                <Badge variant="destructive">D-9</Badge>
              </TableCell>
              <TableCell>2026년 5월 26일(월)</TableCell>
              <TableCell>경남</TableCell>
              <TableCell>
                <Link
                  href="/"
                  className="hover:underline underline-offset-4 truncate block max-w-xs"
                >
                  2026 IRONMAN Gurye Korea
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="ghost">접수미정</Badge>
              </TableCell>
              <TableCell>2025년 3월 11일(금)</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="w-8 h-8 rounded hover:bg-brand/8 hover:text-brand hover:border-brand/20"
                  aria-label="2026 IRONMAN Gurye Korea 자세히 보기"
                  asChild
                >
                  <Link href="/">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
