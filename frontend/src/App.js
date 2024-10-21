import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import User from './components/user/User'; // Import the user page

function App() {
    return (
        <Router>
            <div className="App">
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
