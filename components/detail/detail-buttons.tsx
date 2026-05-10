import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { APP_EVENTZOA_URL, APP_KCALZOA_URL } from "@/lib/constants";

interface DetailButtonsProps {
  event_site: string | null;
}

export default function DetailButtons({ event_site }: DetailButtonsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div>
        <Button
          variant="ghost"
          className="h-11 w-full gap-2 rounded-full"
          asChild
        >
          <Link
            href={APP_KCALZOA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="칼로리 사이트 바로가기 (새 탭에서 열림)"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            칼로리 사이트 바로가기
          </Link>
        </Button>
      </div>
      <div>
        <Button
          variant="ghost"
          className="h-11 w-full gap-2 rounded-full"
          asChild
        >
          <Link
            href={APP_EVENTZOA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="이벤트 사이트 바로가기 (새 탭에서 열림)"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            이벤트 사이트 바로가기
          </Link>
        </Button>
      </div>
      {event_site && (
        <div>
          <Button
            variant="destructive"
            className="h-11 w-full gap-2 rounded-full"
            asChild
          >
            <Link
              href={event_site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="공식 사이트 바로가기 (새 탭에서 열림)"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              공식 사이트 바로가기
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
