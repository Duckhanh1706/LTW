const express = require("express");
const Post = require("../data/postModel");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    return res.status(200).json({
      message: "Login successful",
      user: { username },
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
});
// thêm bài viết
router.post("/post", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// lấy tất cả bài viết
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// lấy theo slug
router.get("/post/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  cập nhật bài viết
router.patch("/post/:slug", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true },
    );

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// xoá bài viết
router.delete("/post/:slug", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
