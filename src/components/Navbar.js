import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#0073b1",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* 🏠 Brand Logo to Home */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h3 style={{ margin: 0 }}>LinkedIn Clone</h3>
      </Link>

      {/* 🔗 Navigation Links */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/feed" style={{ color: "white", textDecoration: "none" }}>
          Feed
        </Link>
        {userId && (
          <Link
            to={`/profile/${userId}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Profile
          </Link>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#0073b1",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
