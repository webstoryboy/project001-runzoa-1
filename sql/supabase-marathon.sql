-- ============================================
-- 이벤트 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS public.marathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  year INT NOT NULL CHECK (year >= 2000),            -- 연도
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12), -- 월
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  slug TEXT UNIQUE NOT NULL CHECK (char_length(slug) BETWEEN 1 AND 160),
  description TEXT CHECK (char_length(description) <= 3000),

  event_start_at TIMESTAMPTZ,                        -- 이벤트 시작 일시
  event_end_at TIMESTAMPTZ,                          -- 이벤트 종료 일시
  event_scale INT,                                   -- 이벤트 규모
  event_type TEXT,                                   -- 이벤트 타입
  event_site TEXT,                                   -- 이벤트 웹사이트
  event_souvenir TEXT,                               -- 이벤트 기념품 정보
  event_program TEXT,                                -- 이벤트 프로그램 정보
  event_park TEXT,                                   -- 이벤트 주차 정보
  event_memo TEXT,                                   -- 이벤트 메모

  registration_status TEXT DEFAULT '접수미정' NOT NULL CHECK (registration_status IN ('접수미정', '접수대기', '접수중', '접수마감', '추가접수')),
  registration_start_at TIMESTAMPTZ,                 -- 접수 시작 일시
  registration_end_at TIMESTAMPTZ,                   -- 접수 종료 일시           
  registration_price JSONB,                          -- 접수 가격 정보(거리별 가격)

  images_cover TEXT,                                 -- 대표 이미지
  images_medal TEXT,                                 -- 메달 이미지

  location_country TEXT,                             -- 국가(한국, 일본, 프랑스....)
  location_region TEXT,                              -- 지역(서울, 도쿄, 파리....)
  location_area TEXT,                                -- 지역(안양, 남양주)
  location_place TEXT,                               -- 장소 (올림픽공원, 한강공원....)
  location_naver TEXT,                               -- 네이버 지도명
  location_address TEXT,                             -- 주소
  location_lat NUMERIC(10, 7),                       -- 위도
  location_lng NUMERIC(10, 7),                       -- 경도

  hosts_organizer TEXT,                              -- 주최
  hosts_manager TEXT,                                -- 주관    
  hosts_phone TEXT,                                  -- 주관 전화번호
  hosts_email TEXT,                                  -- 주관 이메일

  sns_instagram TEXT,                                -- sns
  sns_kakao TEXT,                                    -- sns
  sns_youtube TEXT,                                  -- sns
  sns_blog TEXT,                                     -- sns

  comment_count INT DEFAULT 0 NOT NULL CHECK (comment_count >= 0),
  view_count INT DEFAULT 0 NOT NULL CHECK (view_count >= 0),
  like_count INT DEFAULT 0 NOT NULL CHECK (like_count >= 0),
  favorite_count INT DEFAULT 0 NOT NULL CHECK (favorite_count >= 0),
  share_count INT DEFAULT 0 NOT NULL CHECK (share_count >= 0),
  alert_count INT DEFAULT 0 NOT NULL CHECK (alert_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,     
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL      
);

-- ============================================
-- 이벤트 테이블 인덱스 (필터/목록 조회용)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_marathons_registration_status  ON public.marathons(registration_status);
CREATE INDEX IF NOT EXISTS idx_marathons_event_start_at       ON public.marathons(event_start_at);
CREATE INDEX IF NOT EXISTS idx_marathons_year_month           ON public.marathons(year, month);
CREATE INDEX IF NOT EXISTS idx_marathons_location_region      ON public.marathons(location_region);
CREATE INDEX IF NOT EXISTS idx_marathons_location_country     ON public.marathons(location_country);
CREATE INDEX IF NOT EXISTS idx_marathons_registration_dates   ON public.marathons(registration_start_at, registration_end_at);

-- 마라톤 이름 검색 (중간 문자열 LIKE 검색 지원)
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
CREATE INDEX IF NOT EXISTS idx_marathons_name_trgm ON public.marathons USING GIN (name gin_trgm_ops);

-- ============================================
-- 트리거 (updated_at 자동 갱신)
-- fn_trg_set_updated_at() 은 supabase-function.sql 에서 정의
-- ============================================
DROP TRIGGER IF EXISTS trg_marathons_before_update ON public.marathons;
CREATE TRIGGER trg_marathons_before_update
  BEFORE UPDATE ON public.marathons
  FOR EACH ROW EXECUTE FUNCTION public.fn_trg_set_updated_at();

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE public.marathons ENABLE ROW LEVEL SECURITY;

-- 기존 정책 초기화 (충돌 방지)
DROP POLICY IF EXISTS "전체 공개 조회" ON public.marathons;

-- 누구나 조회 가능 (비로그인 포함)
CREATE POLICY "전체 공개 조회"
ON public.marathons
FOR SELECT
TO anon, authenticated
USING (true);

-- ============================================
-- 테이블 권한 정리
-- ============================================
GRANT SELECT ON public.marathons TO anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.marathons FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marathons TO service_role;
