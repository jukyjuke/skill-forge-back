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

        // 3. Update Challenge Count
        await tx.user.update({
          where: { id: userID.id },
          data: {
            completedChallengesCount: { increment: 1 },
          },
        });

        // 4. Update Streak
        await this.userService.updateStreak(userID.id, tx);

        // 5. Refund Heart
        await this.userService.refundHeart(userID.id, tx);

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
    // 1. Check hearts
    const user = await this.prisma.user.findUnique({
      where: { id: userID.id },
      select: { hearts: true },
    });

    if (!user || user.hearts <= 0) {
      throw new Error("No hearts remaining");
    }

    // 2. Pay the fee
    await this.userService.loseHeart(userID.id);

    // 3. Get challenge data
    return this.getChallengeById(challengeCUID);
  };

  failChallenge = async (userID: IDIdentityDTO): Promise<void> => {
    // No-op in Pay-To-Play model.
    // Heart is already lost at start.
    // Keeping method signature for now but doing nothing.
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
