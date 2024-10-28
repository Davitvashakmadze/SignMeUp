import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import User from "./components/user/User"; // Import the user page
import backgroundImage from './media/3168310.jpg'

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
        className="App"
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} /> {/* Add user page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
