import mongoose from "mongoose";
import config from "../config/config.js";




function connectDB(){
    mongoose.connect(config.MONGODB_URL).then(()=>{
        console.log("database connected to backend");
        
    }).catch((err)=>{
        console.log("error in db ",err);
        
    })
}

export default connectDB