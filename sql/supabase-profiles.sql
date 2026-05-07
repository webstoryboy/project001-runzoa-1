-- ============================================
-- 프로필 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  signup_provider TEXT,
  role TEXT DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
  visit_count INTEGER DEFAULT 0 NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
  last_visited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- 프로필 인덱스
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email      ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role       ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_deleted ON public.profiles(is_deleted);
CREATE INDEX IF NOT EXISTS idx_profiles_last_visited_at ON public.profiles(last_visited_at);

-- ============================================
-- 트리거 (updated_at 자동 갱신)
-- fn_trg_set_updated_at() 은 supabase-function.sql 에서 정의
-- ============================================
DROP TRIGGER IF EXISTS trg_profiles_before_update ON public.profiles;
CREATE TRIGGER trg_profiles_before_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.fn_trg_set_updated_at();

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "회원 닉네임 전체 조회" ON public.profiles;
DROP POLICY IF EXISTS "본인 프로필 조회" ON public.profiles;
DROP POLICY IF EXISTS "본인 프로필 수정" ON public.profiles;

-- 회원: 삭제되지 않은 전체 닉네임 조회 (is_full_name_available RPC용)
CREATE POLICY "회원 닉네임 전체 조회"
ON public.profiles
FOR SELECT
TO authenticated
USING (is_deleted = FALSE);

-- 본인 프로필만 조회 가능
CREATE POLICY "본인 프로필 조회"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = (select auth.uid()) AND is_deleted = FALSE);

-- 본인 프로필만 수정 가능
CREATE POLICY "본인 프로필 수정"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = (select auth.uid()) AND is_deleted = FALSE)
WITH CHECK (id = (select auth.uid()) AND is_deleted = FALSE);

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
REVOKE INSERT, DELETE ON public.profiles FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO service_role;