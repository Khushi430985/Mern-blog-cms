import { Router } from "express";
import { signup, login, me, logout } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logout);

export default router;
