import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
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
    setShake(false);

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
      setShake(true); // Trigger shake animation on error

      // Remove shake effect after animation completes
      setTimeout(() => setShake(false), 500);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="user-input-wrapper">
            <FontAwesomeIcon className="faUser" icon={faUser} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className={`password-input-wrapper ${shake ? "shake" : ""}`}>
            <FontAwesomeIcon className="faLock" icon={faLock} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-button"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default Login;
