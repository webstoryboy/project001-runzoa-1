import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginProvider } from "@/contexts/context-login";
import { SheetProvider } from "@/contexts/context-sheet";
import { LogoutProvider } from "@/contexts/context-logout";
import { MarathonsProvider } from "@/contexts/context-marathons";
import { fetchAllMarathons } from "@/lib/marathons";
import {
  APP_DESCRIPTION,
  APP_KEYWORDS,
  APP_NAME,
  APP_SITE_URL,
  APP_SLOGAN,
} from "@/lib/constants";

import AuthAlert from "@/components/auth/auth-alert";

const anyvid = localFont({
  variable: "--font-anyvid",
  display: "swap",
  preload: false,
  src: [
    { path: "../public/fonts/anyvid.woff2", weight: "400", style: "normal" },
  ],
});

const nanumSquare = localFont({
  variable: "--font-nanumNeo",
  display: "optional",
  preload: false,
  src: [
    {
      path: "../public/fonts/nanum-square-neo.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

const paperlogy = localFont({
  variable: "--font-paperlogy",
  display: "optional",
  preload: false,
  src: [
    {
      path: "../public/fonts/paperlogy-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/paperlogy-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/paperlogy-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  authors: [{ name: "webstoryboy", url: "https://webstoryboy.com" }],
  metadataBase: new URL(APP_SITE_URL),
  alternates: { canonical: APP_SITE_URL },
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: APP_SITE_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_SITE_URL}/runzoa.webp`,
        width: 1200,
        height: 800,
        alt: `${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@runzoa",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_SITE_URL}/runzoa.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marathons = await fetchAllMarathons();

  return (
    <html lang="ko">
      <body
        className={`${anyvid.variable} ${nanumSquare.variable} ${paperlogy.variable}`}
      >
        <div id="splash" role="status" aria-label="로딩 중" aria-live="polite">
          <img
            src="/icons/favicon.svg"
            alt=""
            width={72}
            height={78}
            loading="eager"
            className="splash__logo"
          />
          <span className="splash__name font-paperlogy">{APP_NAME}</span>
          <span className="splash__slogan font-anyvid text-muted-foreground">
            {APP_SLOGAN}
          </span>
        </div>
        <MarathonsProvider initialMarathons={marathons}>
          <TooltipProvider>
            <LoginProvider>
              <SheetProvider>
                <LogoutProvider>
                  {children}
                  <Suspense>
                    <AuthAlert />
                  </Suspense>
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      classNames: {
                        title: "font-anyvid",
                        description: "font-anyvid",
                      },
                    }}
                  />
                </LogoutProvider>
              </SheetProvider>
            </LoginProvider>
          </TooltipProvider>
        </MarathonsProvider>
      </body>
    </html>
  );
}
