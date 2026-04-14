const express = require("express");
const BlogPosts = require("./data/BlogPost");

const router = express.Router();

// list
router.get("/blogs", (req, res) => {
  const blogs = Object.keys(BlogPosts).map((slug) => ({
    slug,
    title: BlogPosts[slug].title,
  }));

  res.json(blogs);
});

// detail
router.get("/blogs/:slug", (req, res) => {
  const blog = BlogPosts[req.params.slug];

  if (!blog) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    slug: req.params.slug,
    ...blog,
  });
});

module.exports = router;
