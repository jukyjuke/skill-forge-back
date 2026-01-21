import { Prisma } from "@prisma/client";

export interface IBadgeService {
  checkAndAwardBadges(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<string[]>;
}
