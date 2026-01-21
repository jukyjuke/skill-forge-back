import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
  user: {
    // Required to receive custom fields from the client?
    additionalFields: {
      xp: {
        type: "number",
        defaultValue: 0,
      },
      completedChallengesCount: {
        type: "number",
        defaultValue: 0,
      },
      badges: {
        type: "string[]",
        defaultValue: [],
      },
      streak: {
        type: "number",
        defaultValue: 0,
      },
      lastActive: {
        type: "date",
      },
      maxStreak: {
        type: "number",
        defaultValue: 0,
      },
      hearts: {
        type: "number",
        defaultValue: 3,
      },
      lastHeartLoss: {
        type: "date",
      },
      role: {
        type: "string",
        defaultValue: "USER",
      },
      coins: {
        type: "number",
        defaultValue: 0,
      },
    },
  },
});
