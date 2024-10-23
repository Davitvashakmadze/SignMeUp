import { useState } from "react";
import axios from "axios";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
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
