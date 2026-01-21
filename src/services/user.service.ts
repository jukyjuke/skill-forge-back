import { IUserService } from "./interfaces/IUserService";
import { PrismaClient, Prisma } from "@prisma/client";
import { GainXPDTO } from "../dto/user/gain-xp";
import { UpdatePasswordDTO } from "../dto/user/update-password";
import { UpdateEmailDTO } from "../dto/user/update-email";
import { IBadgeService } from "./interfaces/IBadgeService";

export class UserService implements IUserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly badgeService: IBadgeService,
  ) {}

  async gainXP(data: GainXPDTO, tx?: Prisma.TransactionClient): Promise<void> {
    const { userId, amountXPGain } = data;
    const db = tx || this.prisma;

    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { xp: true },
      });

      if (!user) throw new Error("User not found");
      const oldLevel = Math.floor(user.xp / 1000) + 1;

      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { xp: { increment: amountXPGain } },
        select: { xp: true },
      });

      const newLevel = Math.floor(updatedUser.xp / 1000) + 1;

      /* Level Up */
      if (newLevel > oldLevel) {
        const levelsGained = newLevel - oldLevel;
        await this.gainCoins(userId, levelsGained * 50, db);
      }

      /* Badge */
      await this.badgeService.checkAndAwardBadges(userId, db);
    } catch (error) {
      throw new Error("Failed to gain XP?");
    }
  }

  /* Update Password -------------------------------------------------- */
  async updatePassword(data: UpdatePasswordDTO): Promise<void> {
    const { userId, newPassword } = data;
    try {
      await this.prisma.account.updateMany({
        where: { userId, providerId: "email" },
        data: { password: newPassword },
      });
    } catch (error) {
      throw new Error("Failed to update password");
    }
  }

  /* Update Email -------------------------------------------------- */
  async updateEmail(data: UpdateEmailDTO): Promise<void> {
    const { userId, newEmail } = data;
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { email: newEmail },
      });
    } catch (error) {
      throw new Error("Failed to update email");
    }
  }

  /* Delete Account -------------------------------------------------- */
  async deleteAccount(userId: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      throw new Error("Failed to delete account");
    }
  }

  /* Update Streak -------------------------------------------------- */
  async updateStreak(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const db = tx || this.prisma;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { streak: true, lastActive: true, maxStreak: true },
    });

    if (!user) throw new Error("User not found");

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (!user.lastActive) {
      await db.user.update({
        where: { id: userId },
        data: { streak: 1, lastActive: now, maxStreak: 1 },
      });
      return;
    }

    const lastActive = new Date(user.lastActive);
    const lastActiveDate = new Date(
      lastActive.getFullYear(),
      lastActive.getMonth(),
      lastActive.getDate(),
    );

    const diffTime = today.getTime() - lastActiveDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      await db.user.update({
        where: { id: userId },
        data: { lastActive: now },
      });
    } else if (diffDays === 1) {
      const newStreak = user.streak + 1;
      await db.user.update({
        where: { id: userId },
        data: {
          streak: newStreak,
          lastActive: now,
          maxStreak: Math.max(newStreak, user.maxStreak),
        },
      });
    } else {
      await db.user.update({
        where: { id: userId },
        data: { streak: 1, lastActive: now },
      });
    }
  }

  /* Get Activity -------------------------------------------------- */
  async getActivity(userId: string): Promise<number[]> {
    const counts: number[] = Array(15).fill(0);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 14);
    fifteenDaysAgo.setHours(0, 0, 0, 0);

    const activities = await this.prisma.userChallenge.findMany({
      where: {
        userId,
        completedAt: {
          gte: fifteenDaysAgo,
        },
      },
      select: {
        completedAt: true,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    activities.forEach((activity) => {
      const activityDate = new Date(activity.completedAt);
      activityDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - activityDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < 15) {
        counts[14 - diffDays]++;
      }
    });

    return counts;
  }

  /* Get Public Profile -------------------------------------------------- */
  async getPublicProfile(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        image: true,
        xp: true,
        badges: true,
        streak: true,
        createdAt: true,
        completedChallengesCount: true,
        hearts: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async loseHeart(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hearts: true },
    });

    if (!user || user.hearts <= 0) return;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hearts: { decrement: 1 },
        lastHeartLoss: new Date(),
      },
    });
  }

  /* Refund Heart -------------------------------------------------- */
  async refundHeart(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const db = tx || this.prisma;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { hearts: true },
    });

    /* If user not found or hearts is 3 or more, return */
    if (!user || user.hearts >= 3) return;

    await db.user.update({
      where: { id: userId },
      data: {
        hearts: { increment: 1 },
        lastHeartLoss: user.hearts + 1 >= 3 ? null : undefined,
      },
    });
  }

  /* Check and Regenerate Hearts -------------------------------------------------- */
  async checkAndRegenerateHearts(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, hearts: true, lastHeartLoss: true },
    });

    if (!user || user.hearts >= 3 || !user.lastHeartLoss) return user;

    const now = new Date();
    const lastLoss = new Date(user.lastHeartLoss);
    const diffMs = now.getTime() - lastLoss.getTime();
    const hoursSinceLoss = diffMs / (1000 * 60 * 60);

    if (hoursSinceLoss >= 8) {
      const heartsToRegain = Math.floor(hoursSinceLoss / 8);
      const newHeartsCount = Math.min(3, user.hearts + heartsToRegain);

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          hearts: newHeartsCount,
          lastHeartLoss:
            newHeartsCount === 3
              ? null
              : new Date(
                  lastLoss.getTime() + heartsToRegain * 8 * 60 * 60 * 1000,
                ),
        },
      });
      return updatedUser;
    }

    return user;
  }

  /* Gain Coins -------------------------------------------------- */
  async gainCoins(
    userId: string,
    amount: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const db = tx || this.prisma;
    await db.user.update({
      where: { id: userId },
      data: {
        coins: { increment: amount },
      },
    });
  }

  /* Buy Heart -------------------------------------------------- */
  async buyHeart(
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    const HEART_COST = 50; // Cost of 1 heart
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hearts: true, coins: true },
    });

    if (!user) throw new Error("User not found");

    /* If user has 5 hearts or more, return */
    if (user.hearts >= 5) {
      return {
        success: false,
        message: "Vous avez déjà le maximum de coeurs !",
      };
    }

    /* If user has less than 50 coins, return */
    if (user.coins < HEART_COST) {
      return { success: false, message: "Pas assez de coins !" };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        coins: { decrement: HEART_COST },
        hearts: { increment: 1 },
        lastHeartLoss: user.hearts + 1 >= 3 ? null : undefined,
      },
    });

    return { success: true, message: "Coeur acheté avec succès !" };
  }
}
