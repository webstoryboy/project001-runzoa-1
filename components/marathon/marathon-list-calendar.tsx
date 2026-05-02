import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MarathonListCalendar() {
  return (
    <section aria-label="달력" className="marathon__list__calendar">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-slate-50/90">
          <div className="py-3 text-center text-sm text-slate-600 font-anyvid">
            월
          </div>
          <div className="py-3 text-center text-sm text-slate-600 font-anyvid">
            화
          </div>
          <div className="py-3 text-center text-sm text-slate-600 font-anyvid">
            수
          </div>
          <div className="py-3 text-center text-sm text-slate-600 font-anyvid">
            목
          </div>
          <div className="py-3 text-center text-sm text-slate-600 font-anyvid">
            금
          </div>
          <div className="py-3 text-center text-sm text-blue-600 font-anyvid">
            토
          </div>
          <div className="py-3 text-center text-sm text-red-600 font-anyvid">
            일
          </div>
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-7">
          {/* 1 */}
          <div className="min-h-[112px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs bg-brand font-anyvid font-semibold text-white mb-1">
              1
            </span>
            <div className="flex flex-col gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="2026 성남 마라톤 (접수중) - 새 탭에서 열림"
                  >
                    <div className="rounded px-1.5 py-0.5 bg-red-500 hover:bg-red-600 transition-colors">
                      <p
                        className="truncate text-xs leading-tight font-anyvid text-white"
                        aria-hidden="true"
                      >
                        2026 성남 마라톤
                      </p>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p className="text-xs">
                    <span className="mr-1 font-semibold">(접수중)</span>
                    2026 성남 마라톤
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="2026 세븐 브릿지 투어 (접수중) - 새 탭에서 열림"
                  >
                    <div className="rounded px-1.5 py-0.5 bg-blue-500 hover:bg-blue-600 transition-colors">
                      <p
                        className="truncate text-xs leading-tight font-anyvid text-white"
                        aria-hidden="true"
                      >
                        2026 세븐 브릿지 투어
                      </p>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p className="text-xs">
                    <span className="mr-1 font-semibold">(접수중)</span>
                    2026 세븐 브릿지 투어
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="제1회 구례지리산 봄길 마라톤대회 (접수중) - 새 탭에서 열림"
                  >
                    <div className="rounded px-1.5 py-0.5 bg-blue-500 hover:bg-blue-600 transition-colors">
                      <p
                        className="truncate text-xs leading-tight font-anyvid text-white"
                        aria-hidden="true"
                      >
                        제1회 구례지리산 봄길 마라톤대회
                      </p>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p className="text-xs">
                    <span className="mr-1 font-semibold">(접수중)</span>
                    제1회 구례지리산 봄길 마라톤대회
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {/* 2 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              2
            </span>
          </div>
          {/* 3 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              3
            </span>
          </div>
          {/* 4 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              4
            </span>
          </div>
          {/* 5 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              5
            </span>
          </div>
          {/* 6 토 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-blue-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-blue-600 font-anyvid">
              6
            </span>
          </div>
          {/* 7 일 */}
          <div className="min-h-[125px] border-b border-gray-100 bg-red-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-red-600 font-anyvid">
              7
            </span>
          </div>
          {/* 8 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              8
            </span>
          </div>
          {/* 9 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              9
            </span>
          </div>
          {/* 10 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              10
            </span>
          </div>
          {/* 11 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              11
            </span>
          </div>
          {/* 12 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              12
            </span>
          </div>
          {/* 13 토 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-blue-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-blue-600 font-anyvid">
              13
            </span>
          </div>
          {/* 14 일 */}
          <div className="min-h-[125px] border-b border-gray-100 bg-red-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-red-600 font-anyvid">
              14
            </span>
          </div>
          {/* 15 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              15
            </span>
          </div>
          {/* 16 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              16
            </span>
          </div>
          {/* 17 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              17
            </span>
          </div>
          {/* 18 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              18
            </span>
          </div>
          {/* 19 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              19
            </span>
          </div>
          {/* 20 토 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-blue-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-blue-600 font-anyvid">
              20
            </span>
          </div>
          {/* 21 일 */}
          <div className="min-h-[125px] border-b border-gray-100 bg-red-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-red-600 font-anyvid">
              21
            </span>
          </div>
          {/* 22 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              22
            </span>
          </div>
          {/* 23 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              23
            </span>
          </div>
          {/* 24 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              24
            </span>
          </div>
          {/* 25 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              25
            </span>
          </div>
          {/* 26 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              26
            </span>
          </div>
          {/* 27 토 */}
          <div className="min-h-[125px] border-r border-b border-gray-100 bg-blue-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-blue-600 font-anyvid">
              27
            </span>
          </div>
          {/* 28 일 */}
          <div className="min-h-[125px] border-b border-red-100 bg-red-50/35 p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-red-600 font-anyvid">
              28
            </span>
          </div>
          {/* 29 */}
          <div className="min-h-[125px] border-r border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              29
            </span>
          </div>
          {/* 30 */}
          <div className="min-h-[125px] border-r border-gray-100 bg-white p-1">
            <span className="flex mx-auto h-6 w-6 items-center justify-center rounded-full text-xs text-slate-700 font-anyvid">
              30
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
