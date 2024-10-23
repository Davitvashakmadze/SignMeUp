import { useState } from "react";
import axios from "axios";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username) {
      setError("Username is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    setError(""); // Clear errors if validation passes
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      // Make the API request to register the user
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      // Assuming the response contains the registered user info (e.g., res.data.user)
      const registeredUser = res.data.user;

      // Store the username and token in localStorage (if provided by the server)
      localStorage.setItem("username", registeredUser.username);
      localStorage.setItem("token", res.data.token); // Assuming the server returns a token

      // Navigate to the user page after successful registration
      navigate("/user");
    } catch (error) {
      console.error(error.response.data); // Log any error from the registration request
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
