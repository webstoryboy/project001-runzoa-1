import { APP_NAME, APP_ENG_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import PageTitle from "@/components/page/page-title";
import PageProfile from "@/components/page/page-profile";
import PageLogin from "@/components/page/page-login";

export const metadata = {
  title: `${APP_NAME} 내 정보 | ${APP_ENG_NAME} Profile`,
  description:
    "내 프로필 정보를 확인하고 수정할 수 있는 페이지입니다. 계정 정보와 서비스 이용 내역을 편리하게 관리해보세요.",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("id, email, full_name, avatar_url, signup_provider, role, visit_count, is_deleted, created_at, updated_at, deleted_at")
        .eq("id", user.id)
        .single()
    : { data: null };

  return (
    <>
      <PageTitle
        subtitle="Profile"
        title="프로필"
        description="내 프로필 정보를 확인하고 수정할 수 있는 페이지입니다."
      />
      {user ? <PageProfile profile={profile} /> : <PageLogin />}
    </>
  );
}
