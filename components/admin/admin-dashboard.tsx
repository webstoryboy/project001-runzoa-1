import Link from "next/link";
import Image from "next/image";
import {
  TentTree,
  Users,
  MessageSquare,
  Ghost,
  Heater,
  ChevronRight,
  AlertCircle,
  FilePen,
} from "lucide-react";

const recentMarathons = [
  {
    name: "2026 세이브더칠드런 국제어린이마라톤 창원",
    date: "2026년 05월 09일(토)",
    image: "/marathon/cover/4th-bamseom-marathon.jpg",
    status: "접수중",
  },
  {
    name: "2026 서울 하프 마라톤",
    date: "2026년 05월 11일(월)",
    image: "/marathon/cover/2026-chuncheon-bomnae-marathon.jpg",
    status: "접수중",
  },
  {
    name: "2026 부산 국제 마라톤",
    date: "2026년 05월 16일(토)",
    image: "/marathon/cover/disney-princess-half-marathon-weekend-2027.jpg",
    status: "접수중",
  },
  {
    name: "제15회 대구 국제 마라톤",
    date: "2026년 05월 24일(일)",
    image: "/marathon/cover/4th-bamseom-marathon.jpg",
    status: "접수마감",
  },
  {
    name: "2026 코리아 정글 트레일",
    date: "2026년 05월 30일(월)",
    image: "/marathon/cover/2026-chuncheon-bomnae-marathon.jpg",
    status: "접수마감",
  },
];

const pendingMarathons = [
  {
    name: "2026 춘천 마라톤",
    date: "2026년 05월 18일(일)",
    image: "/marathon/cover/2026-chuncheon-bomnae-marathon.jpg",
    status: "접수대기",
  },
  {
    name: "2026 제주 국제 마라톤",
    date: "2026년 05월 22일(금)",
    image: "/marathon/cover/disney-princess-half-marathon-weekend-2027.jpg",
    status: "접수대기",
  },
  {
    name: "2026 울산 마라톤",
    date: "2026년 05월 31일(토)",
    image: "/marathon/cover/4th-bamseom-marathon.jpg",
    status: "접수대기",
  },
  {
    name: "2026 광주 국제 마라톤",
    date: "2026년 06월 07일(일)",
    image: "/marathon/cover/2026-chuncheon-bomnae-marathon.jpg",
    status: "접수대기",
  },
  {
    name: "2026 디즈니 프린세스 하프마라톤",
    date: "2026년 06월 14일(일)",
    image: "/marathon/cover/disney-princess-half-marathon-weekend-2027.jpg",
    status: "접수대기",
  },
];

const recentMembers = [
  {
    name: "조성원",
    email: "richclub9@naver.com",
    date: "2026-05-04",
    image: "/face/face01.webp",
    method: "구글",
  },
  {
    name: "김철수",
    email: "kimchulsoo@naver.com",
    date: "2026-05-03",
    image: "/face/face02.webp",
    method: "카카오",
  },
  {
    name: "이영희",
    email: "yhlee@gmail.com",
    date: "2026-05-01",
    image: "/face/face03.webp",
    method: "네이버",
  },
];

const recentContacts = [
  {
    type: "불편신고",
    title: "대회 소개 글자 수 제한 개선 요청",
    date: "2026-05-04",
    icon: AlertCircle,
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
  },
  {
    type: "문의사항",
    title: "참가 신청 방법 문의드립니다",
    date: "2026-05-03",
    icon: MessageSquare,
    iconClass: "text-teal-500",
    bgClass: "bg-teal-50",
  },
  {
    type: "수정요청",
    title: "2026 춘천 마라톤 날짜 수정 요청",
    date: "2026-05-02",
    icon: FilePen,
    iconClass: "text-violet-500",
    bgClass: "bg-violet-50",
  },
];

export default function AdminDashboard() {
  return (
    <div className="admin__container">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold font-paperlogy">대시보드</h1>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          회원, 문의사항, 마라톤 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 */}
      <dl className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground font-paperlogy">
              마라톤
            </dt>
            <TentTree className="w-4 h-4 text-brand" aria-hidden="true" />
          </div>
          <dd className="text-3xl font-semibold font-paperlogy">149</dd>
          <div className="flex gap-2 text-xs font-anyvid text-muted-foreground">
            <span className="text-red-600">진행중 122</span>
            <span className="text-blue-600">접수중 27</span>
            <span className="text-green-600">접수대기 10</span>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground font-paperlogy">
              회원
            </dt>
            <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
          </div>
          <dd className="text-3xl font-semibold font-paperlogy">100</dd>
          <div className="flex gap-2 text-xs font-anyvid text-muted-foreground">
            <span className="text-green-600">활성 53</span>
            <span className="text-red-600">탈퇴 1</span>
            <span>관리자 1</span>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground font-paperlogy">
              문의
            </dt>
            <MessageSquare
              className="w-4 h-4 text-teal-500"
              aria-hidden="true"
            />
          </div>
          <dd className="text-3xl font-semibold font-paperlogy">5</dd>
          <div className="flex gap-2 text-xs font-anyvid text-muted-foreground">
            <span className="text-red-600">대기중 1</span>
            <span className="text-yellow-600">처리중 1</span>
            <span className="text-green-600">처리완료 2</span>
          </div>
        </div>
      </dl>

      {/* 최근 문의 + 최근 가입 회원 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 최근 마라톤 */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Heater className="w-5 h-5 text-brand" />
              <span className="text-lg font-semibold font-paperlogy">
                최근 등록 마라톤
              </span>
            </div>
            <Link
              href="/admin/marathon"
              className="flex items-center gap-0.5 text-xs font-anyvid text-muted-foreground hover:text-brand transition-colors"
            >
              전체보기
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y">
            {recentMarathons.map((marathon) => (
              <li
                key={marathon.name}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={marathon.image}
                    alt="마라톤 커버 이미지"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href="/"
                    className="text-sm font-anyvid truncate block hover:text-brand transition-colors"
                  >
                    {marathon.name}
                  </Link>
                  <p className="text-xs text-muted-foreground font-anyvid truncate">
                    {marathon.date}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border px-2 py-0.5 font-anyvid text-xs text-muted-foreground">
                  {marathon.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 접수 대기 마라톤 */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Ghost className="w-5 h-5 text-brand" />
              <span className="text-lg font-semibold font-paperlogy">
                접수 대기 마라톤
              </span>
            </div>
            <Link
              href="/admin/marathon"
              className="flex items-center gap-0.5 text-xs font-anyvid text-muted-foreground hover:text-brand transition-colors"
            >
              전체보기
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y">
            {pendingMarathons.map((marathon) => (
              <li
                key={marathon.name}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={marathon.image}
                    alt="마라톤 커버 이미지"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href="/"
                    className="text-sm font-anyvid truncate block hover:text-brand transition-colors"
                  >
                    {marathon.name}
                  </Link>
                  <p className="text-xs text-muted-foreground font-anyvid truncate">
                    {marathon.date}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border px-2 py-0.5 font-anyvid text-xs text-muted-foreground">
                  {marathon.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 최근 회원가입 / 문의사항 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 최근 회원가입 */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand" aria-hidden="true" />
              <span className="text-lg font-semibold font-paperlogy">
                최근 회원가입
              </span>
            </div>
            <Link
              href="/admin/member"
              className="flex items-center gap-0.5 text-xs font-anyvid text-muted-foreground hover:text-brand transition-colors"
            >
              전체보기
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y">
            {recentMembers.map((member) => (
              <li
                key={member.email}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={member.image}
                    alt={`${member.name} 프로필`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-anyvid truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground font-anyvid truncate">
                    {member.email} · {member.date}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border px-2 py-0.5 font-anyvid text-xs text-muted-foreground">
                  {member.method}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 최근 문의사항 */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <MessageSquare
                className="w-5 h-5 text-brand"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold font-paperlogy">
                최근 문의사항
              </span>
            </div>
            <Link
              href="/admin/contact"
              className="flex items-center gap-0.5 text-xs font-anyvid text-muted-foreground hover:text-brand transition-colors"
            >
              전체보기
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y">
            {recentContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <li
                  key={contact.title}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${contact.bgClass}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${contact.iconClass}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-anyvid truncate">
                      {contact.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-anyvid truncate">
                      {contact.date}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border px-2 py-0.5 font-anyvid text-xs text-muted-foreground">
                    {contact.type}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
