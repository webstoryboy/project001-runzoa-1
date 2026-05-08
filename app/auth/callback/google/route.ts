import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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
      // 1. 탈퇴한 계정인지 확인 (supabaseAdmin으로 RLS 우회)
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("is_deleted, visit_count")
        .eq("id", userId)
        .single();

      if (profile?.is_deleted === true) {
        await supabase.auth.signOut();
        const url = new URL("/", baseUrl);
        url.searchParams.set("error", "deleted");
        return NextResponse.redirect(url);
      }
      const isFirstLogin = profile?.visit_count === 0;

      // 2. 방문 횟수 증가
      try {
        await supabase.rpc("increment_visit_count");
      } catch (rpcError) {
        console.error("방문 횟수 증가 실패:", rpcError);
      }

      // 4. 로그인 성공 리다이렉트
      const url = new URL(next, baseUrl);
      url.searchParams.set("login", isFirstLogin ? "welcome" : "success");
      return NextResponse.redirect(url);
    }
  }

  const failUrl = new URL("/", baseUrl);
  failUrl.searchParams.set("error", "error");
  return NextResponse.redirect(failUrl);
}
