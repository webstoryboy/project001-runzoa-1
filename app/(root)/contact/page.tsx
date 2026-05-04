import { APP_NAME, APP_ENG_NAME } from "@/lib/constants";
import PageContact, { type ContactType } from "@/components/page/page-contact";
import PageTitle from "@/components/page/page-title";

const isContactType = (value: string): value is ContactType => {
  return ["complaint", "inquiry", "correction"].includes(value);
};

export const metadata = {
  title: `${APP_NAME} 문의하기 | ${APP_ENG_NAME} Contact`,
  description: `${APP_NAME} 서비스 이용 중 궁금한 점, 마라톤 대회 정보 오류 제보, 데이터 추가 요청 등 문의 사항을 남겨주세요. 빠르고 정확하게 안내해드립니다.`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const requestedType = Array.isArray(type) ? type[0] : type;
  const initialType: ContactType = requestedType && isContactType(requestedType)
    ? requestedType
    : "inquiry";

  return (
    <>
      <PageTitle
        subtitle="Contact"
        title="문의하기"
        description="사용하시면서 궁금한 점이 있다면 부담 없이 문의해 주세요!"
      />
      <PageContact key={initialType} initialType={initialType} />
    </>
  );
}
