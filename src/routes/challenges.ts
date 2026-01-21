import { Router } from "express";
import { challengeController } from "../container/app.context";
import { requireAuth } from "../middlewares/auth";
import { requireAdmin } from "../middlewares/admin";

const router = Router();

/* GET -------------------------------------------------- */
router.get("/", requireAuth, challengeController.getAllChallenges);
router.get("/:id", requireAuth, challengeController.getChallengeById);

/* POST -------------------------------------------------- */
router.post(
  "/",
  requireAuth,
  requireAdmin,
  challengeController.createChallenge,
);
router.post(
  "/:id/complete",
  requireAuth,
  challengeController.completeChallenge,
);
router.post("/:id/start", requireAuth, challengeController.startChallenge);
router.post("/:id/fail", requireAuth, challengeController.failChallenge);

export default router;
