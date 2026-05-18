import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";


const GEMINI_API_KEY = config.GEMINI_API_KEY
const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function analyzeImage(file) {
    const base64Image = new Buffer.from(file.buffer).toString('base64');
    const contents = [
        {
            inlineData: {
                mimeType:file.mimetype,
                data: base64Image,
            },
        },
        { text: "Caption this image." },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{

            systemInstruction:`
            Analyze the uploaded image and determine whether the credential or document looks real or suspicious. 
Check for signs of tampering, editing, or fake elements. 
Classify the result as: "Valid-looking", "Suspicious", or "Cannot determine". 
Give a short and clear explanation. 
and the explanation should be between 20 to 50 words.
            `
        }

    });

    return response.text
}
// Function to get available models (for debugging)
export async function textAnalyze(text) {
    const contents = [{ text }];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
            systemInstruction: `
Analyze the text and classify it as Safe, Suspicious, or Harmful.
Explain the reason in 200–500 words and 200-500 characters.
Do not create harmful content.and give best suggetion to make it safe. also give a scrore from 0 to 100,
 where 0 is completely sayfe and 100 is extremely harmful, and the score should be between 0 to 100. `
        }
    });

    return response.text;   // ❗ FIXED — no parentheses
}
