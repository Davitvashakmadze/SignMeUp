import { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const validateForm = () => {
    // Basic validation for email and password fields
    if (!email) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!validateForm()) return; // Validate the form

    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
        });

        // Correct comparison with === instead of =
        if (res.data = true) {
            // Navigate to the user page after successful login
            navigate("/user");
        } else {
            setError("Invalid credentials");
        }
    } catch (error) {
        console.error(error.response?.data || "Error logging in");
        setError("Login failed. Please try again.");
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