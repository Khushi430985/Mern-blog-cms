import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, createPost);     // create
router.get("/", getPosts);                     // list all
router.get("/:id", getPost);                   // single post
router.put("/:id", requireAuth, updatePost);   // update
router.delete("/:id", requireAuth, deletePost);// delete

export default router;
