const express = require("express");
const Post = require("../data/postModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "your_secret_key";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded.user;
    next();
  });
}

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    const user = { username };
    jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
      if (err)
        return res.status(500).json({ message: "Error generating token" });
      return res.status(200).json({ token, user });
    });
  } else {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
});

// CREATE POST
router.post("/post", verifyToken, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL POSTS
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET POST BY SLUG
router.get("/post/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE POST
router.patch("/post/:slug", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE POST
router.delete("/post/:slug", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
