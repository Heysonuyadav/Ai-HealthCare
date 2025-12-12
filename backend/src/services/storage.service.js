import Imagekit from "imagekit"
import config from "../config/config.js"


const imagekit = new Imagekit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_ENDPOINT_URL,
})
export async function uploadFile(file, filename) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: filename,
            folder: "new-porject"
        }, function (error, result) {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
                
            }
        })
    })
}