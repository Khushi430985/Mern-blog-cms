import Post from "../models/Post.js";

// PUBLIC: only published posts (list)
export const getPosts = async (_req, res) => {
  const posts = await Post.find({ status: "published" })
    .sort({ createdAt: -1 })
    .select("title status createdAt");
  res.json({ ok: true, posts });
};

// PUBLIC: single published post
export const getPost = async (req, res) => {
  const p = await Post.findById(req.params.id).lean();
  if (!p) return res.status(404).json({ ok: false, message: "Post not found" });
  if (p.status !== "published") {
    return res.status(403).json({ ok: false, message: "Not published" });
  }
  res.json({ ok: true, post: p });
};

// ADMIN: list everything (draft + published)
export const getAllPostsAdmin = async (_req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json({ ok: true, posts });
};

// CREATE (admin only)
export const createPost = async (req, res) => {
  try {
    const { title, content, image, status } = req.body;
    if (!title || !content)
      return res.status(400).json({ ok: false, message: "Title and content are required" });

    const post = await Post.create({
      title,
      content,
      image,
      status: status || "draft",
      author: req.userId,
    });

    res.status(201).json({ ok: true, message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// UPDATE (admin only)
export const updatePost = async (req, res) => {
  try {
    const { title, content, image, status } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image, status },
      { new: true }
    );
    if (!post) return res.status(404).json({ ok: false, message: "Post not found" });
    res.json({ ok: true, message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// DELETE (admin only)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ ok: false, message: "Post not found" });
    res.json({ ok: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
