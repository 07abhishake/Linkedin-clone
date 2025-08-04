import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/feed");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>👋 Welcome to LinkedIn Clone</h1>
        <p style={{ fontSize: "1.2rem" }}>
          Connect, share, and grow with professionals like you.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/login">
            <button style={{ marginRight: "1rem" }}>🔐 Login</button>
          </Link>
          <Link to="/register">
            <button>📝 Register</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
