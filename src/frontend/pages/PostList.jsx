import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostLists = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link to={`/posts/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostLists;
