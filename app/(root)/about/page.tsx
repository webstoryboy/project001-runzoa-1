import { APP_ENG_NAME, APP_NAME } from "@/lib/constants";
import PageTitle from "@/components/page/page-title";
import PageAbout from "@/components/page/page-about";

export const metadata = {
  title: `${APP_NAME} 소개 | ${APP_ENG_NAME} About`,
  description: `${APP_NAME} 서비스 소개와 개발 과정, 기술 구성, 앞으로의 운영 방향을 안내합니다.`,
};

export default function IntroPage() {
  return (
    <>
      <PageTitle
        subtitle="About"
        title="런조아 소개"
        description="전국 마라톤과 해외 러닝 이벤트를 더 쉽고 편리하게 찾을 수 있도록, 런조아의 서비스와 운영 방향을 소개합니다."
      />
      <PageAbout />
    </>
  );
}
