import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE, authFetch } from "../config/api";
import "../styles/form.css"; // ✅ dùng chung

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/post/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setPost({
          title: data.title || "",
          description: data.description || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error loading post");
        setLoading(false);
      });
  }, [slug]);

  function handleSubmit(e) {
    e.preventDefault();

    authFetch(`${API_BASE}/api/post/${slug}`, {
      method: "PATCH",
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Updated successfully!");
        navigate("/posts");
      })
      .catch(() => {
        setMessage("❌ Update failed");
      });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Post</h2>

        <div className="form-group">
          <span>Title:</span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <span>Description:</span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>

        <button type="submit" className="form-btn">
          Update
        </button>

        <p className="form-message">{message}</p>
      </form>
    </div>
  );
}
