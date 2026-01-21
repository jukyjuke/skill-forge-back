import { PrismaClient } from "@prisma/client";

export class LeaderboardService {
  constructor(private readonly prisma: PrismaClient) {}

  /* Get Global Leaderboard -------------------------------------------------- */
  async getGlobalLeaderboard(limit: number = 50) {
    const users = await this.prisma.user.findMany({
      orderBy: {
        xp: "desc",
      },
      take: limit,
      select: {
        id: true,
        name: true,
        xp: true,
        image: true,
      },
    });

    return users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      xp: user.xp,
      image: user.image,
    }));
  }
}
