import textModel from "../models/text.model.js";

export async function saveText(data) {
    const { url, description } = data;

    const analyzedText = await textModel.create({
        url,
        description,
    });

    return analyzedText;
}
