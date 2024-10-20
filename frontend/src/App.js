import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Default route that redirects to /login */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    
                    {/* Login and Register routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
