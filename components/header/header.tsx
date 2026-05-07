import { createClient } from "@/lib/supabase/server";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .single()
    : { data: null };

  return (
    <header className="header__container">
      <div className="flex items-center justify-between">
        <HeaderLeft />
        <HeaderRight user={user} profile={profile} />
      </div>
    </header>
  );
}
