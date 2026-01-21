import { z } from "zod";

export const UpdateEmailSchema = z.object({
  userId: z.string(),
  newEmail: z.email("Invalid email address"),
});

export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;
