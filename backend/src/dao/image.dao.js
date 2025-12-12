import aiPlantModel from "../models/image.model.js"




export async function analyzeImageText(data){
    const { url, description } = data

    const analyzedImage = await aiPlantModel.create({
        image: url,
        description,
    })

    return analyzedImage
}