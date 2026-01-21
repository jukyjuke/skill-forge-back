import { z } from "zod";

export const ChallengeResponseSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  xp: z.number(),
  coins: z.number(),
  tags: z.array(z.string()),
});

export type ChallengeResponseDTO = z.infer<typeof ChallengeResponseSchema>;

export const ChallengeWithQuestionsSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  xp: z.number(),
  coins: z.number(),
  tags: z.array(z.string()),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      options: z.array(z.string()),
      answer: z.number(),
    }),
  ),
});

export type ChallengeWithQuestionsDTO = z.infer<
  typeof ChallengeWithQuestionsSchema
>;
