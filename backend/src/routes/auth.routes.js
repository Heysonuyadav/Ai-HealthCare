import express from "express";
import { createUserController, loginUserController } from "../controller/auth.controller.js";


const router = express.Router();


router.post("/register", 
    createUserController);

router.post("/login", 
    loginUserController)


export default router;