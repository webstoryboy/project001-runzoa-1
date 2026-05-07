-- ============================================
-- 문의사항 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT        NOT NULL,
  type       TEXT        NOT NULL CHECK (type IN ('불편신고', '문의사항', '수정요청')),
  title      TEXT        NOT NULL CHECK (char_length(title) BETWEEN 1 AND 100),
  content    TEXT        NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  status     TEXT        DEFAULT '대기중' NOT NULL CHECK (status IN ('대기중', '처리중', '처리완료', '종료됨')),
  reply      TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- 문의사항 인덱스
-- ============================================
CREATE INDEX IF NOT EXISTS idx_contacts_user_id    ON public.contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_user_email ON public.contacts(user_email);
CREATE INDEX IF NOT EXISTS idx_contacts_status     ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_type       ON public.contacts(type);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- ============================================
-- 트리거 (updated_at 자동 갱신)
-- fn_trg_set_updated_at() 은 supabase-function.sql 에서 정의
-- ============================================
DROP TRIGGER IF EXISTS trg_contacts_before_update ON public.contacts;
CREATE TRIGGER trg_contacts_before_update
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.fn_trg_set_updated_at();

-- ============================================
-- RLS (Row Level Security) 정책
-- is_admin() 함수는 supabase-profiles.sql 에서 정의
-- ============================================
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "회원 본인 문의 조회" ON public.contacts;
DROP POLICY IF EXISTS "회원 문의 등록" ON public.contacts;

-- 일반 회원: 본인 문의만 조회
CREATE POLICY "회원 본인 문의 조회"
ON public.contacts
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));

-- 일반 회원: 문의 등록
CREATE POLICY "회원 문의 등록"
ON public.contacts
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = (select auth.uid())
  AND user_email = (select auth.email())
);

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT SELECT, INSERT ON public.contacts TO authenticated;
REVOKE UPDATE, DELETE ON public.contacts FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO service_role;
