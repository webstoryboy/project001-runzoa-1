"use client";

import { Drum, BadgeAlert, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DetailComment() {
  return (
    <div className="detail__box flex flex-col">
      <div className="detail__title">
        <Drum className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h2 className="font-paperlogy font-semibold text-lg">댓글</h2>
        <div className="ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8"
                aria-label="댓글 작성하기"
              >
                <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-anyvid">메세지 작성하기</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div
          className="flex min-h-48 flex-1 flex-col items-center justify-center rounded border border-dashed font-anyvid text-sm text-muted-foreground"
          role="status"
          aria-label="댓글 없음"
        >
          <BadgeAlert
            className="mb-2 h-14 w-14 text-brand/20"
            aria-hidden="true"
          />
          아직 댓글이 없습니다.
        </div>
      </div>
    </div>
  );
}
