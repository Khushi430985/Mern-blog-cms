// --- imports & env ---
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";

// --- routes ---
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js"; // if you added posts

// --- app init ---
const app = express();

// --- middlewares ---
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-blog-cms-seven.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// --- health route ---
app.get("/", (_req, res) => res.json({ ok: true, message: "Blog CMS API running 🚀" }));

// --- mount routes (after app is defined) ---
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); // comment out if posts not added yet

// --- db & server start ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "mern_blog_cms",
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
})();
