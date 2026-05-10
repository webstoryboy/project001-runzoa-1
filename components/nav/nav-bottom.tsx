"use client";

import Link from "next/link";
import { useState } from "react";
import { TentTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { mobileMenu } from "@/lib/menu";
import { useSheet } from "@/contexts/context-sheet";

import DialogSiteLinks from "@/components/dialog/dialog-site-links";

export default function MobileNav() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsOpen } = useSheet();
  const [isSiteDialogOpen, setIsSiteDialogOpen] = useState(false);

  const getIsActive = (href: string) => {
    if (href === "#more") return false;

    if (href === "/") {
      const view = searchParams?.get("view");
      return pathname === "/" && (!view || view === "card");
    }

    if (href.startsWith("/?view=")) {
      const view = href.split("=")[1];
      return pathname === "/" && searchParams?.get("view") === view;
    }

    return pathname === href;
  };

  const handleMoreClick = (e: React.MouseEvent, href: string) => {
    if (href === "#more") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // 모바일
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileMenu.map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item.href);
            const isMore = item.href === "#more";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => isMore && handleMoreClick(e, item.href)}
                aria-label={item.label}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="font-nanumNeo">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // PC
  return (
    <>
      <nav className="fixed bottom-4 right-0 left-0 z-30 hidden justify-center pointer-events-none md:flex">
        <div className="pointer-events-auto flex items-center gap-5 rounded-full border bg-white/10 px-7 py-3 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsSiteDialogOpen(true)}
            className="cursor-pointer"
            aria-label="연결 사이트 목록 열기"
          >
            <TentTree
              className="size-4.5 shrink-0 text-brand transition-transform hover:scale-110"
              aria-hidden
            />
          </button>
          <span className="h-4 w-px shrink-0 bg-gray-200" />
          {mobileMenu.map((item) => {
            const isActive = getIsActive(item.href);
            const isMore = item.href === "#more";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => isMore && handleMoreClick(e, item.href)}
                aria-label={item.label}
                className={cn(
                  "text-sm font-anyvid transition-colors",
                  isActive ? "text-brand" : "text-black/60 hover:text-black",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <DialogSiteLinks
        open={isSiteDialogOpen}
        onOpenChange={setIsSiteDialogOpen}
      />
    </>
  );
}
