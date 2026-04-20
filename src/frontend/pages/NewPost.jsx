import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE, authFetch } from "../config/api";
import "../styles/form.css"; // ✅ dùng chung

export default function NewPost() {
  const [post, setPost] = useState({ slug: "", title: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    authFetch(`${API_BASE}/api/post`, {
      method: "POST",
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Post created!");
        setPost({ slug: "", title: "", description: "" });
        navigate("/posts");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error creating post");
      });
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create New Post</h2>

        <div className="form-group">
          <span>Slug:</span>
          <input
            placeholder="Slug"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
          />
        </div>

        <div className="form-group">
          <span>Title:</span>
          <input
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <span>Description:</span>
          <textarea
            placeholder="Description"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>

        <button type="submit" className="form-btn">
          Create
        </button>

        <p className="form-message">{message}</p>
      </form>
    </div>
  );
}
