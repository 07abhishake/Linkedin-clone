import React from "react";

const PostCard = ({ post }) => {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "1rem",
        background: "#f9f9f9",
      }}
    >
      <p>{post.content}</p>
      <small>
        👤 {post.author?.name || "Unknown"} | 🕒{" "}
        {new Date(post.createdAt).toLocaleString()}
      </small>
    </div>
  );
};

export default PostCard;

