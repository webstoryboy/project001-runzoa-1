"use client";

import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/contexts/context-sheet";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import DialogLogin from "@/components/dialog/dialog-login";

interface HeaderSheetProps {
  user: User | null;
}

export default function HeaderSheet({ user }: HeaderSheetProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const { setIsOpen } = useSheet();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsOpen(false);
    toast.success("로그아웃되었습니다.");
    router.refresh();
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
              onClick={() => setLoginOpen(true)}
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

      <DialogLogin open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
