import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const imageModel = mongoose.model("Image", imageSchema);

export default imageModel;
