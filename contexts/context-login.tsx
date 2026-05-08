"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import DialogLogin from "@/components/dialog/dialog-login";

interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  setIsLoginOpen: (open: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <LoginContext.Provider
      value={{ isLoginOpen, openLogin, closeLogin, setIsLoginOpen }}
    >
      {children}
      <DialogLogin open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);

  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }

  return context;
}
