// src/components/user/User.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./User.scss";
import backgroundImage from "../../media/6057485.jpg";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("username");
    navigate("/login");
  };

  const username = localStorage.getItem("username");

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
      className="user-page-wrapper"
    >
      <div className="user-page">
        <h1>Welcome, {username}!</h1>
        <p>You are successfully logged in!</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;
