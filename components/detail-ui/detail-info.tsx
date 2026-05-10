import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  CalendarCheck,
  MapPin,
  Users,
  CircleDollarSign,
  ListChecks,
  Gift,
  Activity,
  Phone,
} from "lucide-react";

export default function DetailInfo() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <Clock className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">대회 정보</h3>
        <Badge variant="outline" className="ml-auto font-anyvid">
          마라톤
        </Badge>
      </div>

      <div className="p-4 md:p-6">
        <ul className="space-y-3 font-anyvid text-sm" aria-label="대회 정보 목록">
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">대회 기간</span>
            <span className="flex-1 break-keep text-muted-foreground">
              2026년 5월 9일(토) 08:00
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <CalendarCheck className="h-4 w-4 text-indigo-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">접수 기간</span>
            <span className="flex-1 break-keep text-muted-foreground">
              2026년 4월 8일(수) ~ 2026년 4월 24일(금)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">장소</span>
            <span className="flex-1 break-keep text-muted-foreground">
              경남 · 3.15해양누리공원
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Activity className="h-4 w-4 text-orange-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">종목</span>
            <span className="flex-1 break-keep text-muted-foreground">
              FULL, 10KM, 5KM
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <CircleDollarSign className="h-4 w-4 text-emerald-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">참가비</span>
            <span className="flex-1 break-keep text-muted-foreground">
              40,000원 ~ 100,000원
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Users className="h-4 w-4 text-sky-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">규모</span>
            <span className="flex-1 break-keep text-muted-foreground">
              약 30,000명
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <ListChecks className="h-4 w-4 text-violet-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">프로그램</span>
            <span className="flex-1 break-keep text-muted-foreground">
              개회식, 스트레칭, 체험활동
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Gift className="h-4 w-4 text-pink-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">기념품</span>
            <span className="flex-1 break-keep text-muted-foreground">
              완주메달, 스트링백
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Phone className="h-4 w-4 text-amber-500 shrink-0" />
            </span>
            <span className="w-16 shrink-0">연락처</span>
            <span className="flex-1 break-keep text-muted-foreground">
              02-365-2015
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
