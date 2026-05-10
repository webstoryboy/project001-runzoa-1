"use client";

import Link from "next/link";
import { TentTree } from "lucide-react";
import { APP_ENG_NAME } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogSiteLinksProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const siteLinks = [
  {
    name: "runzoa",
    label: "런조아",
    description: "마라톤 대회 정보와 접수 일정을 확인하세요.",
    href: "https://runzoa.com",
    color: "red",
  },
  {
    name: "eventzoa",
    label: "이벤트조아",
    description: "국내외 행사와 축제 정보를 둘러보세요.",
    href: "https://eventzoa.com",
    color: "blue",
  },
  {
    name: "kcalzoa",
    label: "칼로리조아",
    description: "칼로리와 식단 정보를 빠르게 찾아보세요.",
    href: "https://kcalzoa.com",
    color: "green",
  },
];

const colorMap: Record<string, { card: string; name: string; icon: string }> = {
  red: {
    card: "border-red-200 bg-red-50 hover:bg-red-100/80",
    name: "text-red-600",
    icon: "text-red-400",
  },
  blue: {
    card: "border-blue-200 bg-blue-50 hover:bg-blue-100/80",
    name: "text-blue-600",
    icon: "text-blue-400",
  },
  green: {
    card: "border-green-200 bg-green-50 hover:bg-green-100/80",
    name: "text-green-600",
    icon: "text-green-400",
  },
};

export default function DialogSiteLinks({
  open,
  onOpenChange,
}: DialogSiteLinksProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 font-paperlogy uppercase font-extrabold text-brand text-xl">
                <TentTree className="size-9" />
                {APP_ENG_NAME}
              </div>
            </div>
            <DialogTitle className="font-paperlogy text-xl mt-2">
              ZOA 네트워크로 이동합니다.
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-center font-anyvid break-keep">
            조아 시리즈 사이트입니다. 원하는 서비스를 선택해주세요!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {siteLinks.map((site) => {
            const c = colorMap[site.color];
            return (
              <Link
                key={site.name}
                href={site.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => onOpenChange(false)}
                className={`flex items-center justify-center rounded border px-4 py-3 transition-colors ${c.card}`}
              >
                <div className="flex items-center justify-center gap-0.5">
                  <span
                    className={`font-paperlogy text-base font-black uppercase ${c.name}`}
                  >
                    {site.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
