// 헤더용 (간소화)
export interface Profile {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
}

// 프로필 페이지용 (전체)
export interface FullProfile {
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  role: string | null;
  visit_count: number | null;
  created_at: string | null;
}

// 이름 변경 폼
export interface ProfileNameFormValues {
  full_name: string;
}
