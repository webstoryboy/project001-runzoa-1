"use client";

import type { User } from "@supabase/supabase-js";
import { useLogout } from "@/contexts/context-logout";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/contexts/context-login";
import { useSheet } from "@/contexts/context-sheet";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface HeaderSheetProps {
  user: User | null;
}

export default function HeaderSheet({ user }: HeaderSheetProps) {
  const { openLogin } = useLogin();
  const { setIsOpen } = useSheet();
  const { logout } = useLogout();

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <>
      <SheetHeader className="border-b border-brand/10">
        <SheetTitle className="font-paperlogy font-semibold text-xl uppercase text-brand flex items-center gap-2">
          {APP_NAME}
          {user ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleLogout}
              className="text-[12px] rounded-full px-2.5 font-paperlogy h-6"
            >
              로그아웃
            </Button>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={openLogin}
              className="text-[12px] rounded-full px-2.5 font-paperlogy h-6"
            >
              로그인
            </Button>
          )}
        </SheetTitle>
        <SheetDescription className="sr-only">
          메뉴 및 사용자 정보를 확인할 수 있습니다.
        </SheetDescription>
      </SheetHeader>
    </>
  );
}
