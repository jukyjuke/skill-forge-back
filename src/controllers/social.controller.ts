import { Request, Response } from "express";
import { ISocialService } from "../services/interfaces/ISocialService";

export class SocialController {
  constructor(private socialService: ISocialService) {}

  follow = async (req: Request, res: Response): Promise<void> => {
    try {
      const { followingId } = req.body;
      const followerId = res.locals.session?.user?.id;

      if (!followerId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      if (typeof followingId !== "string") {
        res.status(400).json({ success: false, error: "Invalid followingId" });
        return;
      }

      await this.socialService.followUser(followerId, followingId);
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  unfollow = async (req: Request, res: Response): Promise<void> => {
    try {
      const { followingId } = req.params;
      const followerId = res.locals.session?.user?.id;

      if (!followerId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      if (typeof followingId !== "string") {
        res.status(400).json({ success: false, error: "Invalid followingId" });
        return;
      }

      await this.socialService.unfollowUser(followerId, followingId);
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getFollowers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      if (typeof userId !== "string") {
        res.status(400).json({ success: false, error: "Invalid userId" });
        return;
      }
      const followers = await this.socialService.getFollowers(userId);
      res.status(200).json({ success: true, data: followers });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getFollowing = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      if (typeof userId !== "string") {
        res.status(400).json({ success: false, error: "Invalid userId" });
        return;
      }
      const following = await this.socialService.getFollowing(userId);
      res.status(200).json({ success: true, data: following });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  getFeed = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.session?.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      const feed = await this.socialService.getSocialFeed(userId);
      res.status(200).json({ success: true, data: feed });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  checkFollowing = async (req: Request, res: Response): Promise<void> => {
    try {
      const { followingId } = req.params;
      const followerId = res.locals.session?.user?.id;

      if (!followerId) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
      }

      if (typeof followingId !== "string") {
        res.status(400).json({ success: false, error: "Invalid followingId" });
        return;
      }

      const isFollowing = await this.socialService.isFollowing(
        followerId,
        followingId,
      );
      res.status(200).json({ success: true, data: { isFollowing } });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}
