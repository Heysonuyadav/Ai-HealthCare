import { v4 as uuidv4 } from "uuid"
import { analyzeImageText } from "../dao/image.dao.js";
import { uploadFile } from "../services/storage.service.js";
import { analyzeImage, textAnalyze, askImageQuestion } from "../services/ai.service.js";
import { textAnalisis } from "../dao/text.dao.js";




export async function analyzeImageController(req, res) {
    try {
        // Validate input: check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Validate file type (basic check for images)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ error: "Invalid file type. Only image files are allowed." });
        }

        // Validate file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
            return res.status(400).json({ error: "File size too large. Maximum allowed is 5MB." });
        }

        console.log(`Analyzing image: ${req.file.originalname}`);

        const file = await uploadFile(req.file, uuidv4());
        const description = await analyzeImage(req.file);

        const imageText = await analyzeImageText({
            url: file.url,
            description: description,
        });

        res.status(200).json({
            success: true,
            message: "Image analyzed successfully",
            data: imageText
        });
    } catch (error) {
        console.error("Error in analyzeImageController:", error);
        res.status(500).json({ error: "Internal server error during image analysis" });
    }
}

export async function askImageQuestionController(req, res) {
    try {
        const { description, question } = req.body;

        if (!description || !question) {
            return res.status(400).json({ error: "Description and question are required." });
        }

        const answer = await askImageQuestion(description, question);

        res.status(200).json({
            success: true,
            answer
        });
    } catch (error) {
        console.error("Error in askImageQuestionController:", error);
        res.status(500).json({ error: "Internal server error during image question answering" });
    }
}

// import { analyzeText, analyzeTextWithFallback, getAvailableModels } from "../services/analysis.service.js";

export async function analyzeTextController(req, res) {
    try {
        const { inputText } = req.body;

        // Validate input: check if inputText exists and is a string
        if (!inputText || typeof inputText !== 'string') {
            return res.status(400).json({ error: "inputText is required and must be a string" });
        }

        // Validate text length (e.g., max 10000 characters)
        if (inputText.length > 10000) {
            return res.status(400).json({ error: "Input text too long. Maximum allowed is 10000 characters." });
        }

        // Basic sanitization: trim whitespace
        const sanitizedText = inputText.trim();
        if (!sanitizedText) {
            return res.status(400).json({ error: "Input text cannot be empty after trimming." });
        }

        console.log(`Analyzing text: ${sanitizedText.substring(0, 50)}...`);

        const descriptionResult = await textAnalyze(sanitizedText);
        const texts = await textAnalisis({
            inputText: sanitizedText,
            description: descriptionResult.raw || descriptionResult.parsed || ""
        });

        res.status(201).json({
            success: true,
            message: "Text analyzed successfully",
            data: {
                inputText: texts.inputText,
                description: texts.description,
                parsed: descriptionResult.parsed,
            }
        });
    } catch (error) {
        console.error("Error in analyzeTextController:", error);
        res.status(500).json({ error: "Internal server error during text analysis" });
    }
}
