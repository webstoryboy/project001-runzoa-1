"use client";

import { TentTree } from "lucide-react";
import { APP_ENG_NAME, APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogWelcomeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogWelcome({
  open,
  onOpenChange,
}: DialogWelcomeProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 font-paperlogy uppercase font-extrabold text-brand text-xl">
              <TentTree className="size-9" />
              {APP_ENG_NAME}
            </div>
            <DialogTitle className="font-paperlogy text-xl mt-2 text-center">
              🎉 가입을 축하드립니다!
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-center font-anyvid break-keep pt-1">
            {APP_NAME}의 새 멤버가 되신 것을 환영합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex justify-center items-center py-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-brand/20" style={{ animation: "scale-pulse 2s ease-in-out infinite" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-brand/10 animate-pulse" />
          </div>

          <div className="relative animate-bounce">
            <svg width="64" height="68" viewBox="0 0 8.434 9.076" xmlns="http://www.w3.org/2000/svg">
              <path d="M7878.04 5047.09c-61.25-189.53-171.62-358.84-323.01-492.31L5105.6 5971.62v291.81c0 120.76 25.42 236.91 73.96 341.49 68.76 152.55 184.91 281.41 336.88 369.24 256.55 148.51 563.96 148.51 820.51 0l1030.86-595.17c354.21-203.97 565.7-570.31 565.7-978.84 0-122.5-19.07-241.54-55.47-353.06zM5105.6 3114.82v2456.36l2125.26-1229.63zm-228.25 3664.03c-77.42-156.59-118.45-332.25-118.45-515.42V4203.46c-44.5 49.11-94.19 95.34-147.93 137.52l-1381.01 1092.1c-231.14 182.59-363.46 456.49-363.46 750.61v836.11c0 408.53 211.48 774.88 565.7 978.86 176.81 102.27 370.96 153.12 565.11 153.12 194.16 0 388.31-50.85 565.12-153.12l1054.54-609.04c-94.18-26-186.05-64.14-273.88-114.99-206.87-119.61-366.35-292.38-465.74-495.78zm2722.75-135.79c-19.07 12.72-38.72 24.85-58.94 36.41L6510.3 7274.63h-.57l-1773.94 1024.5c-462.27 266.96-1014.68 266.96-1476.95 0-410.26-236.34-673.75-639.09-728.06-1099.04-7.52-58.94-10.98-119.03-10.98-180.29V3780.48c0-534.49 276.2-1012.36 739.04-1279.32 231.14-134.05 484.81-200.51 738.47-200.51 253.67 0 507.34 66.46 738.48 200.51l23.11 13.29 346.7 199.93 2435.56 1406.44c12.13 6.94 23.68 13.88 35.25 21.39 108.63 65.87 205.7 143.87 291.23 231.71 138.67 142.72 246.15 310.87 316.07 496.35 62.98 165.27 96.5 344.39 96.5 529.88 0 510.8-253.1 970.75-680.11 1242.91" style={{fill:"#100f0d"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
              <path d="M5616.97 5275.33V3410.09l-511.37-295.27v2456.36l511.37-295.85" style={{fill:"#ccccc9"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
              <path d="m7230.86 4341.55-1613.89-931.46v1865.24zM3917.57 6834.9c-182.01 0-329.94 147.93-329.94 329.94 0 163.53 119.04 298.74 275.63 324.17-15.03-19.07-23.69-43.34-23.69-69.34 0-62.99 51.42-114.42 114.4-114.42 62.99 0 114.42 51.43 114.42 114.42 0 15.02-2.89 28.89-7.51 41.6 110.36-53.15 186.06-165.84 186.06-296.43 0-182.01-147.35-329.94-329.37-329.94zm644.86 1163.76c-176.81 102.27-370.96 153.12-565.12 153.12-194.15 0-388.3-50.85-565.11-153.12-354.22-203.98-565.7-570.33-565.7-978.86v-836.11c0-294.12 132.32-568.02 363.46-750.61l1381.01-1092.1c53.74-42.18 103.43-88.41 147.93-137.52v2059.97c0 183.17 41.03 358.83 118.45 515.42 99.39 203.4 258.87 376.17 465.74 495.78 87.83 50.85 179.7 88.99 273.88 114.99l-1054.54 609.04" style={{fill:"#fff"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
              <path d="M7933.75 5400.15c0-122.5-19.07-241.54-55.47-353.06L5179.8 6604.92c68.76 152.55 184.91 281.41 336.88 369.24 256.55 148.51 563.96 148.51 820.52 0l1030.86-595.17c354.21-203.97 565.69-570.31 565.69-978.84" style={{fill:"#f8b831"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
              <path d="M4246.94 7164.84c0-182.01-147.35-329.94-329.37-329.94-182.01 0-329.94 147.93-329.94 329.94 0 163.53 119.04 298.74 275.63 324.17-15.03-19.07-23.69-43.34-23.69-69.34 0-62.99 51.42-114.42 114.4-114.42 62.99 0 114.42 51.43 114.42 114.42 0 15.02-2.89 28.89-7.51 41.6 110.36-53.15 186.06-165.84 186.06-296.43" style={{fill:"#100f0d"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
              <path d="M7878.28 5047.09c-61.25-189.53-171.62-358.84-323.01-492.31L5105.84 5971.62v291.81c0 120.76 25.42 236.91 73.96 341.49l2698.48-1557.83" style={{fill:"#d0580a"}} transform="matrix(.00146 0 0 -.00146 -3.69 12.445)"/>
            </svg>
          </div>

          <span className="absolute top-2 left-[30%] text-lg animate-spin" style={{animationDuration:"3s"}}>✨</span>
          <span className="absolute top-2 right-[30%] text-lg animate-spin" style={{animationDuration:"4s", animationDirection:"reverse"}}>⭐</span>
          <span className="absolute bottom-2 left-[35%] text-sm animate-bounce" style={{animationDelay:"0.3s"}}>🎊</span>
          <span className="absolute bottom-2 right-[35%] text-sm animate-bounce" style={{animationDelay:"0.6s"}}>🎉</span>
        </div>

        <Button
          variant="destructive"
          size="lg"
          onClick={() => onOpenChange(false)}
        >
          시작하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
