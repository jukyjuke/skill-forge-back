import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { socialController } from "../container/app.context";

const router = Router();

/* GET -------------------------------------------------- */
router.get("/followers/:userId", requireAuth, socialController.getFollowers);
router.get("/following/:userId", requireAuth, socialController.getFollowing);
router.get("/feed", requireAuth, socialController.getFeed);
router.get(
  "/is-following/:followingId",
  requireAuth,
  socialController.checkFollowing,
);

/* POST -------------------------------------------------- */
router.post("/follow", requireAuth, socialController.follow);

/* DELETE -------------------------------------------------- */
router.delete("/unfollow/:followingId", requireAuth, socialController.unfollow);

export default router;
