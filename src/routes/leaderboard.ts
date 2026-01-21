import { Router } from "express";
import { leaderboardController } from "../container/app.context";
// import { requireAuth } from "../middlewares/auth";

const router = Router();

/* GET -------------------------------------------------- */
router.get("/", leaderboardController.getGlobalLeaderboard);

export default router;
