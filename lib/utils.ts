import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type RegistrationPrice } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const KO_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 프로필 권한 값을 화면에 표시할 한글 라벨로 변환하는 유틸리티
export function getProfileRoleLabel(role: string | null) {
  if (role === "admin") return "관리자";
  if (role === "user") return "일반 회원";
  return role ?? "-";
}

// 날짜 문자열을 "2026년 6월 1일" 형식으로 변환
export function formatProfileDate(dateStr: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 날짜 문자열을 "MM/DD" 형식으로 변환 (목록 카드 등 좁은 공간용)
export function formatMarathonDateShort(dateStr: string | null): string {
  if (!dateStr) return "미정";
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}`;
}

// 날짜 문자열을 "2026년 6월 1일(월)" 형식으로 변환
export function formatMarathonDate(dateStr: string | null): string {
  if (!dateStr) return "미정";
  const d = new Date(dateStr);
  const day = KO_DAYS[d.getDay()];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일(${day})`;
}

// 날짜+시각 문자열을 "2026년 6월 1일(월) 14:00" 형식으로 변환 (자정이면 시각 생략)
export function formatMarathonDatetime(dateStr: string | null): string {
  if (!dateStr) return "미정";
  const d = new Date(dateStr);
  const day = KO_DAYS[d.getDay()];
  const base = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일(${day})`;
  const h = d.getHours();
  const m = d.getMinutes();
  if (h === 0 && m === 0) return base;
  return `${base} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// registration_price 객체의 키(종목/카테고리)를 ", " 구분 문자열로 반환
export function formatMarathonCategories(
  price: RegistrationPrice | null,
): string {
  if (!price || Object.keys(price).length === 0) return "미정";
  return Object.keys(price).join(", ");
}

// registration_price 객체의 값(가격) 범위를 "50,000원 ~ 70,000원" 형식으로 반환
export function formatMarathonPrice(price: RegistrationPrice | null): string {
  if (!price || Object.keys(price).length === 0) return "미정";
  const values = Object.values(price);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const fmt = (n: number) => `${n.toLocaleString("ko-KR")}원`;
  return min === max ? fmt(min) : `${fmt(min)} ~ ${fmt(max)}`;
}

// 규모 숫자를 "약 3,000명" 형식으로 반환
export function formatMarathonScale(scale: number | null): string {
  if (!scale) return "미정";
  return `약 ${scale.toLocaleString("ko-KR")}명`;
}

// 대회 날짜까지 남은 일수를 "D-20", "디데이", "종료" 형식으로 반환
export function getMarathonDDay(eventDate: string | null): string {
  if (!eventDate) return "-";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  const diff = Math.round(
    (event.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return "디데이";
  return "종료";
}

// D-day 문자열에 따른 안내 메시지와 이모지 반환 ("종료", "디데이", "D-N" 각각 처리)
export function getMarathonDDayMessage(dday: string): {
  text: string;
  emoji: string;
} {
  if (dday === "종료") return { text: "아쉽게 종료됐어요", emoji: "🥵" };
  if (dday === "디데이") return { text: "오늘이에요!", emoji: "🎉" };
  const n = parseInt(dday.replace("D-", ""));
  if (n <= 7) return { text: "몇 일 남지 않았어요", emoji: "🏃‍♂️" };
  if (n <= 30) return { text: "슬슬 준비해요", emoji: "💪" };
  return { text: "아직 여유가 있어요", emoji: "😊" };
}

// D-day 문자열에 따른 Badge variant 반환
export function getMarathonDDayVariant(
  dday: string,
): "destructive" | "ghost" | "default" {
  if (dday === "종료") return "ghost";
  return "destructive";
}

// registration_price 키를 대소문자 무관하게 코스 필터 값과 비교
export function matchesMarathonCourse(
  price: RegistrationPrice | null,
  course: string,
): boolean {
  const keys = price ? Object.keys(price) : [];
  const isFull = (k: string) => /^(full|풀)$/i.test(k.trim());
  const isHalf = (k: string) => /^(half|하프)$/i.test(k.trim());
  const is10km = (k: string) => /^10\s*k(m)?$/i.test(k.trim());
  const is5km = (k: string) => /^5\s*k(m)?$/i.test(k.trim());
  const isKnown = (k: string) => isFull(k) || isHalf(k) || is10km(k) || is5km(k);
  switch (course) {
    case "FULL": return keys.some(isFull);
    case "HALF": return keys.some(isHalf);
    case "10KM": return keys.some(is10km);
    case "5KM": return keys.some(is5km);
    case "기타": return keys.length > 0 && keys.every((k) => !isKnown(k));
    default: return true;
  }
}

// 접수 상태에 따른 Badge variant 반환
export function getMarathonStatusVariant(
  status: string,
): "destructive" | "ghost" | "outline" | "default" {
  if (status === "접수중" || status === "추가접수") return "destructive";
  if (status === "접수마감") return "ghost";
  return "outline";
}

// registration_price 객체의 코스별 가격을 "FULL 100,000원 / 하프 50,000원" 형식으로 반환
export function formatMarathonPriceDetail(
  price: RegistrationPrice | null,
): string {
  if (!price || Object.keys(price).length === 0) return "미정";
  return Object.entries(price)
    .map(([k, v]) => `${k} ${v.toLocaleString("ko-KR")}원`)
    .join(" / ");
}

// 지역·구역·장소를 " · " 구분 문자열로 반환 (없으면 "미정")
export function formatMarathonLocation({
  location_region,
  location_area,
  location_place,
}: Pick<
  import("@/lib/types").Marathon,
  "location_region" | "location_area" | "location_place"
>): string {
  return (
    [location_region, location_area, location_place].filter(Boolean).join(" · ") || "미정"
  );
}

// 대회 시작일~종료일을 "2026년 5월 9일(토) ~ 2026년 5월 9일(토)" 형식으로 반환
export function formatMarathonEventPeriod(
  event_start_at: string | null,
  event_end_at: string | null,
): string {
  const start = formatMarathonDatetime(event_start_at);
  if (!event_end_at) return start;
  return `${start} ~ ${formatMarathonDatetime(event_end_at)}`;
}

// 접수 시작일~종료일을 "2026년 4월 8일(수) ~ 2026년 4월 24일(금)" 형식으로 반환
export function formatMarathonRegistrationPeriod(
  registration_start_at: string | null,
  registration_end_at: string | null,
): string {
  const start = formatMarathonDatetime(registration_start_at);
  if (!registration_end_at) return start;
  return `${start} ~ ${formatMarathonDatetime(registration_end_at)}`;
}
