import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// ====== Middlewares ======
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ====== Test Route ======
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Blog CMS API running 🚀" });
});

// ====== Server + Mongo Connection ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Function to connect MongoDB and start server
(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "mern_blog_cms", // safe even if already present in URI
      serverSelectionTimeoutMS: 8000, // timeout after 8 seconds
    });

    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
})();
