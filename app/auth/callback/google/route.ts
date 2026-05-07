import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) next = "/";

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseUrl =
    !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    const userId = data?.user?.id;

    if (!error && userId) {
      // 1. 탈퇴한 계정인지 확인
      const { data: isDeleted } = await supabase.rpc("is_my_account_deleted");
      if (isDeleted === true) {
        await supabase.auth.signOut();
        const url = new URL("/", baseUrl);
        url.searchParams.set("error", "deleted_account");
        return NextResponse.redirect(url);
      }

      // 2. 첫 로그인 여부 확인 (visit_count === 0이면 첫 방문)
      const { data: profile } = await supabase
        .from("profiles")
        .select("visit_count")
        .eq("id", userId)
        .single();
      const isFirstLogin = profile?.visit_count === 0;

      // 3. 방문 횟수 증가
      try {
        await supabase.rpc("increment_visit_count");
      } catch (rpcError) {
        console.error("방문 횟수 증가 실패:", rpcError);
      }

      // 4. 로그인 성공 리다이렉트
      const url = new URL(next, baseUrl);
      url.searchParams.set("login", isFirstLogin ? "first" : "success");
      return NextResponse.redirect(url);
    }
  }

  const failUrl = new URL("/", baseUrl);
  failUrl.searchParams.set("error", "error_code");
  return NextResponse.redirect(failUrl);
}
