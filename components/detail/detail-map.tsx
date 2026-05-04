"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADDRESS = "경남 창원시 마산합포구 · 3.15해양누리공원";

export default function DetailMap() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="detail__box">
      <div className="detail__title">
        <MapPin className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">대회 위치</h3>
        <div className="ml-auto flex gap-1.5">
          <Button
            size="sm"
            className="h-7 gap-1.5 bg-[#03C75A] px-2.5 font-anyvid text-xs text-white hover:bg-[#02a34d]"
            asChild
          >
            <Link
              href="https://map.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 지도에서 보기 (새 탭에서 열림)"
            >
              네이버 지도
            </Link>
          </Button>
          <Button
            size="sm"
            className="h-7 gap-1.5 bg-[#FEE500] px-2.5 font-anyvid text-xs text-[#3C1E1E] hover:bg-[#fdd800]"
            asChild
          >
            <Link
              href="https://map.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오 지도에서 보기 (새 탭에서 열림)"
            >
              카카오 지도
            </Link>
          </Button>
        </div>
      </div>

      {/* 지도 */}
      <div className="overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=35.2181,128.6815&hl=ko&z=15&output=embed"
          className="h-[300px] w-full border-0"
          title="대회 위치 지도"
          loading="lazy"
          allowFullScreen
        />
        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center gap-1.5 border-t border-gray-100 px-4 py-2.5 font-anyvid text-sm text-muted-foreground transition-colors hover:bg-gray-50"
          aria-label={`주소 복사: ${ADDRESS}`}
        >
          <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span>{ADDRESS}</span>
          <span
            className="ml-auto flex items-center gap-1 text-xs"
            aria-live="polite"
            aria-atomic="true"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="text-emerald-500">복사되었습니다</span>
              </>
            ) : (
              <Copy className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
