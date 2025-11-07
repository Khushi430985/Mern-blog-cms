import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String }, // optional (later we’ll use upload)
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
