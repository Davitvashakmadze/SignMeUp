import React from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate(); // Correctly call useNavigate inside the component

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token"); // If you're using a token
    navigate("/login"); // Navigate to the login page after logout
  };

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  return (
    <div className="user-page">
      <h1>Welcome to the {username} Page</h1>
      <p>You are successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;
