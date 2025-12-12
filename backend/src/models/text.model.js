import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    inputText: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const aiTextModel = mongoose.model("aiText", textSchema);

export default aiTextModel;
