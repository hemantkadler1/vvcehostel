import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { setIsAdminLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ Corrected backend API URL (Flask runs on port 5000)
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('admin_token', token); // Save token in localStorage
      setIsAdminLoggedIn(true); // Update login state
      navigate('/admin'); // Redirect to AdminDashboard

    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-content">
        <div className="admin-login-card">
          <img src="/vvce-logo.png" alt="VVCE Logo" className="admin-logo" />
          <h2 className="admin-login-title">🔐 Admin Login</h2>
          <p className="login-subtext">Access to authorized personnel only</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="login-error">{error}</p>}
          </form>

          <div className="login-links">
            <Link to="/forgot-password" className="login-link">Forgot Password</Link>
            <span>  </span>
            <Link to="/admin-register" className="login-link">?</Link> 
         </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
