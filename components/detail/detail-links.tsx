import Link from "next/link";
import { Link2, ExternalLink, Heart, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DetailLinks() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <Link2 className="w-5 h-5 text-brand shrink-0" />
        <h3 className="font-paperlogy font-semibold text-lg">관련 링크</h3>
      </div>

      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* 핵심 정보 칩 */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="destructive" className="font-anyvid">
            D-5
          </Badge>
          <Badge variant="outline" className="font-anyvid">
            2026.05.09
          </Badge>
          <Badge variant="outline" className="font-anyvid">
            경남
          </Badge>
          <Badge variant="outline" className="font-anyvid text-emerald-600 border-emerald-200 bg-emerald-50">
            접수중
          </Badge>
        </div>

        {/* 강조 CTA 영역 */}
        <div className="rounded-xl border border-brand/15 bg-gradient-to-br from-brand/8 to-brand/3 p-4">
          <p className="mb-3 break-keep font-anyvid text-xs text-muted-foreground">
            공식 사이트에서 자세한 정보 확인 및 접수를 진행할 수 있습니다.
          </p>
          <Button
            variant="destructive"
            className="w-full gap-2 font-anyvid"
            asChild
          >
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              공식 사이트 바로가기
            </Link>
          </Button>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-1.5 py-3 font-anyvid text-xs"
          >
            <Heart className="h-4 w-4 text-rose-500" />
            좋아요
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-1.5 py-3 font-anyvid text-xs"
          >
            <Share2 className="h-4 w-4 text-blue-500" />
            공유
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-1.5 py-3 font-anyvid text-xs"
          >
            <Bookmark className="h-4 w-4 text-amber-500" />
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
