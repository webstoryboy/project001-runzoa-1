"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { MapPin, Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Marathon } from "@/lib/types";

declare global {
  interface Window {
    naver: any;
  }
}

export default function DetailMap({ marathon }: { marathon: Marathon }) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isInternational = marathon.location_country !== "대한민국";
  const lat = marathon.location_lat;
  const lng = marathon.location_lng;

  const address = marathon.location_address || null;
  const locationLabel =
    [marathon.location_region, marathon.location_area, marathon.location_place]
      .filter(Boolean)
      .join(" · ") || null;

  const naverHref =
    marathon.location_naver ||
    (marathon.location_place
      ? `https://map.naver.com/v5/search/${encodeURIComponent(marathon.location_place)}`
      : "https://map.naver.com");

  const kakaoHref = marathon.location_place
    ? `https://map.kakao.com/link/search/${encodeURIComponent(marathon.location_place)}`
    : "https://map.kakao.com";

  const googleHref =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : "https://maps.google.com";

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const initNaverMap = () => {
    if (!mapRef.current || !window.naver?.maps || !lat || !lng) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
    }
    const center = new window.naver.maps.LatLng(lat, lng);
    const map = new window.naver.maps.Map(mapRef.current, { center, zoom: 15 });
    mapInstanceRef.current = map;
    new window.naver.maps.Marker({
      position: center,
      map,
      title: address ?? "",
      icon: {
        content: `
          <div style="position:relative;width:44px;height:54px;">
            <div style="
              position:absolute;width:40px;height:40px;
              background:white;border:3px solid #f1170f;
              border-radius:50% 50% 50% 0;transform:rotate(-45deg);
              box-shadow:0 2px 8px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
            ">
              <img
                src="/icons/icon192.png"
                style="width:22px;height:22px;transform:rotate(45deg);border-radius:50%;object-fit:cover;"
                alt=""
              />
            </div>
          </div>
        `,
        anchor: new window.naver.maps.Point(20, 54),
      },
    });
  };

  useEffect(() => {
    if (isInternational) return;
    if (window.naver?.maps && mapRef.current) {
      initNaverMap();
    } else if (mapLoaded) {
      initNaverMap();
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLoaded, lat, lng, isInternational]);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="detail__box">
      <div className="detail__title">
        <MapPin className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h2 className="font-paperlogy font-semibold text-lg">대회 위치</h2>
        {lat && lng && (
          <div className="ml-auto flex gap-1.5">
            {isInternational ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={googleHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="구글 지도에서 보기 (새 탭에서 열림)"
                    className="block overflow-hidden rounded border transition-colors hover:border-brand/20"
                  >
                    <Image
                      src="/map/google-maps.webp"
                      alt="구글 지도"
                      width={28}
                      height={28}
                      className="h-7 w-7 object-cover"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-anyvid">구글 지도로 보기</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={naverHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="네이버 지도에서 보기 (새 탭에서 열림)"
                      className="block overflow-hidden rounded border"
                    >
                      <Image
                        src="/map/naver-map.webp"
                        alt="네이버 지도"
                        width={20}
                        height={20}
                        className="h-6 w-6 object-cover"
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-anyvid">네이버 지도로 보기</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={kakaoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="카카오 지도에서 보기 (새 탭에서 열림)"
                      className="block overflow-hidden rounded border"
                    >
                      <Image
                        src="/map/kakao-map.webp"
                        alt="카카오 지도"
                        width={20}
                        height={20}
                        className="h-6 w-6 object-cover"
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-anyvid">카카오 지도로 보기</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        )}
      </div>

      {/* 지도 영역 */}
      <div className="overflow-hidden">
        {lat && lng ? (
          isInternational ? (
            /* 해외: 구글 지도 iframe */
            <iframe
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              className="h-[300px] w-full border-0"
              title="대회 위치 지도"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : clientId ? (
            /* 국내: 네이버 지도 */
            <>
              <Script
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
                strategy="afterInteractive"
                onLoad={() => setMapLoaded(true)}
              />
              <div className="relative">
                <div ref={mapRef} className="h-[300px] w-full bg-gray-100" />
                {/* 길찾기 패널 */}
                <div className="absolute left-3 top-3 flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md">
                  <span className="font-anyvid text-[12px] text-gray-700">
                    길찾기
                  </span>
                  <div className="flex items-start justify-center gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-12 flex-col items-center gap-1 text-center transition-opacity hover:opacity-75"
                    >
                      <Image
                        src="/map/google-maps.webp"
                        alt="Google Maps"
                        width={28}
                        height={28}
                        className="rounded"
                      />
                      <span className="font-anyvid text-[11px] leading-none text-gray-500">
                        구글
                      </span>
                    </a>
                    {isMobile && (
                      <a
                        href={`https://tmap.co.kr/tmap2/mobile/route.jsp?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(marathon.location_place || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-12 flex-col items-center gap-1 text-center transition-opacity hover:opacity-75"
                      >
                        <Image
                          src="/map/tmap.webp"
                          alt="T맵"
                          width={28}
                          height={28}
                          className="rounded"
                        />
                        <span className="font-anyvid text-[11px] leading-none text-gray-500">
                          티맵
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-[300px] flex-col items-center justify-center gap-2 bg-gray-50 text-muted-foreground">
              <MapPin className="h-10 w-10" aria-hidden="true" />
              <p className="font-anyvid text-sm">
                지도 API 키가 설정되지 않았습니다.
              </p>
            </div>
          )
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center gap-2 bg-gray-50 text-muted-foreground">
            <MapPin className="h-10 w-10" aria-hidden="true" />
            <p className="font-anyvid text-sm">위치 정보가 없습니다.</p>
          </div>
        )}

        {/* 주소 있을 때: 복사 기능 포함 */}
        {address ? (
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-1.5 border-t border-gray-100 px-4 py-2.5 font-anyvid text-sm text-muted-foreground transition-colors hover:bg-gray-50"
            aria-label={`주소 복사: ${address}`}
          >
            <MapPin
              className="h-4 w-4 shrink-0 text-brand"
              aria-hidden="true"
            />
            <span>{address}</span>
            <span
              className="ml-auto flex shrink-0 items-center gap-1 text-xs"
              aria-live="polite"
              aria-atomic="true"
            >
              {copied ? (
                <>
                  <Check
                    className="h-3.5 w-3.5 text-emerald-500"
                    aria-hidden="true"
                  />
                  <span className="text-emerald-500">복사됨</span>
                </>
              ) : (
                <Copy
                  className="h-3.5 w-3.5 text-emerald-400"
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        ) : locationLabel ? (
          /* 주소 없을 때: 위치 표시만 */
          <div className="flex items-center gap-1.5 border-t border-gray-100 px-4 py-2.5 font-anyvid text-sm text-muted-foreground">
            <MapPin
              className="h-4 w-4 shrink-0 text-brand"
              aria-hidden="true"
            />
            <span>{locationLabel}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
