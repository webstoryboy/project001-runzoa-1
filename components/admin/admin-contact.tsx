import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, LucideMessageSquareCode } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminContact() {
  return (
    <div className="admin__container">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold font-paperlogy">문의사항</h1>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          문의, 불편신고, 수정요청 내용을 확인하고 빠르게 대응하세요.
        </p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            전체 문의
          </p>
          <p className="text-2xl font-semibold font-paperlogy">5</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">대기중</p>
          <p className="text-2xl font-semibold font-paperlogy text-red-600">
            1
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">처리중</p>
          <p className="text-2xl font-semibold font-paperlogy text-yellow-600">
            1
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            처리완료
          </p>
          <p className="text-2xl font-semibold font-paperlogy text-green-600">
            2
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">종료됨</p>
          <p className="text-2xl font-semibold font-paperlogy text-muted-foreground">
            3
          </p>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[80px] text-center">유형</TableHead>
              <TableHead>문의 내용</TableHead>
              <TableHead className="w-[75px] text-center">상태</TableHead>
              <TableHead className="w-[75px] text-center">답변</TableHead>
              <TableHead className="w-[150px] text-center">문의일</TableHead>
              <TableHead className="w-[60px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 데이터 없을 때 */}
            {/* <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <div className="flex flex-col items-center gap-2">
                  <LucideMessageSquareCode className="w-8 h-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    등록된 문의가 없습니다.
                  </p>
                </div>
              </TableCell>
            </TableRow> */}

            <TableRow className="hover:bg-gray-50">
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">불편신고</TableCell>
              <TableCell className="max-w-[300px] truncate">
                담당자님, 안녕하세요. 달려용,인 2026 RUN FESTA 운영진입니다.
                먼저 저희 마라톤 대회 등록에 도움 주셔서 진심으로 감사드립니다.
                다름이 아니라, 대회 정보 중 수정 요청드릴 사항이 있어
                연락드립니다. 현재 대회 등록 시 '대회 소개' 항목이 300자로
                제한되어 있는데, 저희 대회는 다양한 프로그램과 이벤트가 포함되어
                있어 더 긴 설명이 필요합니다. 혹시 '대회 소개' 항목의 글자 수
                제한을 500자로 늘려주실 수 있을까요? 이렇게 되면 참가자들에게 더
                풍부한 정보를 제공할 수 있을 것 같습니다. 바쁘신 와중에 번거롭게
                해드려 죄송하지만, 긍정적으로 검토해주시면 정말 감사하겠습니다.
                좋은 하루 보내세요!
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="destructive">대기중</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">미답변</Badge>
              </TableCell>
              <TableCell className="text-center">2024-06-15 14:30</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-center">문의사항</TableCell>
              <TableCell className="max-w-[300px] truncate">
                담당자님, 안녕하세요. 달려용,인 2026 RUN FESTA 운영진입니다.
                먼저 저희 마라톤 대회 등록에 도움 주셔서 진심으로 감사드립니다.
                다름이 아니라, 대회 정보 중 수정 요청드릴 사항이 있어
                연락드립니다. 현재 대회 등록 시 '대회 소개' 항목이 300자로
                제한되어 있는데, 저희 대회는 다양한 프로그램과 이벤트가 포함되어
                있어 더 긴 설명이 필요합니다. 혹시 '대회 소개' 항목의 글자 수
                제한을 500자로 늘려주실 수 있을까요? 이렇게 되면 참가자들에게 더
                풍부한 정보를 제공할 수 있을 것 같습니다. 바쁘신 와중에 번거롭게
                해드려 죄송하지만, 긍정적으로 검토해주시면 정말 감사하겠습니다.
                좋은 하루 보내세요!
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="destructive">대기중</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">미답변</Badge>
              </TableCell>
              <TableCell className="text-center">2024-06-15 14:30</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
