import { z } from "zod";

export const IDIdentitySchema = z.strictObject({
  id: z
    .string()
    .min(20, "ID trop court")
    .max(64, "ID trop long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Format d'ID invalide"),
});

export type IDIdentityDTO = z.infer<typeof IDIdentitySchema>;
