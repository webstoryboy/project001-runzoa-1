"use client";

import { useState } from "react";
import { Share2, Heart, Star, MessageSquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marathon } from "@/lib/types";

export default function DetailActions({ marathon }: { marathon: Marathon }) {
  const [shared, setShared] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [notified, setNotified] = useState(false);

  return (
    <div className="detail__box rounded-full">
      <div className="grid grid-cols-5" role="toolbar" aria-label="대회 액션">
        <Button
          variant="ghost"
          onClick={() => setShared((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${shared ? "bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500" : "text-muted-foreground"}`}
          aria-pressed={shared}
          aria-label={marathon.share_count > 0 ? `공유하기 ${marathon.share_count.toLocaleString("ko-KR")}개` : "공유하기"}
        >
          <Share2 className={`h-5 w-5 ${shared ? "fill-sky-100 stroke-sky-500" : ""}`} aria-hidden="true" />
          <span>공유하기</span>
          {marathon.share_count > 0 && (
            <span className="bg-sky-100 text-sky-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
              {marathon.share_count.toLocaleString("ko-KR")}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setLiked((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${liked ? "bg-rose-50 text-rose-500 hover:bg-rose-50 hover:text-rose-500" : "text-muted-foreground"}`}
          aria-pressed={liked}
          aria-label={marathon.like_count > 0 ? `좋아요 ${marathon.like_count.toLocaleString("ko-KR")}개` : "좋아요"}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-rose-500" : ""}`} aria-hidden="true" />
          <span>좋아요</span>
          {marathon.like_count > 0 && (
            <span className="bg-rose-100 text-rose-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
              {marathon.like_count.toLocaleString("ko-KR")}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setBookmarked((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${bookmarked ? "bg-amber-50 text-amber-500 hover:bg-amber-50 hover:text-amber-500" : "text-muted-foreground"}`}
          aria-pressed={bookmarked}
          aria-label={marathon.favorite_count > 0 ? `즐겨찾기 ${marathon.favorite_count.toLocaleString("ko-KR")}개` : "즐겨찾기"}
        >
          <Star className={`h-5 w-5 ${bookmarked ? "fill-amber-500" : ""}`} aria-hidden="true" />
          <span>즐겨찾기</span>
          {marathon.favorite_count > 0 && (
            <span className="bg-amber-100 text-amber-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
              {marathon.favorite_count.toLocaleString("ko-KR")}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setCommented((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${commented ? "bg-violet-50 text-violet-500 hover:bg-violet-50 hover:text-violet-500" : "text-muted-foreground"}`}
          aria-pressed={commented}
          aria-label={marathon.comment_count > 0 ? `댓글 ${marathon.comment_count.toLocaleString("ko-KR")}개` : "댓글"}
        >
          <MessageSquare className={`h-5 w-5 ${commented ? "fill-violet-500 stroke-violet-500" : ""}`} aria-hidden="true" />
          <span>댓글</span>
          {marathon.comment_count > 0 && (
            <span className="bg-violet-100 text-violet-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
              {marathon.comment_count.toLocaleString("ko-KR")}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setNotified((v) => !v)}
          className={`h-auto flex gap-1.5 rounded-none border-0 py-3 font-anyvid text-sm hover:bg-gray-50 ${notified ? "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500" : "text-muted-foreground"}`}
          aria-pressed={notified}
          aria-label={marathon.alert_count > 0 ? `알림설정 ${marathon.alert_count.toLocaleString("ko-KR")}개` : "알림설정"}
        >
          <Bell className={`h-5 w-5 ${notified ? "fill-blue-500" : ""}`} aria-hidden="true" />
          <span>알림설정</span>
          {marathon.alert_count > 0 && (
            <span className="bg-blue-100 text-blue-500 rounded-full px-2 py-1 text-xs font-nanumNeo" aria-hidden="true">
              {marathon.alert_count.toLocaleString("ko-KR")}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
