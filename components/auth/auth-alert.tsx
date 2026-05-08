"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import DialogWelcome from "@/components/dialog/dialog-alert-welcome";
import DialogLoginSuccess from "@/components/dialog/dialog-alert-login";
import DialogLogout from "@/components/dialog/dialog-alert-logout";
import DialogDeleted from "@/components/dialog/dialog-alert-deleted";
import DialogError from "@/components/dialog/dialog-alert-error";

export default function AuthAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deletedOpen, setDeletedOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const login = searchParams.get("login");
    const error = searchParams.get("error");
    const logout = searchParams.get("logout");
    const msg = searchParams.get("msg");

    if (login === "welcome") {
      setWelcomeOpen(true);
    } else if (login === "success") {
      setLoginOpen(true);
    } else if (logout === "success") {
      setLogoutOpen(true);
    } else if (error === "deleted") {
      setDeletedOpen(true);
    } else if (error === "error") {
      setErrorMessage(msg ?? null);
      setErrorOpen(true);
    }

    if (login || error || logout) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      params.delete("error");
      params.delete("logout");
      params.delete("msg");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [searchParams, pathname, router]);

  return (
    <>
      <DialogWelcome open={welcomeOpen} onOpenChange={setWelcomeOpen} />
      <DialogLoginSuccess open={loginOpen} onOpenChange={setLoginOpen} />
      <DialogLogout open={logoutOpen} onOpenChange={setLogoutOpen} />
      <DialogDeleted open={deletedOpen} onOpenChange={setDeletedOpen} />
      <DialogError
        open={errorOpen}
        onOpenChange={setErrorOpen}
        message={errorMessage}
      />
    </>
  );
}
