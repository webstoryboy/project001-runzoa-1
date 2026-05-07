"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import DialogWelcome from "@/components/dialog/dialog-welcome";

export default function AuthNotifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    const login = searchParams.get("login");
    const error = searchParams.get("error");

    if (login === "first") {
      setWelcomeOpen(true);
    } else if (login === "success") {
      toast.success("로그인되었습니다.");
    } else if (error === "deleted_account") {
      toast.error("탈퇴한 계정입니다.");
    } else if (error === "error_code") {
      toast.error("로그인 중 오류가 발생했습니다.");
    }

    if (login || error) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      params.delete("error");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [searchParams, pathname, router]);

  return <DialogWelcome open={welcomeOpen} onOpenChange={setWelcomeOpen} />;
}
