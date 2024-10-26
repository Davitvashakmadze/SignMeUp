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

  const validateForm = () => {
    if (!username || !email || !password) {
      setError("ყველა ველი სავალდებულოა");
      return false;
    }
    if (password.length < 6) {
      setError("პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ჯერ შეამოწმებს, არსებობს თუ არა მომხმარებელი ამავე მეილით
      const { data: existingUser, error: fetchError } = await supabase
        .from("users") // თუ უშუალოდ `auth.users` სჭირდება, დააკონკრეტეთ.
        .select("email")
        .eq("email", email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingUser) {
        setError("ეს მეილი უკვე გამოყენებულია.");
        return;
      }

      // თუ მეილი თავისუფალია, განაგრძეთ რეგისტრაცია
      const {  error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) throw error;

      localStorage.setItem("username", username);
      navigate("/user"); // გადამისამართება მომხმარებლის გვერდზე
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError("რეგისტრაცია ვერ შესრულდა: " + error.message);
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
            placeholder="მომხმარებლის სახელი"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ელ-ფოსტა"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="პაროლი"
          />
          <button type="submit">რეგისტრაცია</button>
        </form>
        <Link to="/login">უკვე გაქვთ ანგარიში? ავტორიზაცია აქ</Link>
      </div>
    </div>
  );
};

export default Register;
