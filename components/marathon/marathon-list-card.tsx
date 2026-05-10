"use client";

import Link from "next/link";
import Image from "next/image";
import { Marathon } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  Bookmark,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Eye,
  Fan,
  Footprints,
  Heart,
  MapPin,
  MessageSquareMore,
  Share2,
  Users,
} from "lucide-react";
import {
  formatMarathonDate,
  formatMarathonDatetime,
  formatMarathonCategories,
  formatMarathonPrice,
  formatMarathonScale,
  getMarathonDDay,
  getMarathonDDayVariant,
  getMarathonStatusVariant,
} from "@/lib/utils";

import MarathonNoData from "./marathon-no-data";

export default function MarathonListCard({
  marathons,
}: {
  marathons: Marathon[];
}) {
  if (marathons.length === 0) {
    return <MarathonNoData />;
  }

  return (
    <section className="marathon__list__card">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {marathons.map((marathon, index) => {
          const dday = getMarathonDDay(marathon.event_start_at);
          const location =
            [marathon.location_region, marathon.location_place]
              .filter(Boolean)
              .join(" · ") || "미정";
          const detailHref = `/marathon/${marathon.slug}`;
          const scaleLabel = marathon.event_scale
            ? formatMarathonScale(marathon.event_scale)
            : null;

          return (
            <Card
              key={marathon.id}
              className="flex h-full flex-col justify-between gap-2 border border-gray-200/80 bg-white/90 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-6"
            >
              <CardHeader className="px-4 md:px-6">
                <CardTitle className="flex min-w-0 flex-col gap-2 font-paperlogy text-xl font-semibold text-slate-900 md:text-2xl">
                  <Link
                    href={detailHref}
                    className="block w-full truncate text-left"
                  >
                    {marathon.name}
                  </Link>
                  <div className="mb-1 flex flex-wrap items-center gap-1">
                    {dday !== "-" && (
                      <Badge variant={getMarathonDDayVariant(dday)}>
                        {dday}
                      </Badge>
                    )}
                    <Badge
                      variant={getMarathonStatusVariant(
                        marathon.registration_status,
                      )}
                    >
                      {marathon.registration_status}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-4 px-4 md:px-6">
                <div className="flex gap-3">
                  <Link
                    href={detailHref}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative flex h-[160px] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100"
                  >
                    {marathon.images_cover ? (
                      <Image
                        src={marathon.images_cover}
                        alt=""
                        width={120}
                        height={160}
                        priority={index < 2}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Fan
                          className="h-6 w-6 animate-spin"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </Link>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar
                        className="h-4 w-4 shrink-0 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-anyvid text-muted-foreground">
                        대회 :
                      </span>
                      <span className="truncate font-anyvid">
                        {formatMarathonDate(marathon.event_start_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardList
                        className="h-4 w-4 shrink-0 text-teal-500"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-anyvid text-muted-foreground">
                        접수 :
                      </span>
                      <span className="truncate font-anyvid">
                        {formatMarathonDatetime(marathon.registration_start_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin
                        className="h-4 w-4 shrink-0 text-pink-500"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-anyvid text-muted-foreground">
                        장소
                      </span>
                      <span className="truncate font-anyvid">{location}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Footprints
                        className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-anyvid text-muted-foreground">
                        종목 :
                      </span>
                      <span className="truncate font-anyvid">
                        {formatMarathonCategories(marathon.registration_price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CircleDollarSign
                        className="h-4 w-4 shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 font-anyvid text-muted-foreground">
                        가격 :
                      </span>
                      <span className="truncate font-anyvid">
                        {formatMarathonPrice(marathon.registration_price)}
                      </span>
                    </div>
                    {scaleLabel && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users
                          className="h-4 w-4 shrink-0 text-violet-500"
                          aria-hidden="true"
                        />
                        <span className="shrink-0 font-anyvid text-muted-foreground">
                          규모 :
                        </span>
                        <span className="truncate font-anyvid">
                          {scaleLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-wrap items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="공유하기"
                        className="h-10 w-10"
                      >
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>공유하기</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="좋아요"
                        className="h-10 w-10"
                      >
                        <Heart className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>좋아요</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="즐겨찾기"
                        className="h-10 w-10"
                      >
                        <Bookmark className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>즐겨찾기</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="댓글"
                        className="h-10 w-10"
                      >
                        <MessageSquareMore
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>댓글</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="알람 설정"
                        className="h-10 w-10"
                      >
                        <Bell className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>알람 설정</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant="ghost"
                    className="h-10 min-w-0 flex-1 text-muted-foreground hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    asChild
                  >
                    <Link
                      href={detailHref}
                      className="flex w-full min-w-0 items-center justify-center"
                      aria-label={`${marathon.name} 자세히 보기`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">자세히 보기</span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
