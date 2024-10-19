import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Update this line
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
    return (
        <Router>
            <div className="App">
            <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                <Routes> {/* Change Switch to Routes */}
                    <Route path="/login" element={<Login/>} /> {/* Update Route component */}
                    <Route path="/register" element={<Register/>} /> {/* Update Route component */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
