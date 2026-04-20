import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE, authFetch } from "../config/api";
import "../styles/postlist.css";

export default function PostLists() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Kiểm tra đã login chưa qua token trong localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const navigate = useNavigate();

  function handleDelete(slug) {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    authFetch(`${API_BASE}/api/post/${slug}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Delete failed");
      });
  }

  useEffect(() => {
    fetch(`${API_BASE}/api/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading blogs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h1 className="title">📝 Blog List</h1>

      <div className="grid">
        {blogs.map((blog) => (
          <div key={blog.slug} className="card">
            <Link to={`/posts/${blog.slug}`} className="blog-title">
              {blog.title}
            </Link>

            <p className="desc">{blog.description?.slice(0, 15)}...</p>

            <div className="actions">
              <button
                className="detail-btn"
                onClick={() => navigate(`/posts/${blog.slug}`)}
              >
                Detail
              </button>

              {isLoggedIn && (
                <>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog.slug)}
                  >
                    Delete
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${blog.slug}`)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
