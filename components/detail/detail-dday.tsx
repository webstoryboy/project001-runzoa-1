import { Building2 } from "lucide-react";

export default function DetailDday() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <Building2 className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">디데이</h3>
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-6">
        <div className="flex flex-col items-center rounded-xl border border-dashed border-brand/20 bg-brand/5 px-4 py-4 text-center">
          <p className="mb-2 font-anyvid text-xs text-red-600">대회까지</p>
          <p className="font-nanumNeo text-3xl font-bold leading-none text-brand mb-2">
            D-5
          </p>
          <p className="font-anyvid text-[13px] text-red-500">
            몇 일 남지 않았어요{" "}
            <span aria-hidden="true">🏃‍♂️</span>
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 px-4 py-4 text-center">
          <p className="mb-2 font-anyvid text-xs text-indigo-600">접수까지</p>
          <p className="font-nanumNeo text-3xl font-bold leading-none text-indigo-500 mb-2">
            D-22
          </p>
          <p className="font-anyvid text-[13px] text-indigo-500">
            아쉽게 종료됐어요{" "}
            <span aria-hidden="true">🥵</span>
          </p>
        </div>
      </div>
    </div>
  );
}
