import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {

    url: {
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

const urlModel = mongoose.model("Url", urlSchema);

export default urlModel;
