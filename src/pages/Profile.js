import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get(`/users/${id}`);
        setUser(userRes.data);
        setNewBio(userRes.data.bio || "");

        const postsRes = await axios.get("/posts");
        const filteredPosts = postsRes.data.filter((post) => post.author._id === id);
        setPosts(filteredPosts);
      } catch (err) {
        console.error("❌ Failed to load profile:", err.message);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  const handleBioUpdate = async () => {
    try {
      const res = await axios.put(
        `/users/${id}`,
        { bio: newBio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser((prev) => ({ ...prev, bio: res.data.bio }));
      setEditingBio(false);
    } catch (err) {
      console.error("❌ Failed to update bio:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
        {user ? (
          <>
            <h2>👤 {user.name}</h2>
            <p>📧 {user.email}</p>

            <div style={{ marginBottom: "1rem" }}>
              <strong>📝 Bio:</strong>
              {editingBio ? (
                <>
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    rows="3"
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  />
                  <button onClick={handleBioUpdate}>💾 Save</button>
                  <button onClick={() => setEditingBio(false)} style={{ marginLeft: "0.5rem" }}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <p>{user.bio || "No bio added."}</p>
                  <button onClick={() => setEditingBio(true)}>✏️ Edit Bio</button>
                </>
              )}
            </div>

            <hr />
            <h3>🗂️ Your Posts</h3>
            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  style={{
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                >
                  <p>{post.content}</p>
                  <small>🕒 {new Date(post.createdAt).toLocaleString()}</small>
                </div>
              ))
            )}
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
