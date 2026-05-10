import {
  Building2,
  Handshake,
  Mail,
  Phone,
  Camera,
  ExternalLink,
} from "lucide-react";

export default function DetailHosts() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <Building2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <h3 className="font-paperlogy text-lg font-semibold">주최/주관</h3>
      </div>

      <div className="p-4 md:p-6">
        <ul className="space-y-3 font-anyvid text-sm" aria-label="주최/주관 정보">
          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Building2 className="h-4 w-4 shrink-0 text-rose-500" />
            </span>
            <span className="w-12 shrink-0">주최</span>
            <span className="flex-1 break-keep text-muted-foreground">
              세이브더칠드런
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Handshake className="h-4 w-4 shrink-0 text-orange-500" />
            </span>
            <span className="w-12 shrink-0">주관</span>
            <span className="flex-1 break-keep text-muted-foreground">
              국제어린마라톤 운영사무국
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Mail className="h-4 w-4 shrink-0 text-blue-500" />
            </span>
            <span className="w-12 shrink-0">이메일</span>
            <a
              href="mailto:run@savechildren.or.kr"
              className="flex-1 break-all text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              run@savechildren.or.kr
            </a>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
            </span>
            <span className="w-12 shrink-0">연락처</span>
            <a
              href="tel:023652015"
              className="flex-1 text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              02-365-2015
            </a>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5" aria-hidden="true">
              <Camera className="h-4 w-4 shrink-0 text-pink-500" />
            </span>
            <span className="w-12 shrink-0">인스타</span>
            <a
              href="https://www.instagram.com/savechildrenkr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="@savechildrenkr 인스타그램 (새 탭에서 열림)"
              className="flex flex-1 items-center gap-1 break-all text-muted-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              @savechildrenkr
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
