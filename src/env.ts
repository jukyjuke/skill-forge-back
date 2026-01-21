import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .trim()
    .min(1, { message: "DATABASE_URL is required and cannot be empty" }),
  PORT: z.coerce.number().int().positive().max(65535).default(5000),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.issues);
  process.exit(1);
}

export const ENV = parsed.data;
