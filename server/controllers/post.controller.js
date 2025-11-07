import Post from "../models/Post.js";

// CREATE POST
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
      author: req.userId, // from JWT middleware
    });

    res.status(201).json({ ok: true, message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  res.json({ ok: true, posts });
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email");
  if (!post) return res.status(404).json({ ok: false, message: "Post not found" });
  res.json({ ok: true, post });
};

// UPDATE POST
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

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ ok: false, message: "Post not found" });
    res.json({ ok: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
