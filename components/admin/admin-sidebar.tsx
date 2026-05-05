"use client";

import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { AdminSidebarNav } from "./admin-sidebar-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminSidebarUser } from "./admin-sidebar-user";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* 로고 및 앱명 */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand/20">
                  <Image
                    src="/icons/favicon.svg"
                    alt="logo"
                    width={80}
                    height={80}
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                  <span className="truncate whitespace-nowrap text-xl font-semibold font-paperlogy">
                    {APP_NAME} 관리자
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* 내비게이션 메뉴 */}
      <SidebarContent>
        <AdminSidebarNav />
      </SidebarContent>
      {/* 사용자 정보 및 로그아웃 */}
      <SidebarFooter>
        <AdminSidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
