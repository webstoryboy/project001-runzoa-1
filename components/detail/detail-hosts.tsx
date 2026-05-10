import { Marathon } from "@/lib/types";
import {
  Building2,
  Camera,
  Ghost,
  ExternalLink,
  Globe,
  Handshake,
  Mail,
  Phone,
} from "lucide-react";

export default function DetailHosts({ marathon }: { marathon: Marathon }) {
  const isEmpty =
    !marathon.hosts_organizer &&
    !marathon.hosts_manager &&
    !marathon.hosts_email &&
    !marathon.hosts_phone &&
    !marathon.event_site &&
    !marathon.sns_instagram;

  const instagramHref = marathon.sns_instagram
    ? marathon.sns_instagram.startsWith("http")
      ? marathon.sns_instagram
      : `https://www.instagram.com/${marathon.sns_instagram.replace(/^@/, "")}`
    : null;

  const instagramLabel = marathon.sns_instagram
    ? marathon.sns_instagram.startsWith("http")
      ? marathon.sns_instagram
      : marathon.sns_instagram.startsWith("@")
        ? marathon.sns_instagram
        : `@${marathon.sns_instagram}`
    : null;

  return (
    <div className="detail__box">
      <div className="detail__title">
        <Building2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <h2 className="font-paperlogy text-lg font-semibold">주최/주관</h2>
      </div>

      {isEmpty ? (
        <div className="p-4 md:p-6">
          <div className="text-center py-12 text-muted-foreground text-sm font-anyvid border border-dashed rounded">
            <Ghost
              className="w-14 h-14 text-brand/20 mx-auto mb-2"
              aria-hidden="true"
            />
            주최/주관 정보가 없습니다.
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-6">
          <ul
            className="space-y-3 font-anyvid text-sm"
            aria-label="주최/주관 정보"
          >
            {marathon.hosts_organizer && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Building2 className="h-4 w-4 shrink-0 text-rose-500" />
                </span>
                <span className="w-12 shrink-0">주최</span>
                <span className="flex-1 break-keep text-muted-foreground">
                  {marathon.hosts_organizer}
                </span>
              </li>
            )}

            {marathon.hosts_manager && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Handshake className="h-4 w-4 shrink-0 text-orange-500" />
                </span>
                <span className="w-12 shrink-0">주관</span>
                <span className="flex-1 break-keep text-muted-foreground">
                  {marathon.hosts_manager}
                </span>
              </li>
            )}

            {marathon.hosts_email && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                </span>
                <span className="w-12 shrink-0">이메일</span>
                <a
                  href={`mailto:${marathon.hosts_email}`}
                  className="flex-1 break-all text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
                >
                  {marathon.hosts_email}
                </a>
              </li>
            )}

            {marathon.hosts_phone && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
                </span>
                <span className="w-12 shrink-0">연락처</span>
                <a
                  href={`tel:${marathon.hosts_phone.replace(/-/g, "")}`}
                  className="flex-1 text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
                >
                  {marathon.hosts_phone}
                </a>
              </li>
            )}

            {marathon.event_site && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Globe className="h-4 w-4 shrink-0 text-sky-500" />
                </span>
                <span className="w-12 shrink-0">사이트</span>
                <a
                  href={marathon.event_site}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="공식 사이트 (새 탭에서 열림)"
                  className="flex flex-1 items-center gap-1 break-all text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
                >
                  공식 사이트
                  <ExternalLink
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )}

            {instagramHref && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5" aria-hidden="true">
                  <Camera className="h-4 w-4 shrink-0 text-pink-500" />
                </span>
                <span className="w-12 shrink-0">인스타</span>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${instagramLabel} 인스타그램 (새 탭에서 열림)`}
                  className="flex flex-1 items-center gap-1 break-all text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
                >
                  {instagramLabel}
                  <ExternalLink
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
