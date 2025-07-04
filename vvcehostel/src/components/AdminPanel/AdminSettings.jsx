import React, { useState } from 'react';
import './AdminSettings.css';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const [registerEnabled, setRegisterEnabled] = useState(true);
  const [showHostelButtons, setShowHostelButtons] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleAddAdmin = (e) => {
    e.preventDefault();
    alert("Admin added successfully.");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert("Password updated successfully.");
  };

  const goToProfileSettings = () => {
    navigate('/admin/profile');
  };

  return (
    <div className="admin-settings-container">
      <div className="admin-settings-header">
        <h2>⚙️ Admin Settings</h2>
        <button className="profile-button" onClick={goToProfileSettings}>👤 Profile Settings</button>
      </div>

      {/* Add Admin User */}
      <section className="settings-section">
        <h3>Add New Admin</h3>
        <form onSubmit={handleAddAdmin}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Add Admin</button>
        </form>
      </section>

      {/* Change Password */}
      <section className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <input type="password" placeholder="Current Password" required />
          <input type="password" placeholder="New Password" required />
          <input type="password" placeholder="Confirm New Password" required />
          <button type="submit">Change Password</button>
        </form>
      </section>

      {/* Toggle Options */}
      <section className="settings-section">
        <h3>Admin Controls</h3>
        <div className="toggle-option">
          <label>
            <input
              type="checkbox"
              checked={registerEnabled}
              onChange={() => setRegisterEnabled(!registerEnabled)}
            />
            Enable Admin Registration Page
          </label>
        </div>

        <div className="toggle-option">
          <label>
            <input
              type="checkbox"
              checked={showHostelButtons}
              onChange={() => setShowHostelButtons(!showHostelButtons)}
            />
            Show Boys/Girls Hostel Buttons on HomePage
          </label>
        </div>

        <div className="toggle-option">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Enable Dark Mode
          </label>
        </div>
      </section>

      {/* Placeholder for System Logs */}
      <section className="settings-section">
        <h3>System Logs</h3>
        <p>Recent activities by admins will appear here.</p>
      </section>
    </div>
  );
};

export default AdminSettings;
