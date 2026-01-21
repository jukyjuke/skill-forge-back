import { PrismaClient } from "@prisma/client";
import { ISocialService } from "./interfaces/ISocialService";

export class SocialService implements ISocialService {
  constructor(private prisma: PrismaClient) {}

  /* Follow User -------------------------------------------------- */
  async followUser(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself");
    }

    try {
      await (this.prisma as any).follow.create({
        data: {
          followerId,
          followingId,
        },
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    try {
      await (this.prisma as any).follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  }

  /* Get Followers -------------------------------------------------- */
  async getFollowers(userId: string): Promise<any[]> {
    const follows = await (this.prisma as any).follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            image: true,
            xp: true,
          },
        },
      },
    });
    return follows.map((f: any) => f.follower);
  }

  /* Get Following -------------------------------------------------- */
  async getFollowing(userId: string): Promise<any[]> {
    const follows = await (this.prisma as any).follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            image: true,
            xp: true,
          },
        },
      },
    });
    return follows.map((f: any) => f.following);
  }

  /* Is Following -------------------------------------------------- */
  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await (this.prisma as any).follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return !!follow;
  }

  /* Get Social Feed -------------------------------------------------- */
  async getSocialFeed(userId: string, limit = 20): Promise<any[]> {
    /* Get users followed by this user */
    const following = await (this.prisma as any).follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f: any) => f.followingId);

    if (followingIds.length === 0) return [];

    /* Get recent activity (completed challenges) from followed users */
    const activities = await this.prisma.userChallenge.findMany({
      where: {
        userId: { in: followingIds },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            xp: true,
          },
        },
      },
      orderBy: {
        completedAt: "desc",
      },
      take: limit,
    });

    return activities;
  }
}
