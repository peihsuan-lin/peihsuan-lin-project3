import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/status', { withCredentials: true });
      setUsername(response.data.username);
    } catch (error) {
      setUsername(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]); // Re-run when route changes

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUsername(null);
      navigate('/home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          {username && (
            <Link to={`/user/${username}`} className="nav-link">My Profile</Link>
          )}
        </div>
        <div>
          {username ? (
            <div className="user-section">
              <span className="welcome-text">Hi, {username}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;