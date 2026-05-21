import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const GEMINI_API_KEY = config.GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

// ================= IMAGE ANALYSIS =================
export async function analyzeImage(file) {
    try {
        const base64Image = Buffer.from(file.buffer).toString("base64");

        const contents = [
            {
                inlineData: {
                    mimeType: file.mimetype,
                    data: base64Image,
                },
            },
            {
                text: "Analyze this uploaded document or credential.",
            },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction: `
Analyze the uploaded image and determine whether the credential or document looks real or suspicious.

Check for:
- signs of tampering
- editing artifacts
- fake elements
- inconsistencies

Classify the result as:
- "Valid-looking"
- "Suspicious"
- "Cannot determine"

Give a short and clear explanation between 20 to 50 words.
                `,
            },
        });

        return response.text?.trim();
    } catch (error) {
        console.error("Image analysis error:", error);

        return "Unable to analyze image.";
    }
}

// ================= TEXT ANALYSIS =================
export async function textAnalyze(text) {
    try {
        const contents = [
            {
                text: `
Analyze the following text and return ONLY valid JSON.

Text:
${text}
                `,
            },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                responseMimeType: "application/json",

                systemInstruction: `
You are a secure text analysis assistant.

Return ONLY valid JSON with this exact structure:

{
  "classification": "Safe | Suspicious | Harmful",
  "explanation": "short reason",
  "suggestion": "how to improve safety",
  "score": 0
}

Rules:
- score must be integer between 0 and 100
- no markdown
- no extra text
- JSON only
                `,
            },
        });

        let rawText = response.text?.trim();

        // Remove markdown code blocks if Gemini adds them
        rawText = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsedJson = null;

        try {
            parsedJson = JSON.parse(rawText);
        } catch (error) {
            console.warn(
                "Unable to parse Gemini response as JSON:",
                rawText
            );
        }

        return {
            raw: rawText,
            parsed: parsedJson,
        };
    } catch (error) {
        console.error("Text analysis error:", error);

        return {
            raw: null,
            parsed: null,
            error: "Failed to analyze text.",
        };
    }
}

// ================= IMAGE QUESTION ANSWERING =================
export async function askImageQuestion(imageDescription, question) {
    try {
        const contents = [
            {
                text: `
Image description:
${imageDescription}

Question:
${question}
                `,
            },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction: `
You are an assistant that answers questions about an image from its description.

Keep the answer:
- short
- clear
- accurate
                `,
            },
        });

        return response.text?.trim();
    } catch (error) {
        console.error("Image question error:", error);

        return "Unable to answer the question.";
    }
}