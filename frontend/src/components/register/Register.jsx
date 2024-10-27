// src/components/register/Register.jsx
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate form inputs
  const validateForm = () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) throw error; // Handle registration errors

      if (data.user) {
        // Store the username from metadata if available
        localStorage.setItem(
          "username",
          data.user.user_metadata.username || username
        );
      }

      // Navigate to user page on successful registration
      navigate("/user");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <div className="register-container-wrapper">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
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
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default Register;
