import { z } from "zod";

export const profileNameSchema = z.object({
  full_name: z
    .string()
    .min(3, "이름은 3자 이상이어야 합니다.")
    .max(18, "이름은 18자 이내여야 합니다."),
});
