import { z } from "zod";

// 프로필 이름 변경 폼 스키마
export const profileNameSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "이름은 3자 이상이어야 합니다.")
    .max(18, "이름은 18자 이내여야 합니다."),
});

// 문의하기 폼 스키마
export const contactSchema = z.object({
  email: z.email("올바른 이메일 형식을 입력해주세요"),
  title: z
    .string()
    .min(2, "제목은 2자 이상이어야 합니다.")
    .max(100, "제목은 100자 이내여야 합니다."),
  message: z
    .string()
    .min(10, "내용은 10자 이상이어야 합니다.")
    .max(2000, "내용은 2000자 이내여야 합니다."),
});
