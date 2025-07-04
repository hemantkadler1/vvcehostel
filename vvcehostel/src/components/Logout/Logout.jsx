// src/components/Logout/Logout.js
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setIsAdminLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#002f86',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'background 0.3s ease',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#001f5e')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#002f86')}
    >
      Logout
    </button>
  );
};

export default Logout;
