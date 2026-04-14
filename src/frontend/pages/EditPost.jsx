import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // load dữ liệu
  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${slug}`)
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

    fetch(`http://localhost:8080/api/post/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Update failed");
      });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>

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
        Update
      </button>

      <p>{message}</p>
    </form>
  );
}
