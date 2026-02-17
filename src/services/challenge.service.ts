import { PrismaClient } from "@prisma/client";
import { UserService } from "./user.service";
import { CUIDIdentityDTO } from "../dto/shared/uid-identity";
import { IDIdentityDTO } from "../dto/shared/id-identity";
import { ChallengeWithQuestionsSchema } from "../dto/challenge/challenge-response";
import { CreateChallengeDTO } from "../dto/challenge/create-challenge";

export class ChallengeService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userService: UserService,
  ) {}

  getAllChallenges = async (userID?: IDIdentityDTO) => {
    const challenges = await this.prisma.challenge.findMany({
      include: {
        completedBy: userID?.id
          ? {
              where: { userId: userID.id },
            }
          : undefined,
      },
    });

    return challenges.map((challenge) => ({
      ...challenge,
      completed: challenge.completedBy
        ? challenge.completedBy.length > 0
        : false,
      completedBy: undefined,
    }));
  };

  getChallengeById = async (challengeCUID: CUIDIdentityDTO) => {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeCUID.cuid },
      include: {
        questions: true,
      },
    });

    if (!challenge) {
      throw new Error("Challenge not found");
    }

    return ChallengeWithQuestionsSchema.parse(challenge);
  };

  completeChallenge = async (
    userID: IDIdentityDTO,
    challengeCUID: CUIDIdentityDTO,
  ): Promise<boolean> => {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeCUID.cuid },
      select: { id: true, xp: true, coins: true },
    });

    if (!challenge) throw new Error("Challenge not found");

    return await this.prisma.$transaction(
      async (tx) => {
        /* Verify active challenge */
        const user = await tx.user.findUnique({
          where: { id: userID.id },
          select: { currentChallengeId: true },
        });

        if (!user || user.currentChallengeId !== challenge.id) {
          throw new Error("Challenge not started. You must pay a heart to start.");
        }

        const existing = await tx.userChallenge.findUnique({
          where: {
            userId_challengeId: {
              userId: userID.id,
              challengeId: challengeCUID.cuid,
            },
          },
        });

        if (existing) return false;

        // 1. Create the completion record
        await tx.userChallenge.create({
          data: {
            userId: userID.id,
            challengeId: challenge.id,
          },
        });

        // 2. Award XP (Triggers Level Up logic + Badges)
        await this.userService.gainXP(
          {
            userId: userID.id,
            amountXPGain: challenge.xp,
          },
          tx,
        );

        // 3. Update Challenge Count & Clear Active Challenge
        await tx.user.update({
          where: { id: userID.id },
          data: {
            completedChallengesCount: { increment: 1 },
            currentChallengeId: null,
          },
        });

        // 4. Update Streak
        await this.userService.updateStreak(userID.id, tx);

        // 5. Refund Heart (Up to 5)
        await this.userService.refundHeart(userID.id, tx, 5);

        // 6. Award Challenge Coins
        await this.userService.gainCoins(userID.id, challenge.coins, tx);

        return true;
      },
      { timeout: 10000 },
    );
  };

  startChallenge = async (
    userID: IDIdentityDTO,
    challengeCUID: CUIDIdentityDTO,
  ) => {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Check hearts
      const user = await tx.user.findUnique({
        where: { id: userID.id },
        select: { hearts: true },
      });

      if (!user || user.hearts <= 0) {
        throw new Error("No hearts remaining");
      }

      // 2. Pay the fee
      await this.userService.loseHeart(userID.id, tx);

      // 3. Set Active Challenge
      await tx.user.update({
        where: { id: userID.id },
        data: { currentChallengeId: challengeCUID.cuid },
      });

      // 4. Get challenge data
      const challenge = await tx.challenge.findUnique({
        where: { id: challengeCUID.cuid },
        include: {
          questions: true,
        },
      });

      if (!challenge) {
        throw new Error("Challenge not found");
      }

      return ChallengeWithQuestionsSchema.parse(challenge);
    });
  };

  failChallenge = async (userID: IDIdentityDTO): Promise<void> => {
    await this.prisma.user.update({
      where: { id: userID.id },
      data: { currentChallengeId: null },
    });
  };

  // getCompletedChallengesByUserId = async (userID: IDIdentityDTO) => {
  //   const userChallenges = await this.prisma.userChallenge.findMany({
  //     where: { userId: userID.id },
  //     include: {
  //       challenge: true,
  //     },
  //   });

  //   return userChallenges.map((uc) => uc.challenge);
  // };

  createChallenge = async (data: CreateChallengeDTO) => {
    // Data is already validated by Controller
    const challenge = await this.prisma.challenge.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        xp: Number(data.xp),
        tags: data.tags.split(",").map((t: string) => t.trim()), // Basic splitting
        questions: {
          create: data.questions.map((q: any) => ({
            question: q.question,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });
    return challenge;
  };
}
