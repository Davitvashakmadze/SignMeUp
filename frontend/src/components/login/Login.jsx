// src/components/login/Login.jsx
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      localStorage.setItem("username", data.user.user_metadata.username);
      navigate("/user");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default Login;
