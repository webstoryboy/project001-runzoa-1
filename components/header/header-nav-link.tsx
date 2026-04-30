"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { type MenuItem } from "@/lib/menu";

export default function HeaderNavLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <SheetClose asChild>
      <Link
        href={item.href}
        prefetch
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center justify-between gap-3 px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "bg-brand/5 text-brand"
            : "text-muted-foreground hover:bg-brand/10 hover:text-brand",
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="font-anyvid">{item.label}</span>
        </div>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </SheetClose>
  );
}
