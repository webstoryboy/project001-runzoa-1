"use client";

import { useState } from "react";
import { Share2, Heart, Star, MessageSquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DetailActions() {
  const [shared, setShared] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [notified, setNotified] = useState(false);

  return (
    <div className="detail__box rounded-full">
      <div
        className="grid grid-cols-5"
        role="toolbar"
        aria-label="대회 액션"
      >
        <Button
          variant="ghost"
          onClick={() => setShared((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${shared ? "bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500" : "text-muted-foreground"}`}
          aria-pressed={shared}
          aria-label="공유하기"
        >
          <Share2
            className={`h-5 w-5 ${shared ? "fill-sky-100 stroke-sky-500" : ""}`}
            aria-hidden="true"
          />
          <span>공유하기</span>
          <span className="bg-sky-100 text-sky-500 rounded-full px-2 py-1 text-xs font-nanumNeo hidden" aria-hidden="true">
            3
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setLiked((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${liked ? "bg-rose-50 text-rose-500 hover:bg-rose-50 hover:text-rose-500" : "text-muted-foreground"}`}
          aria-pressed={liked}
          aria-label="좋아요"
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-rose-500" : ""}`} aria-hidden="true" />
          <span>좋아요</span>
          <span className="bg-rose-100 text-rose-500 rounded-full px-2 py-1 text-xs font-nanumNeo hidden" aria-hidden="true">
            5
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setBookmarked((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${bookmarked ? "bg-amber-50 text-amber-500 hover:bg-amber-50 hover:text-amber-500" : "text-muted-foreground"}`}
          aria-pressed={bookmarked}
          aria-label="즐겨찾기"
        >
          <Star className={`h-5 w-5 ${bookmarked ? "fill-amber-500" : ""}`} aria-hidden="true" />
          <span>즐겨찾기</span>
          <span className="bg-amber-100 text-amber-500 rounded-full px-2 py-1 text-xs font-nanumNeo hidden" aria-hidden="true">
            233
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setCommented((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${commented ? "bg-violet-50 text-violet-500 hover:bg-violet-50 hover:text-violet-500" : "text-muted-foreground"}`}
          aria-pressed={commented}
          aria-label="댓글 보기"
        >
          <MessageSquare
            className={`h-5 w-5 ${commented ? "fill-violet-500 stroke-violet-500" : ""}`}
            aria-hidden="true"
          />
          <span>댓글</span>
          <span className="bg-violet-100 text-violet-500 rounded-full px-2 py-1 text-xs font-nanumNeo hidden" aria-hidden="true">
            15
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setNotified((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${notified ? "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500" : "text-muted-foreground"}`}
          aria-pressed={notified}
          aria-label="알림 설정"
        >
          <Bell className={`h-5 w-5 ${notified ? "fill-blue-500" : ""}`} aria-hidden="true" />
          <span>알림설정</span>
          <span className="bg-blue-100 text-blue-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
            111
          </span>
        </Button>
      </div>
    </div>
  );
}
