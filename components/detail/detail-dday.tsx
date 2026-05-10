import { Marathon } from "@/lib/types";
import { CloudSun } from "lucide-react";
import { getMarathonDDay, getMarathonDDayMessage } from "@/lib/utils";

export default function DetailDday({ marathon }: { marathon: Marathon }) {
  const eventDday = getMarathonDDay(marathon.event_start_at);
  const regDday = getMarathonDDay(
    marathon.registration_end_at ?? marathon.registration_start_at,
  );

  const eventMsg = getMarathonDDayMessage(eventDday);
  const regMsg = getMarathonDDayMessage(regDday);

  return (
    <div className="detail__box">
      <div className="detail__title">
        <CloudSun className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h2 className="font-paperlogy font-semibold text-lg">디데이</h2>
      </div>

      <div className="flex flex-col gap-2 p-4 md:p-6">
        {/* 대회 D-Day */}
        {marathon.event_start_at && (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-brand/20 bg-brand/5 px-4 py-4 text-center">
            <p className="mb-2 font-anyvid text-xs text-red-600">대회까지</p>
            <p className="font-nanumNeo text-3xl font-bold leading-none text-brand mb-2">
              {eventDday}
            </p>
            <p className="font-anyvid text-[13px] text-red-500">
              {eventMsg.text} <span aria-hidden="true">{eventMsg.emoji}</span>
            </p>
          </div>
        )}

        {/* 접수 D-Day */}
        {(marathon.registration_start_at || marathon.registration_end_at) &&
          regDday !== "종료" && (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 px-4 py-4 text-center">
              <p className="mb-2 font-anyvid text-xs text-indigo-600">
                접수까지
              </p>
              <p className="font-nanumNeo text-3xl font-bold leading-none text-indigo-500 mb-2">
                {regDday}
              </p>
              <p className="font-anyvid text-[13px] text-indigo-500">
                {regMsg.text} <span aria-hidden="true">{regMsg.emoji}</span>
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
