import { Request, Response } from "express";
import { ChallengeResponseDTO } from "../dto/challenge/challenge-response";
import { ApiResponse } from "../dto/shared/api-response";
import { CUIDIdentitySchema } from "../dto/shared/uid-identity";
import { IDIdentitySchema } from "../dto/shared/id-identity";
import { ChallengeService } from "../services/challenge.service";
import { CreateChallengeSchema } from "../dto/challenge/create-challenge";

export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  getAllChallenges = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.session?.user?.id;
    let parsedUser;

    if (userId) {
      const result = IDIdentitySchema.safeParse({ id: userId });
      if (result.success) {
        parsedUser = result.data;
      }
    }

    const challenges = await this.challengeService.getAllChallenges(parsedUser);

    res.status(200).json({
      success: true,
      message: "Challenges retrieved successfully",
      data: challenges,
    } satisfies ApiResponse<Array<ChallengeResponseDTO>>);
  };

  getChallengeById = async (req: Request, res: Response): Promise<void> => {
    const parsed = CUIDIdentitySchema.safeParse({ cuid: req.params.id });

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const challenge = await this.challengeService.getChallengeById(parsed.data);

    res.status(200).json({
      success: true,
      message: "Challenge retrieved successfully",
      data: challenge,
    } satisfies ApiResponse<ChallengeResponseDTO>);
  };

  completeChallenge = async (req: Request, res: Response): Promise<void> => {
    const parsedStart = CUIDIdentitySchema.safeParse({ cuid: req.params.id });
    if (!parsedStart.success) {
      throw new Error(parsedStart.error.message);
    }

    const userId = res.locals.session?.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const parsedUser = IDIdentitySchema.safeParse({ id: userId });
    if (!parsedUser.success) {
      throw new Error("Invalid user ID");
    }

    const completedNew = await this.challengeService.completeChallenge(
      parsedUser.data,
      parsedStart.data,
    );

    res.status(200).json({
      success: true,
      message: completedNew
        ? "Challenge completed successfully"
        : "Challenge already completed",
      data: null,
    } satisfies ApiResponse<null>);
  };

  failChallenge = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.session?.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const parsedUser = IDIdentitySchema.safeParse({ id: userId });
    if (!parsedUser.success) {
      throw new Error("Invalid user ID");
    }

    await this.challengeService.failChallenge(parsedUser.data);

    res.status(200).json({
      success: true,
      message: "Heart lost",
      data: null,
    } satisfies ApiResponse<null>);
  };

  createChallenge = async (req: Request, res: Response): Promise<void> => {
    const parsed = CreateChallengeSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new Error(`Validation error: ${parsed.error.message}`);
    }

    const challenge = await this.challengeService.createChallenge(parsed.data);

    res.status(201).json({
      success: true,
      message: "Challenge created successfully",
      data: challenge as any,
    });
  };

  startChallenge = async (req: Request, res: Response): Promise<void> => {
    const parsedStart = CUIDIdentitySchema.safeParse({ cuid: req.params.id });
    if (!parsedStart.success) {
      throw new Error(parsedStart.error.message);
    }

    const userId = res.locals.session?.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const parsedUser = IDIdentitySchema.safeParse({ id: userId });
    if (!parsedUser.success) {
      throw new Error("Invalid user ID");
    }

    const challenge = await this.challengeService.startChallenge(
      parsedUser.data,
      parsedStart.data,
    );

    res.status(200).json({
      success: true,
      message: "Challenge started! 1 Heart deducted.",
      data: challenge,
    } satisfies ApiResponse<any>);
  };
}
