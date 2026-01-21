import { Request, Response } from "express";
import { LeaderboardService } from "../services/leaderboard.service";
import { ApiResponse } from "../dto/shared/api-response";

export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  getGlobalLeaderboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const topUsers = await this.leaderboardService.getGlobalLeaderboard();

      res.status(200).json({
        success: true,
        message: "Leaderboard retrieved successfully",
        data: topUsers,
      } satisfies ApiResponse<any>);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve leaderboard",
        data: null,
      });
    }
  };
}
