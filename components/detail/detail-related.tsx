"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useMarathons } from "@/contexts/context-marathons";
import { getMarathonStatusVariant, formatMarathonDateShort } from "@/lib/utils";
import type { Marathon } from "@/lib/types";
import {
  ChevronRight,
  Shuffle,
  ClipboardCheck,
  CalendarDays,
  Ghost,
} from "lucide-react";

function EventList({ items }: { items: Marathon[] }) {
  if (items.length === 0) {
    return (
      <div className="px-4 py-8 text-center font-anyvid text-sm text-muted-foreground border border-dashed rounded m-4 md:m-6">
        <Ghost
          className="w-10 h-10 text-brand/20 mx-auto mb-2"
          aria-hidden="true"
        />
        해당하는 대회가 없습니다.
      </div>
    );
  }

  return (
    <ul
      className={`divide-y divide-gray-50${items.length > 4 ? " max-h-[245px] overflow-y-auto" : ""}`}
    >
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/marathon/${item.slug}`}
            className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
            aria-label={`${item.name} ${formatMarathonDateShort(item.event_start_at)} ${item.location_region ?? ""} ${item.registration_status}`}
          >
            <Badge
              variant={getMarathonStatusVariant(item.registration_status)}
              className="w-16 shrink-0 justify-center font-anyvid text-xs"
              aria-hidden="true"
            >
              {item.registration_status}
            </Badge>
            <div className="min-w-0 flex-1">
              <p className="truncate font-anyvid text-sm font-medium group-hover:text-brand">
                {item.name}
              </p>
              <p className="font-anyvid text-xs text-muted-foreground">
                {formatMarathonDateShort(item.event_start_at)}
                {item.location_region && ` · ${item.location_region}`}
              </p>
            </div>
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0 text-gray-300 group-hover:text-brand"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DetailRelated({ marathon }: { marathon: Marathon }) {
  const marathons = useMarathons();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isUpcoming = (m: Marathon) => {
    if (!m.event_start_at) return true;
    return new Date(m.event_start_at) >= today;
  };

  const sortByDate = (a: Marathon, b: Marathon) => {
    if (!a.event_start_at && !b.event_start_at) return 0;
    if (!a.event_start_at) return 1;
    if (!b.event_start_at) return -1;
    return (
      new Date(a.event_start_at).getTime() -
      new Date(b.event_start_at).getTime()
    );
  };

  const international = marathons
    .filter(
      (m) =>
        m.location_country &&
        m.location_country !== "대한민국" &&
        isUpcoming(m),
    )
    .sort(sortByDate)
    .slice(0, 10);

  const openRegistration = marathons
    .filter(
      (m) =>
        m.slug !== marathon.slug &&
        (m.registration_status === "접수중" ||
          m.registration_status === "추가접수"),
    )
    .sort(sortByDate)
    .slice(0, 10);

  const sameRegion = marathons
    .filter(
      (m) =>
        m.slug !== marathon.slug &&
        m.location_region === marathon.location_region &&
        isUpcoming(m),
    )
    .sort(sortByDate)
    .slice(0, 10);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 해외 마라톤 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <Shuffle className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <h2 className="font-paperlogy font-semibold text-lg">
            해외 마라톤 대회
          </h2>
        </div>
        <EventList items={international} />
      </div>

      {/* 접수 중인 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <ClipboardCheck
            className="h-5 w-5 shrink-0 text-brand"
            aria-hidden="true"
          />
          <h2 className="font-paperlogy font-semibold text-lg">
            접수 중인 대회
          </h2>
        </div>
        <EventList items={openRegistration} />
      </div>

      {/* 같은 지역 대회 */}
      <div className="detail__box">
        <div className="detail__title">
          <CalendarDays
            className="h-5 w-5 shrink-0 text-brand"
            aria-hidden="true"
          />
          <h2 className="font-paperlogy font-semibold text-lg">
            같은 지역 대회
          </h2>
        </div>
        <EventList items={sameRegion} />
      </div>
    </div>
  );
}
