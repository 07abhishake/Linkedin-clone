import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch posts:", err.message);
      }
    };

    fetchPosts();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts([res.data, ...posts]);
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("❌ Failed to post:", err.response?.data || err.message);
      alert("❌ Failed to create post");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#0073b1" }}>📰 LinkedIn Feed</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginBottom: "2rem" }}>
          <textarea
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "1rem",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: "1rem" }}
          />
          <button
            type="submit"
            style={{
              background: "#0073b1",
              color: "white",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </form>

        <hr style={{ marginBottom: "1.5rem" }} />

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ marginBottom: "2rem" }}>
              <Link
                to={`/profile/${post.author._id}`}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "#0073b1",
                }}
              >
                {post.author.name}
              </Link>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Feed;

