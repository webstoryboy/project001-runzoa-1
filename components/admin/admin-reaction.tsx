import { Heart, Star, MessageSquare, Bell, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const reactions = [
  {
    no: 1,
    name: "2026 세이브더칠드런 국제어린이마라톤 창원",
    likes: 128,
    bookmarks: 74,
    comments: 32,
    notifications: 56,
    shares: 18,
  },
  {
    no: 2,
    name: "2026 서울 하프 마라톤",
    likes: 95,
    bookmarks: 61,
    comments: 20,
    notifications: 43,
    shares: 12,
  },
  {
    no: 3,
    name: "2026 부산 국제 마라톤",
    likes: 87,
    bookmarks: 52,
    comments: 15,
    notifications: 38,
    shares: 9,
  },
  {
    no: 4,
    name: "제15회 대구 국제 마라톤",
    likes: 64,
    bookmarks: 41,
    comments: 8,
    notifications: 27,
    shares: 5,
  },
  {
    no: 5,
    name: "2026 코리아 정글 트레일",
    likes: 53,
    bookmarks: 35,
    comments: 11,
    notifications: 19,
    shares: 7,
  },
  {
    no: 6,
    name: "2026 춘천 마라톤",
    likes: 42,
    bookmarks: 28,
    comments: 6,
    notifications: 15,
    shares: 3,
  },
  {
    no: 7,
    name: "2026 제주 국제 마라톤",
    likes: 38,
    bookmarks: 22,
    comments: 4,
    notifications: 12,
    shares: 2,
  },
];

export default function AdminReaction() {
  return (
    <div className="admin__container">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold font-paperlogy">리액션</h1>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          좋아요, 즐겨찾기, 댓글 등 사용자 반응 데이터를 확인하세요.
        </p>
      </div>

      {/* 통계 */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">좋아요</dt>
            <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-rose-500">507</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">즐겨찾기</dt>
            <Star className="w-4 h-4 text-amber-500" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-amber-500">313</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">댓글</dt>
            <MessageSquare className="w-4 h-4 text-violet-500" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-violet-500">96</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">알림</dt>
            <Bell className="w-4 h-4 text-blue-500" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-blue-500">210</dd>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <dt className="text-sm text-muted-foreground font-paperlogy">공유</dt>
            <Share2 className="w-4 h-4 text-sky-500" aria-hidden="true" />
          </div>
          <dd className="text-2xl font-semibold font-paperlogy text-sky-500">56</dd>
        </div>
      </dl>

      {/* 테이블 */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead>마라톤명</TableHead>
              <TableHead className="w-[70px] text-center text-rose-500">좋아요</TableHead>
              <TableHead className="w-[70px] text-center text-amber-500">즐겨찾기</TableHead>
              <TableHead className="w-[60px] text-center text-violet-500 hidden sm:table-cell">댓글</TableHead>
              <TableHead className="w-[60px] text-center text-blue-500 hidden md:table-cell">알림</TableHead>
              <TableHead className="w-[60px] text-center text-sky-500 hidden lg:table-cell">공유</TableHead>
              <TableHead className="w-[60px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reactions.map((row) => (
              <TableRow key={row.no} className="hover:bg-gray-50">
                <TableCell className="text-center text-muted-foreground">{row.no}</TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-center text-rose-500 font-paperlogy">{row.likes}</TableCell>
                <TableCell className="text-center text-amber-500 font-paperlogy">{row.bookmarks}</TableCell>
                <TableCell className="text-center text-violet-500 font-paperlogy hidden sm:table-cell">{row.comments}</TableCell>
                <TableCell className="text-center text-blue-500 font-paperlogy hidden md:table-cell">{row.notifications}</TableCell>
                <TableCell className="text-center text-sky-500 font-paperlogy hidden lg:table-cell">{row.shares}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    aria-label={`${row.name} 리액션 상세보기`}
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
