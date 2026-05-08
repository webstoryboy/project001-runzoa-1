import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 프로필 가입일 문자열을 한국어 날짜 형식으로 변환하는 유틸리티 (예: 2023년 5월 15일)
export function formatProfileDate(dateStr: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 프로필 권한 값을 화면에 표시할 한글 라벨로 변환하는 유틸리티
export function getProfileRoleLabel(role: string | null) {
  if (role === "admin") return "관리자";
  if (role === "user") return "일반 회원";
  return role ?? "-";
}
