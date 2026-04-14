import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function NewPost() {
  const [post, setPost] = useState({
    slug: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Post created!");
        setPost({ slug: "", title: "", description: "" }); // reset form
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error creating post");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>

      <span>Slug:</span>
      <br />
      <input
        value={post.slug}
        onChange={(e) => setPost({ ...post, slug: e.target.value })}
      />
      <br />

      <span>Title:</span>
      <br />
      <input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <br />

      <span>Description:</span>
      <br />
      <textarea
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
      <br />

      <button type="submit" onClick={() => navigate(`/posts`)}>
        Create
      </button>

      <p>{message}</p>
    </form>
  );
}
