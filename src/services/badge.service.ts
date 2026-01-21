import { IBadgeService } from "./interfaces/IBadgeService";
import { PrismaClient, Prisma } from "@prisma/client";

export class BadgeService implements IBadgeService {
  constructor(private readonly prisma: PrismaClient) {}

  async checkAndAwardBadges(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<string[]> {
    const db = tx || this.prisma;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { xp: true, badges: true },
    });

    if (!user) return [];

    const currentBadges = new Set(user.badges);
    const newlyAwarded: string[] = [];

    /* Founder Badge (Everyone gets it for now as a member of the early community) */
    if (!currentBadges.has("fondateur")) {
      newlyAwarded.push("fondateur");
    }

    /* Level 10 Badge */
    const currentLevel = Math.floor(user.xp / 1000) + 1;

    if (currentLevel >= 10 && !currentBadges.has("lvl-10")) {
      newlyAwarded.push("lvl-10");
    }

    /* If there are new badges, update the user */
    if (newlyAwarded.length > 0) {
      await db.user.update({
        where: { id: userId },
        data: {
          badges: {
            push: newlyAwarded,
          },
        },
      });
      return [...user.badges, ...newlyAwarded];
    }

    return user.badges;
  }
}
