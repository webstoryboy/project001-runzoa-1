"use client";

import { useEffect, useState } from "react";

interface UseDialogCountdownOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startDelayMs?: number;
  countdownSeconds?: number;
}

export function useDialogCountdown({
  open,
  onOpenChange,
  startDelayMs = 3000,
  countdownSeconds = 5,
}: UseDialogCountdownOptions) {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      setCountdown(null);
      return;
    }

    const countdownStartTimer = window.setTimeout(() => {
      setCountdown(countdownSeconds);
    }, startDelayMs);

    let countdownInterval: number | undefined;
    let autoCloseTimer: number | undefined;

    const autoCloseStartTimer = window.setTimeout(() => {
      countdownInterval = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) return 1;
          return prev - 1;
        });
      }, 1000);

      autoCloseTimer = window.setTimeout(() => {
        onOpenChange(false);
      }, countdownSeconds * 1000);
    }, startDelayMs);

    return () => {
      window.clearTimeout(countdownStartTimer);
      window.clearTimeout(autoCloseStartTimer);
      if (countdownInterval) window.clearInterval(countdownInterval);
      if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
    };
  }, [countdownSeconds, onOpenChange, open, startDelayMs]);

  return countdown;
}
