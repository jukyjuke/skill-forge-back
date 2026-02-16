import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { ENV } from "../env";

const connectionString = ENV.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl:
    ENV.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      ENV.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
