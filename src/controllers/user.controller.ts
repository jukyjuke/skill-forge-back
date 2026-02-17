import { UserService } from "../services/user.service";
import { GainXPSchema, GainXPDTO } from "../dto/user/gain-xp";
import { UpdatePasswordSchema } from "../dto/user/update-password";
import { UpdateEmailSchema } from "../dto/user/update-email";
import { Request, Response } from "express";
import { ApiResponse } from "../dto/shared/api-response";

export class UserController {
  constructor(private readonly userService: UserService) {}

  gainXp = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = GainXPSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({ success: false, error: parsed.error.message });
        return;
      }

      const sessionUserId = res.locals.session?.user?.id;
      if (!sessionUserId || sessionUserId !== parsed.data.userId) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }

      await this.userService.gainXP(parsed.data);
      res.status(200).json({
        success: true,
        message: "XP gained successfully",
        data: parsed.data,
      } satisfies ApiResponse<GainXPDTO>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
          details: error,
        },
      });
    }
  };

  updatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = UpdatePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, error: parsed.error.message });
        return;
      }

      const sessionUserId = res.locals.session?.user?.id;
      if (sessionUserId && sessionUserId !== parsed.data.userId) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }

      await this.userService.updatePassword(parsed.data);
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  updateEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = UpdateEmailSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, error: parsed.error.message });
        return;
      }

      const sessionUserId = res.locals.session?.user?.id;
      if (sessionUserId && sessionUserId !== parsed.data.userId) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }

      await this.userService.updateEmail(parsed.data);
      res.status(200).json({
        success: true,
        message: "Email updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({
          success: false,
          error: "User ID is required and must be a string",
        });
        return;
      }

      const sessionUserId = res.locals.session?.user?.id;
      if (sessionUserId && sessionUserId !== userId) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }

      await this.userService.deleteAccount(userId);
      res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
  getActivity = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({
          success: false,
          error: "User ID is required and must be a string",
        });
        return;
      }

      const activity = await this.userService.getActivity(userId);
      res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  getPublicProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({
          success: false,
          error: "User ID is required and must be a string",
        });
        return;
      }

      const profile = await this.userService.getPublicProfile(userId);
      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message || "User not found",
      });
    }
  };

  checkHearts = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.session?.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      const user = await this.userService.checkAndRegenerateHearts(userId);
      res.status(200).json({
        success: true,
        data: {
          hearts: user.hearts,
          lastHeartLoss: user.lastHeartLoss,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}
