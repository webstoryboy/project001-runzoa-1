-- ============================================
-- 마라톤 댓글 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathon_comments (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  marathon_id UUID        NOT NULL REFERENCES public.marathons(id) ON DELETE CASCADE,

  content     TEXT        NOT NULL CHECK (char_length(content) BETWEEN 1 AND 500),

  is_deleted  BOOLEAN     DEFAULT FALSE NOT NULL,
  deleted_at  TIMESTAMPTZ,

  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- 트리거 (updated_at 자동 갱신)
-- fn_trg_set_updated_at() 은 supabase-function.sql 에서 정의
-- ============================================
DROP TRIGGER IF EXISTS trg_marathon_comments_before_update ON public.marathon_comments;
CREATE TRIGGER trg_marathon_comments_before_update
  BEFORE UPDATE ON public.marathon_comments
  FOR EACH ROW EXECUTE FUNCTION public.fn_trg_set_updated_at();

-- ============================================
-- 트리거 (comment_count 자동 동기화)
-- ============================================
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_comments_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET comment_count = comment_count + 1 WHERE id = NEW.marathon_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_insert() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_comments_after_insert ON public.marathon_comments;
CREATE TRIGGER trg_marathon_comments_after_insert
AFTER INSERT ON public.marathon_comments
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_comments_insert();

CREATE OR REPLACE FUNCTION public.fn_trg_marathon_comments_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.marathon_id;
  RETURN OLD;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_delete() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_delete() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_comments_delete() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_comments_after_delete ON public.marathon_comments;
CREATE TRIGGER trg_marathon_comments_after_delete
AFTER DELETE ON public.marathon_comments
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_comments_delete();

-- ============================================
-- 마라톤 댓글 인덱스
-- ============================================
CREATE INDEX IF NOT EXISTS idx_marathon_comments_marathon_id ON public.marathon_comments(marathon_id);
CREATE INDEX IF NOT EXISTS idx_marathon_comments_user_id     ON public.marathon_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_marathon_comments_created_at  ON public.marathon_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marathon_comments_is_deleted  ON public.marathon_comments(is_deleted);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE public.marathon_comments ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "전체 공개 조회" ON public.marathon_comments;
DROP POLICY IF EXISTS "회원 댓글 등록" ON public.marathon_comments;
DROP POLICY IF EXISTS "본인 댓글 수정" ON public.marathon_comments;
DROP POLICY IF EXISTS "본인 댓글 삭제" ON public.marathon_comments;

-- 누구나 삭제되지 않은 댓글 조회 가능
CREATE POLICY "전체 공개 조회"
ON public.marathon_comments FOR SELECT TO anon, authenticated
USING (is_deleted = FALSE);

-- 회원: 댓글 등록
CREATE POLICY "회원 댓글 등록"
ON public.marathon_comments FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

-- 본인: 댓글 수정
CREATE POLICY "본인 댓글 수정"
ON public.marathon_comments FOR UPDATE TO authenticated
USING (user_id = (select auth.uid()) AND is_deleted = FALSE)
WITH CHECK (user_id = (select auth.uid()));

-- 본인: 댓글 삭제 (soft delete는 UPDATE로 처리)
CREATE POLICY "본인 댓글 삭제"
ON public.marathon_comments FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT SELECT ON public.marathon_comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_comments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_comments TO service_role;
