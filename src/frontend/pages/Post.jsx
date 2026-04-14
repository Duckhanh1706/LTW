import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) return <p>Đang tải...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  );
}

export default Post;
