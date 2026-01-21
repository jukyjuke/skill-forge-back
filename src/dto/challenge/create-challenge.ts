import { z } from "zod";

export const CreateChallengeSchema = z.strictObject({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  xp: z.number().int().positive(),
  coins: z.number().int().nonnegative().default(20),
  tags: z.string(),
  questions: z
    .array(
      z.strictObject({
        question: z.string().min(5),
        options: z.array(z.string()).min(2),
        answer: z.number().int().min(0),
      }),
    )
    .min(1),
});

export type CreateChallengeDTO = z.infer<typeof CreateChallengeSchema>;
