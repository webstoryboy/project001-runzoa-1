-- ============================================
-- 실행 순서
-- 1. supabase-function.sql  ← 이 파일 (함수 먼저 정의)
-- 2. supabase-profiles.sql
-- 3. supabase-contact.sql
-- 4. supabase-marathon.sql
-- 5. supabase-reactions.sql
-- 6. supabase-comments.sql
-- 7. supabase-visitlog.sql
-- ============================================


-- ============================================
-- 1. 회원가입 시 프로필 자동 생성 (트리거)
-- ============================================
CREATE OR REPLACE FUNCTION public.fn_trg_insert_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, signup_provider, role, visit_count, is_deleted)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_app_meta_data->>'provider',
    'user',
    0,
    FALSE
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_insert_profile() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_insert_profile() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_insert_profile() FROM authenticated;

DROP TRIGGER IF EXISTS trg_auth_users_after_insert ON auth.users;
CREATE TRIGGER trg_auth_users_after_insert
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.fn_trg_insert_profile();


-- ============================================
-- 2. 업데이트 시 자동 갱신 (트리거)
-- ============================================
CREATE OR REPLACE FUNCTION public.fn_trg_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.fn_trg_set_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.fn_trg_set_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.fn_trg_set_updated_at() FROM authenticated;

-- ============================================
-- 3. 회원 탈퇴 (Soft Delete) (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.soft_delete_account()
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET
    is_deleted = TRUE,
    deleted_at = NOW()
  WHERE id = (select auth.uid())
    AND is_deleted = FALSE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.soft_delete_account() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.soft_delete_account() FROM anon;
GRANT EXECUTE ON FUNCTION public.soft_delete_account() TO authenticated;


-- ============================================
-- 4. 프로필 이름 중복 확인 (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.is_full_name_available(name_text TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE LOWER(TRIM(full_name)) = LOWER(TRIM(name_text))
      AND is_deleted = FALSE
      AND id != (select auth.uid())
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_full_name_available(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_full_name_available(TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_full_name_available(TEXT) TO authenticated;


-- ============================================
-- 5. 계정 탈퇴 여부 체크 (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.is_my_account_deleted()
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  RETURN COALESCE(
    (
      SELECT is_deleted
      FROM public.profiles
      WHERE id = (select auth.uid())
    ),
    FALSE
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_my_account_deleted() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_my_account_deleted() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_my_account_deleted() TO authenticated;


-- ============================================
-- 6. 로그인 시 방문 횟수 증가 (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.increment_visit_count()
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET
    visit_count = visit_count + 1,
    last_visited_at = NOW(),
    updated_at = NOW()
  WHERE id = (select auth.uid())
    AND is_deleted = FALSE
    AND (
      last_visited_at IS NULL
      OR last_visited_at < date_trunc('day', NOW() AT TIME ZONE 'Asia/Seoul') AT TIME ZONE 'Asia/Seoul'
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.increment_visit_count() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_visit_count() FROM anon;
GRANT EXECUTE ON FUNCTION public.increment_visit_count() TO authenticated;


-- ============================================
-- 최종 기능 요약
-- ============================================
-- [트리거]
-- 1. 회원가입 시 프로필 자동 생성       fn_trg_insert_profile
-- 2. 업데이트 시 자동 갱신              fn_trg_set_updated_at
--
-- [RPC]
-- 3. 회원 탈퇴 (Soft Delete)           soft_delete_account
-- 4. 프로필 이름 중복 확인              is_full_name_available
-- 5. 계정 탈퇴 여부 체크               is_my_account_deleted
-- 6. 로그인 시 방문 횟수 증가           increment_visit_count
-- 7. 마라톤 뷰 카운트 증가              → API Route (service_role)
