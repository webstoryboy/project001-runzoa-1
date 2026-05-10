"use client";

import { createContext, useContext, ReactNode } from "react";
import { Marathon } from "@/lib/types";

const MarathonsContext = createContext<Marathon[]>([]);

export function MarathonsProvider({
  children,
  initialMarathons,
}: {
  children: ReactNode;
  initialMarathons: Marathon[];
}) {
  return (
    <MarathonsContext.Provider value={initialMarathons}>
      {children}
    </MarathonsContext.Provider>
  );
}

export function useMarathons() {
  return useContext(MarathonsContext);
}
