import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { type ContactItem } from "@/lib/data";
import { contactSchema } from "@/lib/validations";

const TYPE_LABEL: Record<ContactItem["type"], string> = {
  complaint: "불편신고",
  inquiry: "문의사항",
  correction: "수정요청",
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, title, message } = parsed.data;
  const type = TYPE_LABEL[body.type as ContactItem["type"]] ?? "문의사항";

  const { error } = await supabaseAdmin.from("contacts").insert({
    user_id: user.id,
    user_email: email || user.email,
    type,
    title: title.trim(),
    content: message.trim(),
  });

  if (error) {
    console.error("문의 접수 실패:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
