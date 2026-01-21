import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { ChallengeService } from "../services/challenge.service";
import { ChallengeController } from "../controllers/challenge.controller";
import { LeaderboardService } from "../services/leaderboard.service";
import { LeaderboardController } from "../controllers/leaderboard.controller";
import { SocialService } from "../services/social.service";
import { SocialController } from "../controllers/social.controller";
import { ShopController } from "../controllers/shop.controller";
import { BadgeService } from "../services/badge.service";
import { prisma } from "../lib/db";

const badgeService = new BadgeService(prisma);
const userService = new UserService(prisma, badgeService);
const challengeService = new ChallengeService(prisma, userService);
const leaderboardService = new LeaderboardService(prisma);
const socialService = new SocialService(prisma);

const userController = new UserController(userService);
const challengeController = new ChallengeController(challengeService);
const leaderboardController = new LeaderboardController(leaderboardService);
const socialController = new SocialController(socialService);
const shopController = new ShopController(userService);

export {
  userService,
  userController,
  challengeService,
  challengeController,
  leaderboardService,
  leaderboardController,
  socialService,
  socialController,
  shopController,
};
