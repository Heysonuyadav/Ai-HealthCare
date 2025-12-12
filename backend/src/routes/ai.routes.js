import express from "express";
import multer, { memoryStorage } from "multer";
import { analyzeImageController, analyzeTextController } from "../controller/ai.controller.js";

// In your routes file (e.g., routes.js or app.js)

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory as buffer
const upload = multer({storage: memoryStorage()})
// Make sure your route uses the upload middleware
router.post('/analyze-image', 
    upload.single('image'), 
    analyzeImageController);


router.post("/text",
    analyzeTextController
)
export default router;