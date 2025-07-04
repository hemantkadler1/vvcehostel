import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  const handleChangePassword = (e) => {
    e.preventDefault();
    // Connect to backend API
    alert("Password updated successfully.");
  };

  return (
    <div className="change-password-container">
      <h2>🔒 Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input type="password" placeholder="Current Password" required />
        <input type="password" placeholder="New Password" required />
        <input type="password" placeholder="Confirm New Password" required />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
