import { z } from "zod";
import { profileNameSchema, contactSchema } from "@/lib/validations";

// 프로필 타입
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  signup_provider: string;
  role: string;
  visit_count: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// 프로필 이름 변경 폼 타입
export type ProfileNameFormValues = z.infer<typeof profileNameSchema>;

// 문의하기 폼 타입 (contact)
export type ContactFormValues = z.infer<typeof contactSchema>;

// 마라톤 접수 상태 타입
export type RegistrationStatus =
  | "접수미정"
  | "접수대기"
  | "접수중"
  | "접수마감"
  | "추가접수";

// 마라톤 접수 가격 타입 (예: { "풀": 50000, "하프": 30000 })
export type RegistrationPrice = Record<string, number>;

// 마라톤 테이블 전체 타입 (supabase-marathon.sql 기준)
export interface Marathon {
  id: string;
  year: number;
  month: number;
  name: string;
  slug: string;
  description: string | null;

  event_start_at: string | null;
  event_end_at: string | null;
  event_scale: number | null;
  event_type: string | null;
  event_site: string | null;
  event_souvenir: string | null;
  event_program: string | null;
  event_park: string | null;
  event_memo: string | null;

  registration_status: RegistrationStatus;
  registration_start_at: string | null;
  registration_end_at: string | null;
  registration_price: RegistrationPrice | null;

  images_cover: string | null;
  images_medal: string | null;

  location_country: string | null;
  location_region: string | null;
  location_area: string | null;
  location_place: string | null;
  location_naver: string | null;
  location_address: string | null;
  location_lat: number | null;
  location_lng: number | null;

  hosts_organizer: string | null;
  hosts_manager: string | null;
  hosts_phone: string | null;
  hosts_email: string | null;

  sns_instagram: string | null;
  sns_kakao: string | null;
  sns_youtube: string | null;
  sns_blog: string | null;

  comment_count: number;
  view_count: number;
  like_count: number;
  favorite_count: number;
  share_count: number;
  alert_count: number;
  created_at: string;
  updated_at: string;
}
