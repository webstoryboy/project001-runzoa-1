import { Asterisk, ClipboardList, Crown, Footprints } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DetailRegistration() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <ClipboardList className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">접수 정보</h3>
        <Badge variant="outline" className="ml-auto font-anyvid">
          접수중
        </Badge>
      </div>

      {/* 데어터 없을때 */}
      <div className="p-4 md:p-6 hidden">
        <div className="text-center py-12 text-muted-foreground text-sm font-anyvid border border-dashed rounded">
          <Crown className="w-14 h-14 text-brand/20 mx-auto mb-2" aria-hidden="true" />
          접수 정보가 없습니다.
        </div>
      </div>

      {/* 데어터 있을때 */}
      <div className="space-y-4 font-anyvid text-sm text-muted-foreground m-4 md:m-6">
        <div className="space-y-0.5 break-keep">
          <p className="flex gap-1 items-center">
            <Asterisk className="w-4 h-4 text-red-400" aria-hidden="true" />
            접수 시작 : 2026년 4월 8일(수) 08:00
          </p>
          <p className="flex gap-1 items-center">
            <Asterisk className="w-4 h-4 text-blue-400" aria-hidden="true" />
            접수 마감 : 2026년 4월 8일(수)
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm font-anyvid text-muted-foreground">
            <caption className="sr-only">종목별 참가비</caption>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th scope="col" className="px-3 py-2 text-left">
                  <Footprints className="inline h-3.5 w-3.5 mr-1" aria-hidden="true" />
                  구분
                </th>
                <th scope="col" className="px-3 py-2 text-right">
                  금액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2">HALF</td>
                <td className="px-3 py-2 text-right">50,000원</td>
              </tr>
              <tr className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2">10km</td>
                <td className="px-3 py-2 text-right">40,000원</td>
              </tr>
              <tr className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2">5km</td>
                <td className="px-3 py-2 text-right">30,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
