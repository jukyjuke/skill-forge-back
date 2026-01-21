import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { userController } from "../container/app.context";

const router = Router();

/* GET -------------------------------------------------- */
router.get("/hearts-check", requireAuth, userController.checkHearts);
router.get("/:userId", userController.getPublicProfile);
router.get("/:userId/activity", userController.getActivity);

/* POST -------------------------------------------------- */
router.post("/gain-xp", requireAuth, userController.gainXp);

/* PATCH -------------------------------------------------- */
router.patch("/update-password", requireAuth, userController.updatePassword);
router.patch("/update-email", requireAuth, userController.updateEmail);

/* DELETE -------------------------------------------------- */
router.delete("/:userId", requireAuth, userController.deleteAccount);

export default router;
