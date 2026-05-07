-- ============================================
-- 방문 로그 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS public.visit_logs (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        REFERENCES auth.users(id) ON DELETE SET NULL,

  user_agent   TEXT,                                   -- 원본 UA 문자열
  browser      TEXT,                                   -- 브라우저 (Chrome, Safari ...)
  browser_version TEXT,                               -- 브라우저 버전
  os           TEXT,                                   -- 운영체제 (Windows, macOS, iOS, Android ...)
  os_version   TEXT,                                   -- OS 버전
  device_type  TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet', 'unknown')),

  ip_address   TEXT,                                   -- IP 주소
  pathname     TEXT,                                   -- 방문 경로 (/marathon/slug 등)
  referrer     TEXT,                                   -- 유입 경로

  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- 방문 로그 인덱스
-- ============================================
CREATE INDEX IF NOT EXISTS idx_visit_logs_user_id     ON public.visit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_visit_logs_created_at  ON public.visit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_logs_device_type ON public.visit_logs(device_type);
CREATE INDEX IF NOT EXISTS idx_visit_logs_pathname    ON public.visit_logs(pathname);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "본인 로그 조회"     ON public.visit_logs;
DROP POLICY IF EXISTS "비로그인 로그 등록" ON public.visit_logs;
DROP POLICY IF EXISTS "회원 로그 등록"     ON public.visit_logs;

-- 회원: 본인 로그만 조회
CREATE POLICY "본인 로그 조회"
ON public.visit_logs FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

-- 비로그인: 로그 등록 (user_id는 NULL로 저장)
CREATE POLICY "비로그인 로그 등록"
ON public.visit_logs FOR INSERT TO anon
WITH CHECK (user_id IS NULL);

-- 회원: 로그 등록
CREATE POLICY "회원 로그 등록"
ON public.visit_logs FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT INSERT ON public.visit_logs TO anon;
GRANT SELECT, INSERT ON public.visit_logs TO authenticated;
REVOKE UPDATE, DELETE ON public.visit_logs FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visit_logs TO service_role;
