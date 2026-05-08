import { APP_NAME, APP_ENG_NAME } from "@/lib/constants";
import { type ContactItem } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import PageContact from "@/components/page/page-contact";
import PageLogin from "@/components/page/page-login";
import PageTitle from "@/components/page/page-title";

export const metadata = {
  title: `${APP_NAME} 문의하기 | ${APP_ENG_NAME} Contact`,
  description: `${APP_NAME} 서비스 이용 중 궁금한 점, 마라톤 대회 정보 오류 제보, 데이터 추가 요청 등 문의 사항을 남겨주세요. 빠르고 정확하게 안내해드립니다.`,
};

// URL 쿼리값이 유효한 문의 유형인지 확인
const isContactType = (value: string): value is ContactItem["type"] => {
  return ["complaint", "inquiry", "correction"].includes(value);
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  // 현재 로그인 사용자 정보 조회
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 쿼리 파라미터 기준으로 초기 문의 유형 결정
  const { type } = await searchParams;
  const requestedType = Array.isArray(type) ? type[0] : type;
  const initialType: ContactItem["type"] =
    requestedType && isContactType(requestedType) ? requestedType : "inquiry";

  return (
    <>
      {/* 문의 페이지 상단 타이틀 영역 */}
      <PageTitle
        subtitle="Contact"
        title="문의하기"
        description="사용하시면서 궁금한 점이 있다면 부담 없이 문의해 주세요!"
      />

      {/* 로그인 여부에 따라 문의 폼 또는 로그인 안내 화면 분기 */}
      {user ? (
        <PageContact
          key={initialType}
          initialType={initialType}
          userEmail={user.email ?? ""}
        />
      ) : (
        <PageLogin />
      )}
    </>
  );
}
