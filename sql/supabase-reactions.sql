-- ============================================
-- 리액션 테이블 구성
-- comments → marathon_comments (supabase-comments.sql)
-- likes    → marathon_likes    ↓ 이 파일
-- favorites → marathon_favorites ↓ 이 파일
-- alerts   → marathon_alerts   ↓ 이 파일
-- shares   → marathon_shares   ↓ 이 파일
-- ============================================


-- ============================================
-- 1. 좋아요 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathon_likes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marathon_id UUID        NOT NULL REFERENCES public.marathons(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE (user_id, marathon_id)
);

CREATE INDEX IF NOT EXISTS idx_marathon_likes_user_id     ON public.marathon_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_marathon_likes_marathon_id ON public.marathon_likes(marathon_id);

-- ============================================
-- 2. 즐겨찾기 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathon_favorites (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marathon_id UUID        NOT NULL REFERENCES public.marathons(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE (user_id, marathon_id)
);

CREATE INDEX IF NOT EXISTS idx_marathon_favorites_user_id     ON public.marathon_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_marathon_favorites_marathon_id ON public.marathon_favorites(marathon_id);

-- ============================================
-- 3. 알림 설정 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathon_alerts (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marathon_id UUID        NOT NULL REFERENCES public.marathons(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE (user_id, marathon_id)
);

CREATE INDEX IF NOT EXISTS idx_marathon_alerts_user_id     ON public.marathon_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_marathon_alerts_marathon_id ON public.marathon_alerts(marathon_id);

-- ============================================
-- 4. 공유 기록 테이블
-- 공유는 중복 허용 (여러 번 공유 가능)
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathon_shares (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  marathon_id UUID        NOT NULL REFERENCES public.marathons(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_marathon_shares_user_id     ON public.marathon_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_marathon_shares_marathon_id ON public.marathon_shares(marathon_id);

-- ============================================
-- 카운트 자동 동기화 트리거
-- marathons 테이블의 count 컬럼을 자동으로 갱신
-- ============================================

-- 좋아요 추가
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_likes_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET like_count = like_count + 1 WHERE id = NEW.marathon_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_insert() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_likes_after_insert ON public.marathon_likes;
CREATE TRIGGER trg_marathon_likes_after_insert
AFTER INSERT ON public.marathon_likes
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_likes_insert();

-- 좋아요 삭제
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_likes_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.marathon_id;
  RETURN OLD;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_delete() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_delete() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_likes_delete() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_likes_after_delete ON public.marathon_likes;
CREATE TRIGGER trg_marathon_likes_after_delete
AFTER DELETE ON public.marathon_likes
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_likes_delete();

-- 즐겨찾기 추가
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_favorites_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET favorite_count = favorite_count + 1 WHERE id = NEW.marathon_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_insert() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_favorites_after_insert ON public.marathon_favorites;
CREATE TRIGGER trg_marathon_favorites_after_insert
AFTER INSERT ON public.marathon_favorites
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_favorites_insert();

-- 즐겨찾기 삭제
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_favorites_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET favorite_count = GREATEST(favorite_count - 1, 0) WHERE id = OLD.marathon_id;
  RETURN OLD;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_delete() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_delete() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_favorites_delete() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_favorites_after_delete ON public.marathon_favorites;
CREATE TRIGGER trg_marathon_favorites_after_delete
AFTER DELETE ON public.marathon_favorites
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_favorites_delete();

-- 알림 추가
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_alerts_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET alert_count = alert_count + 1 WHERE id = NEW.marathon_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_insert() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_alerts_after_insert ON public.marathon_alerts;
CREATE TRIGGER trg_marathon_alerts_after_insert
AFTER INSERT ON public.marathon_alerts
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_alerts_insert();

-- 알림 삭제
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_alerts_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET alert_count = GREATEST(alert_count - 1, 0) WHERE id = OLD.marathon_id;
  RETURN OLD;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_delete() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_delete() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_alerts_delete() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_alerts_after_delete ON public.marathon_alerts;
CREATE TRIGGER trg_marathon_alerts_after_delete
AFTER DELETE ON public.marathon_alerts
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_alerts_delete();

-- 공유 추가
CREATE OR REPLACE FUNCTION public.fn_trg_marathon_shares_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.marathons SET share_count = share_count + 1 WHERE id = NEW.marathon_id;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_shares_insert() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_shares_insert() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_marathon_shares_insert() FROM authenticated;

DROP TRIGGER IF EXISTS trg_marathon_shares_after_insert ON public.marathon_shares;
CREATE TRIGGER trg_marathon_shares_after_insert
AFTER INSERT ON public.marathon_shares
FOR EACH ROW EXECUTE FUNCTION public.fn_trg_marathon_shares_insert();

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE public.marathon_likes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marathon_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marathon_alerts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marathon_shares    ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "본인 좋아요 조회" ON public.marathon_likes;
DROP POLICY IF EXISTS "본인 좋아요 등록" ON public.marathon_likes;
DROP POLICY IF EXISTS "본인 좋아요 삭제" ON public.marathon_likes;

DROP POLICY IF EXISTS "본인 즐겨찾기 조회" ON public.marathon_favorites;
DROP POLICY IF EXISTS "본인 즐겨찾기 등록" ON public.marathon_favorites;
DROP POLICY IF EXISTS "본인 즐겨찾기 삭제" ON public.marathon_favorites;

DROP POLICY IF EXISTS "본인 알림 조회" ON public.marathon_alerts;
DROP POLICY IF EXISTS "본인 알림 등록" ON public.marathon_alerts;
DROP POLICY IF EXISTS "본인 알림 삭제" ON public.marathon_alerts;

DROP POLICY IF EXISTS "공유 등록" ON public.marathon_shares;

-- ── 좋아요 ──────────────────────────────────
CREATE POLICY "본인 좋아요 조회"
ON public.marathon_likes FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "본인 좋아요 등록"
ON public.marathon_likes FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "본인 좋아요 삭제"
ON public.marathon_likes FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ── 즐겨찾기 ────────────────────────────────
CREATE POLICY "본인 즐겨찾기 조회"
ON public.marathon_favorites FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "본인 즐겨찾기 등록"
ON public.marathon_favorites FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "본인 즐겨찾기 삭제"
ON public.marathon_favorites FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ── 알림 ────────────────────────────────────
CREATE POLICY "본인 알림 조회"
ON public.marathon_alerts FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "본인 알림 등록"
ON public.marathon_alerts FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "본인 알림 삭제"
ON public.marathon_alerts FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ── 공유 ────────────────────────────────────
CREATE POLICY "공유 등록"
ON public.marathon_shares FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT SELECT, INSERT, DELETE ON public.marathon_likes     TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.marathon_favorites TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.marathon_alerts    TO authenticated;
GRANT SELECT, INSERT         ON public.marathon_shares    TO authenticated;

REVOKE UPDATE ON public.marathon_likes     FROM authenticated;
REVOKE UPDATE ON public.marathon_favorites FROM authenticated;
REVOKE UPDATE ON public.marathon_alerts    FROM authenticated;
REVOKE UPDATE, DELETE ON public.marathon_shares FROM authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_likes     TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_favorites TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_alerts    TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathon_shares    TO service_role;
