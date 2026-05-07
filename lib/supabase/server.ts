import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Fluid 컴퓨트 환경을 사용하는 경우:
 * 이 클라이언트를 전역 변수로 선언하지 마세요.
 * 반드시 각 함수 내부에서 새롭게 생성해서 사용해야 합니다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /**
             * `setAll` 메서드가 Server Component 내부에서 호출된 경우 발생할 수 있습니다.
             * middleware에서 세션을 자동 갱신하고 있다면 무시해도 괜찮습니다.
             */
          }
        },
      },
    },
  );
}
