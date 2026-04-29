"use client";

import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import HeaderSheet from "./header-sheet";
import HeaderUser from "./header-user";
import HeaderNav from "./header-nav";
import HeaderInfo from "./header-info";

export default function HeaderRight() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="메뉴 열기"
          className="h-11 w-11 rounded-full hover:border hover:border-brand bg-brand text-white hover:bg-white hover:text-brand overflow-hidden p-0"
        >
          <Medal className="w-5 h-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <HeaderSheet />
        <HeaderUser />
        <HeaderNav />
        <HeaderInfo />
      </SheetContent>
    </Sheet>
  );
}
