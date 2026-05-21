import express from "express";
import { createUserController, loginUserController, getCurrentUserController, logoutController, authenticateToken, authorizeRole, getAllUsersController, adminLoginController } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/admin-login", adminLoginController);
router.get("/me", authenticateToken, getCurrentUserController);
router.get("/users", authenticateToken, authorizeRole("admin"), getAllUsersController);
router.post("/logout", authenticateToken, logoutController);

export default router;