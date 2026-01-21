import { z } from "zod";

export const UpdatePasswordSchema = z.object({
  userId: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
