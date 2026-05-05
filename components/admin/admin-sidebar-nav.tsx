"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenu } from "@/lib/menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {adminMenu.map((item) => {
          // /admin 루트는 정확히 일치, 하위 메뉴는 startsWith로 활성 여부 판단
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={isActive}
                className="
                    hover:text-brand hover:bg-brand/10
                    data-[active=true]:bg-brand
                    data-[active=true]:text-white
                  "
              >
                <Link href={item.href}>
                  {item.icon && <item.icon />}
                  <span className="font-anyvid text-sm">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
