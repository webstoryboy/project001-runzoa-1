"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminUserMenu } from "@/lib/menu";

export function AdminSidebarUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* 사용자 정보 트리거 */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-gray-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="/face/face01.webp"
                  alt="관리자"
                  referrerPolicy="no-referrer"
                />

                <AvatarFallback className="rounded-lg bg-brand/10 text-brand font-semibold">
                  w
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                <span className="truncate font-anyvid">관리자</span>
                <span className="font-nanumNeo text-muted-foreground truncate text-xs">
                  admin@mail.com
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* 드롭다운 메뉴 */}
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* 관리자 메뉴 항목 */}
            <DropdownMenuGroup>
              {adminUserMenu.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <item.icon />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* 로그아웃 */}
            <DropdownMenuItem variant="destructive">
              <LogOut />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
