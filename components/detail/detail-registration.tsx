import { Marathon } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Asterisk, ClipboardList, Frown, Footprints } from "lucide-react";
import { formatMarathonDatetime, getMarathonStatusVariant } from "@/lib/utils";

export default function DetailRegistration({
  marathon,
}: {
  marathon: Marathon;
}) {
  const hasPrice =
    marathon.registration_price &&
    Object.keys(marathon.registration_price).length > 0;
  const isEmpty = !marathon.registration_start_at && !hasPrice;

  return (
    <div className="detail__box">
      <div className="detail__title">
        <ClipboardList
          className="w-5 h-5 text-brand shrink-0"
          aria-hidden="true"
        />
        <h2 className="font-paperlogy font-semibold text-lg">접수 정보</h2>
        <Badge
          variant={getMarathonStatusVariant(marathon.registration_status)}
          className="ml-auto font-anyvid"
        >
          {marathon.registration_status}
        </Badge>
      </div>

      {isEmpty ? (
        <div className="p-4 md:p-6">
          <div className="text-center py-12 text-muted-foreground text-sm font-anyvid border border-dashed rounded">
            <Frown
              className="w-14 h-14 text-brand/20 mx-auto mb-2"
              aria-hidden="true"
            />
            접수 정보가 없습니다.
          </div>
        </div>
      ) : (
        <div className="space-y-4 font-anyvid text-sm text-muted-foreground m-4 md:m-6">
          {marathon.registration_start_at && (
            <div className="space-y-0.5 break-keep">
              <p className="flex gap-1 items-center">
                <Asterisk className="w-4 h-4 text-red-400" aria-hidden="true" />
                접수 시작 :{" "}
                {formatMarathonDatetime(marathon.registration_start_at)}
              </p>
              <p className="flex gap-1 items-center">
                <Asterisk
                  className="w-4 h-4 text-blue-400"
                  aria-hidden="true"
                />
                접수 마감 :{" "}
                {marathon.registration_end_at
                  ? formatMarathonDatetime(marathon.registration_end_at)
                  : "선착순 마감"}
              </p>
            </div>
          )}

          {hasPrice && (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm font-anyvid text-muted-foreground">
                <caption className="sr-only">종목별 참가비</caption>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th scope="col" className="px-3 py-2 text-left">
                      <Footprints
                        className="inline h-3.5 w-3.5 mr-1"
                        aria-hidden="true"
                      />
                      구분
                    </th>
                    <th scope="col" className="px-3 py-2 text-right">
                      금액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(marathon.registration_price!).map(
                    ([course, price]) => (
                      <tr
                        key={course}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-3 py-2">{course}</td>
                        <td className="px-3 py-2 text-right">
                          {price.toLocaleString("ko-KR")}원
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
