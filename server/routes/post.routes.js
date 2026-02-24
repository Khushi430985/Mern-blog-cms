import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getAllPostsAdmin,
} from "../controllers/post.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// PUBLIC (published only)
router.get("/", getPosts);
router.get("/:id", getPost);

// ADMIN (all + write)
router.get("/admin/all", requireAuth, requireAdmin, getAllPostsAdmin);
router.post("/", requireAuth, requireAdmin, createPost);
router.put("/:id", requireAuth, requireAdmin, updatePost);
router.delete("/:id", requireAuth, requireAdmin, deletePost);

export default router;
