



import aiTextModel from "../models/text.model.js";

export async function textAnalisis(data) {
    const { inputText, description } = data;

    const analyzedText = await aiTextModel.create({
        inputText,
        description
    });

    return analyzedText;
}
