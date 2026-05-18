import express from "express";
import { createUserController, loginUserController, getCurrentUserController, logoutController, authenticateToken } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/me", authenticateToken, getCurrentUserController);
router.post("/logout", authenticateToken, logoutController);

export default router;