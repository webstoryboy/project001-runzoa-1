import Link from "next/link";
import { AlertCircle, MessageSquare, FilePen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DetailReport() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      role="group"
      aria-label="문의 및 신고"
    >
      <Button
        variant="ghost"
        className="h-11 w-full gap-2 rounded-full font-anyvid"
        asChild
      >
        <Link href="/contact?type=complaint">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          불편신고
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="h-11 w-full gap-2 rounded-full font-anyvid"
        asChild
      >
        <Link href="/contact?type=inquiry">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          문의사항
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="h-11 w-full gap-2 rounded-full font-anyvid"
        asChild
      >
        <Link href="/contact?type=correction">
          <FilePen className="h-4 w-4" aria-hidden="true" />
          수정요청
        </Link>
      </Button>
    </div>
  );
}
