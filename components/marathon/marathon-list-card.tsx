import Link from "next/link";
import Image from "next/image";
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

export default function MarathonListCard() {
  return (
    <div className="marathon__list__card">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="flex h-full flex-col justify-between gap-2 border border-gray-200/80 bg-white/90 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-6">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="flex min-w-0 flex-col gap-2 text-xl font-semibold text-slate-900 md:text-2xl font-paperlogy">
              <Link href="/" className="block w-full truncate text-left">
                2026 서울 마라톤
              </Link>
              <div className="mb-1 flex flex-wrap items-center gap-1">
                <Badge variant="destructive">D-20</Badge>
                <Badge variant="outline">접수전</Badge>
                <Badge variant="ghost">
                  접수까지 30일 남았습니다.<span aria-hidden="true">🥶</span>
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4 px-4 md:px-6">
            <div className="flex gap-3">
              <Link
                href="/"
                tabIndex={-1}
                aria-hidden="true"
                className="flex h-[160px] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100"
              >
                <Image
                  src="/marathon/cover/4th-bamseom-marathon.jpg"
                  alt=""
                  width={120}
                  height={160}
                  priority
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-blue-600">대회</span>
                  <span className="truncate font-anyvid">2026년 6월 1일(월)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-teal-500">접수</span>
                  <span className="truncate font-anyvid">2025년 4월 1일(화) 14:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-pink-500">장소</span>
                  <span className="truncate font-anyvid">서울, 상암경기장</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-orange-500">종목</span>
                  <span className="truncate font-anyvid">FULL, 10KM, 5KM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDollarSign className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-green-500">가격</span>
                  <span className="truncate font-anyvid">50,000원</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-violet-500">규모</span>
                  <span className="truncate font-anyvid">약 3,000명</span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="공유하기" className="h-10 w-10">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>공유하기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="좋아요" className="h-10 w-10">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>좋아요</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" aria-label="즐겨찾기" className="h-10 w-10">
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>즐겨찾기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="댓글" className="h-10 w-10">
                    <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>댓글</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="알람 설정" className="h-10 w-10">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>알람 설정</p></TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                className="min-w-0 h-10 flex-1 text-muted-foreground hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                asChild
              >
                <Link
                  href="/"
                  className="flex w-full min-w-0 items-center justify-center"
                  aria-label="2026 서울 마라톤 자세히 보기"
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

        <Card className="flex h-full flex-col justify-between gap-2 border border-gray-200/80 bg-white/90 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-6">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="flex min-w-0 flex-col gap-2 text-xl font-semibold text-slate-900 md:text-2xl font-paperlogy">
              <Link href="/" className="block w-full truncate text-left">
                2026 코리아 정글 트레일
              </Link>
              <div className="mb-1 flex flex-wrap items-center gap-1">
                <Badge variant="destructive">D-10</Badge>
                <Badge variant="destructive">접수중</Badge>
                <Badge variant="outline">
                  얼릉 접수하세요<span aria-hidden="true">🏅</span>
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4 px-4 md:px-6">
            <div className="flex gap-3">
              <Link
                href="/"
                tabIndex={-1}
                aria-hidden="true"
                className="flex h-[160px] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100"
              >
                <Image
                  src="/marathon/cover/2026-chuncheon-bomnae-marathon.jpg"
                  alt=""
                  width={120}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-blue-600">대회</span>
                  <span className="truncate font-anyvid">2026년 6월 30일(월)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-teal-500">접수</span>
                  <span className="truncate font-anyvid">미정</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-pink-500">장소</span>
                  <span className="truncate font-anyvid">서울, 상암경기장</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-orange-500">종목</span>
                  <span className="truncate font-anyvid">FULL, HALF, 10KM, 5KM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDollarSign className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-green-500">가격</span>
                  <span className="truncate font-anyvid">50,000원 ~ 70,000원</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-violet-500">규모</span>
                  <span className="truncate font-anyvid">약 10,000명</span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="공유하기" className="h-10 w-10">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>공유하기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="좋아요" className="h-10 w-10">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>좋아요</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="즐겨찾기" className="h-10 w-10">
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>즐겨찾기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="댓글" className="h-10 w-10">
                    <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>댓글</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" aria-label="알람 설정" className="h-10 w-10">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>알람 설정</p></TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                className="min-w-0 h-10 flex-1 text-muted-foreground hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                asChild
              >
                <Link
                  href="/"
                  className="flex w-full min-w-0 items-center justify-center"
                  aria-label="2026 코리아 정글 트레일 자세히 보기"
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

        <Card className="flex h-full flex-col justify-between gap-2 border border-gray-200/80 bg-white/90 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-6">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="flex min-w-0 flex-col gap-2 text-xl font-semibold text-slate-900 md:text-2xl font-paperlogy">
              <Link href="/" className="block w-full truncate text-left">
                2027 Disney Princess Half Marathon Weekend
              </Link>
              <div className="mb-1 flex flex-wrap items-center gap-1">
                <Badge variant="ghost">종료</Badge>
                <Badge variant="ghost">접수마감</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4 px-4 md:px-6">
            <div className="flex gap-3">
              <Link
                href="/"
                tabIndex={-1}
                aria-hidden="true"
                className="flex h-[160px] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100"
              >
                <Image
                  src="/marathon/cover/disney-princess-half-marathon-weekend-2027.jpg"
                  alt=""
                  width={120}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-blue-600">대회</span>
                  <span className="truncate font-anyvid">2026년 6월 30일(월)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-teal-500">접수</span>
                  <span className="truncate font-anyvid">미정</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-pink-500">장소</span>
                  <span className="truncate font-anyvid">플로리다 · 월트 디즈니 월드 리조트</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-orange-500">종목</span>
                  <span className="truncate font-anyvid">5K, 10K, Half, Challenge</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDollarSign className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-green-500">가격</span>
                  <span className="truncate font-anyvid">$125 ~ $449</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-violet-500">규모</span>
                  <span className="truncate font-anyvid">약 20,000명</span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="공유하기" className="h-10 w-10">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>공유하기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="좋아요" className="h-10 w-10">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>좋아요</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="즐겨찾기" className="h-10 w-10">
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>즐겨찾기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="댓글" className="h-10 w-10">
                    <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>댓글</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" aria-label="알람 설정" className="h-10 w-10">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>알람 설정</p></TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                className="min-w-0 h-10 flex-1 text-muted-foreground hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                asChild
              >
                <Link
                  href="/"
                  className="flex w-full min-w-0 items-center justify-center"
                  aria-label="2027 Disney Princess Half Marathon Weekend 자세히 보기"
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

        <Card className="flex h-full flex-col justify-between gap-2 border border-gray-200/80 bg-white/90 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg md:py-6">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="flex min-w-0 flex-col gap-2 text-xl font-semibold text-slate-900 md:text-2xl font-paperlogy">
              <Link href="/" className="block w-full truncate text-left">
                2026 THE NORTH FACE 100 KOREA with VECTI
              </Link>
              <div className="mb-1 flex flex-wrap items-center gap-1">
                <Badge variant="destructive">디데이</Badge>
                <Badge variant="ghost">접수마감</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col gap-4 px-4 md:px-6">
            <div className="flex gap-3">
              <Link
                href="/"
                tabIndex={-1}
                aria-hidden="true"
                className="relative flex h-[160px] w-[120px] shrink-0 overflow-hidden rounded bg-gray-100"
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Fan className="h-6 w-6" aria-hidden="true" />
                </div>
              </Link>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-blue-600">대회</span>
                  <span className="truncate font-anyvid">2026년 6월 30일(월)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-teal-500">접수</span>
                  <span className="truncate font-anyvid">2025년 3월 2일(수)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-pink-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-pink-500">장소</span>
                  <span className="truncate font-anyvid">뉴옥 · 월트 디즈니 월드 리조트</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Footprints className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-orange-500">종목</span>
                  <span className="truncate font-anyvid">5K, 10K, HALF</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleDollarSign className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-green-500">가격</span>
                  <span className="truncate font-anyvid">$125 ~ $449</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0 text-violet-500" aria-hidden="true" />
                  <span className="shrink-0 font-anyvid text-violet-500">규모</span>
                  <span className="truncate font-anyvid">약 30,000명</span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="공유하기" className="h-10 w-10">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>공유하기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="좋아요" className="h-10 w-10">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>좋아요</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" aria-label="즐겨찾기" className="h-10 w-10">
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>즐겨찾기</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" aria-label="댓글" className="h-10 w-10">
                    <MessageSquareMore className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>댓글</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" aria-label="알람 설정" className="h-10 w-10">
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>알람 설정</p></TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                className="min-w-0 h-10 flex-1 text-muted-foreground hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                asChild
              >
                <Link
                  href="/"
                  className="flex w-full min-w-0 items-center justify-center"
                  aria-label="2026 THE NORTH FACE 100 KOREA with VECTI 자세히 보기"
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
      </div>
    </div>
  );
}
