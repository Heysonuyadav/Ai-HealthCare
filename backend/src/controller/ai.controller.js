import {v4 as uuidv4} from "uuid"
import { analyzeImageText } from "../dao/image.dao.js";
import { uploadFile } from "../services/storage.service.js";
import { analyzeImage, textAnalyze } from "../services/ai.service.js";
import { textAnalisis } from "../dao/text.dao.js";




export async function analyzeImageController(req, res){
    const file = await uploadFile(req.file, uuidv4());
    const description = await analyzeImage(req.file);
    
    const imageText = await analyzeImageText({
        url: file.url,
        description: description,
    })
    res.status(200).json({
        message: "Image analyzed successfully",
        imageText
     });
}

// import { analyzeText, analyzeTextWithFallback, getAvailableModels } from "../services/analysis.service.js";

export async function analyzeTextController(req, res) {
    const { inputText } = req.body;

    if (!inputText) {
        return res.status(400).json({ error: "inputText is required" });
    }

    const description = await textAnalyze(inputText);

    const texts = await textAnalisis({
        inputText,
        description
    });

    res.status(201).json({
        message: "text analyzed successfully",
        texts
    });
}
