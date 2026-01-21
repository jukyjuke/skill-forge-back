import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { shopController } from "../container/app.context";

const router = Router();

/* POST -------------------------------------------------- */
router.post("/buy-heart", requireAuth, shopController.buyHeart);

export default router;
