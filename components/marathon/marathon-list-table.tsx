import Link from "next/link";
import { Marathon } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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

import MarathonNoData from "./marathon-no-data";

export default function MarathonListTable({
  marathons,
}: {
  marathons: Marathon[];
}) {
  if (marathons.length === 0) {
    return <MarathonNoData />;
  }

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
            {marathons.map((marathon, index) => {
              const dday = getMarathonDDay(marathon.event_start_at);
              const detailHref = `/marathon/${marathon.slug}`;

              return (
                <TableRow
                  key={marathon.id}
                  className="hover:bg-gray-50 text-muted-foreground"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    {dday !== "-" ? (
                      <Badge variant={getMarathonDDayVariant(dday)}>
                        {dday}
                      </Badge>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {formatMarathonDate(marathon.event_start_at)}
                  </TableCell>
                  <TableCell>{marathon.location_region ?? "미정"}</TableCell>
                  <TableCell>
                    <Link
                      href={detailHref}
                      className="hover:underline underline-offset-4 truncate block max-w-xs"
                    >
                      {marathon.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getMarathonStatusVariant(
                        marathon.registration_status,
                      )}
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
                      className="w-8 h-8 rounded hover:bg-brand/8 hover:text-brand hover:border-brand/20"
                      aria-label={`${marathon.name} 자세히 보기`}
                      asChild
                    >
                      <Link href={detailHref}>
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
