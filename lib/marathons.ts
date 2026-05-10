import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { Marathon } from "@/lib/types";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export const fetchAllMarathons = unstable_cache(
  async (): Promise<Marathon[]> => {
    const { data } = await getSupabase()
      .from("marathons")
      .select(
        "id, slug, name, images_cover, event_start_at, registration_start_at, registration_status, registration_price, location_country, location_region, location_place, event_scale, event_type",
      )
      .order("event_start_at", { ascending: true, nullsFirst: false })
      .limit(200);
    return (data ?? []) as Marathon[];
  },
  ["all-marathons"],
  { revalidate: 3600, tags: ["marathons"] },
);

export const fetchMarathonBySlug = unstable_cache(
  async (slug: string): Promise<Marathon | null> => {
    const { data } = await getSupabase()
      .from("marathons")
      .select("*")
      .eq("slug", slug)
      .single();
    return (data ?? null) as Marathon | null;
  },
  ["marathon-by-slug"],
  { revalidate: 3600, tags: ["marathons"] },
);
