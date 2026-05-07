import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, UserCheck, UserX, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminMember() {
  return (
    <div className="admin__container">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold font-paperlogy">회원관리</h1>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          가입 회원 정보와 활동 상태를 확인하고 계정을 관리하세요.
        </p>
      </div>

      {/* 통계 */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">전체 회원</dt>
            <Users className="w-4 h-4 text-brand" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy">100</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">활성회원</dt>
            <UserCheck className="w-4 h-4 text-red-600" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-red-600">53</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">탈퇴회원</dt>
            <UserX className="w-4 h-4 text-yellow-600" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-yellow-600">1</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">관리자</dt>
            <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-green-600">1</dd>
        </div>
      </dl>

      {/* 테이블 */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[60px] text-center">이미지</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="w-[100px] text-center">가입방법</TableHead>
              <TableHead className="w-[100px] text-center">역할</TableHead>
              <TableHead className="w-[100px] text-center">방문</TableHead>
              <TableHead className="w-[100px] text-center">상태</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead className="w-[60px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 데이터 없을 때 */}
            {/* 
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquareCode className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      등록된 회원이 없습니다.
                    </p>
                  </div>
                </TableCell> 
              </TableRow>
            */}

            <TableRow className="hover:bg-gray-50">
              <TableCell className="text-center">1</TableCell>
              <TableCell>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 mx-auto">
                  <Image
                    src="/face/face01.webp"
                    alt="회원의 프로필 이미지"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>조성원</TableCell>
              <TableCell>richclub9@naver.com</TableCell>
              <TableCell className="text-center">구글</TableCell>
              <TableCell className="text-center">회원</TableCell>
              <TableCell className="text-center">1회</TableCell>
              <TableCell className="text-center">
                <Badge variant="destructive">활성</Badge>
              </TableCell>
              <TableCell>2024-06-15 14:30</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="text-center">2</TableCell>
              <TableCell>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 mx-auto">
                  <Image
                    src="/face/face02.webp"
                    alt="회원의 프로필 이미지"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>김철수</TableCell>
              <TableCell>kimchulsoo@naver.com</TableCell>
              <TableCell className="text-center">구글</TableCell>
              <TableCell className="text-center">회원</TableCell>
              <TableCell className="text-center">1회</TableCell>
              <TableCell className="text-center">
                <Badge variant="default">탈퇴</Badge>
              </TableCell>
              <TableCell>2024-06-15 14:30</TableCell>
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
