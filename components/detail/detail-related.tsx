import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Shuffle,
  ClipboardCheck,
  CalendarDays,
} from "lucide-react";

const similarEvents = [
  {
    id: 1,
    name: "2026 HYROX Seoul",
    date: "05/10",
    region: "서울",
    badge: "접수중",
    badgeColor: "destructive",
  },
  {
    id: 2,
    name: "2026 춘천 마라톤",
    date: "05/18",
    region: "강원",
    badge: "D-14",
    badgeColor: "destructive",
  },
  {
    id: 3,
    name: "제15회 대구 국제 마라톤",
    date: "05/24",
    region: "대구",
    badge: "접수전",
    badgeColor: "outline",
  },
  {
    id: 4,
    name: "2026 코리아 정글 트레일",
    date: "05/30",
    region: "경남",
    badge: "접수마감",
    badgeColor: "secondary",
  },
];

const openEvents = [
  {
    id: 1,
    name: "2026 서울 마라톤",
    date: "05/09",
    region: "서울",
    badge: "D-5",
    badgeColor: "destructive",
  },
  {
    id: 2,
    name: "2026 세이브더칠드런 마라톤",
    date: "05/11",
    region: "경남",
    badge: "D-7",
    badgeColor: "destructive",
  },
  {
    id: 3,
    name: "2026 인천 하프 마라톤",
    date: "05/17",
    region: "인천",
    badge: "D-13",
    badgeColor: "destructive",
  },
  {
    id: 4,
    name: "2026 제주 국제 마라톤",
    date: "05/22",
    region: "제주",
    badge: "D-18",
    badgeColor: "destructive",
  },
];

const monthlyEvents = [
  {
    id: 1,
    name: "2026 광주 국제 마라톤",
    date: "05/03",
    region: "광주",
    badge: "D-1",
    badgeColor: "destructive",
  },
  {
    id: 2,
    name: "2026 부산 하프 마라톤",
    date: "05/16",
    region: "부산",
    badge: "D-12",
    badgeColor: "destructive",
  },
  {
    id: 3,
    name: "제10회 세종 마라톤",
    date: "05/23",
    region: "세종",
    badge: "접수전",
    badgeColor: "outline",
  },
  {
    id: 4,
    name: "2026 울산 마라톤",
    date: "05/31",
    region: "울산",
    badge: "접수전",
    badgeColor: "outline",
  },
];

interface EventItem {
  id: number;
  name: string;
  date: string;
  region: string;
  badge: string;
  badgeColor: string;
}

function EventList({ events, label }: { events: EventItem[]; label: string }) {
  return (
    <ul className="divide-y divide-gray-50" aria-label={label}>
      {events.map((event) => (
        <li key={event.id}>
          <Link
            href="/"
            className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
            aria-label={`${event.name} ${event.date} ${event.region} ${event.badge}`}
          >
            <Badge
              variant="outline"
              className="w-14 shrink-0 justify-center font-anyvid text-xs"
              aria-hidden="true"
            >
              {event.badge}
            </Badge>
            <div className="min-w-0 flex-1">
              <p className="truncate font-anyvid text-sm font-medium group-hover:text-brand">
                {event.name}
              </p>
              <p className="font-anyvid text-xs text-muted-foreground">
                {event.date} · {event.region}
              </p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300 group-hover:text-brand" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DetailRelated() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 비슷한 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <Shuffle className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <h3 className="font-paperlogy font-semibold text-lg">
            해외 마라톤 대회
          </h3>
        </div>
        <EventList events={similarEvents} label="해외 마라톤 대회 목록" />
      </div>

      {/* 접수 중인 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <ClipboardCheck className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <h3 className="font-paperlogy font-semibold text-lg">
            접수 중인 대회
          </h3>
        </div>
        <EventList events={openEvents} label="접수 중인 대회 목록" />
      </div>

      {/* 이달의 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <CalendarDays className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <h3 className="font-paperlogy font-semibold text-lg">
            같은 지역 대회
          </h3>
        </div>
        <EventList events={monthlyEvents} label="같은 지역 대회 목록" />
      </div>
    </div>
  );
}
