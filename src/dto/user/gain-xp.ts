import { z } from "zod";

export const GainXPSchema = z.object({
  userId: z.string({ error: "User ID must be a valid CUID" }),
  amountXPGain: z.coerce
    .number({ error: "Amount must be a number" })
    .positive({ error: "Amount must be a positive number" })
    .max(100, { error: "Amount cannot exceed 100" }),
});

export type GainXPDTO = z.infer<typeof GainXPSchema>;
