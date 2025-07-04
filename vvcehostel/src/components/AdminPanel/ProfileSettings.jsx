import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  const [message, setMessage] = useState('');

  const [editMode, setEditMode] = useState({
    full_name: false,
    username: false,
    dob: false,
    department: false,
    email: false,
    phone: false,
  });

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    dob: '',
    department: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.admin;
        setAdminDetails(data);
        setFormData(data);
        setLoginHistory(res.data.login_history || []);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchAdminData();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(
        'http://localhost:5000/api/admin/profile',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Profile updated successfully');
      setEditMode({
        full_name: false,
        username: false,
        dob: false,
        department: false,
        email: false,
        phone: false,
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('❌ Failed to update profile');
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!adminDetails) return <p>Loading profile...</p>;

  const isAnyFieldInEdit = Object.values(editMode).some((v) => v);

  const renderField = (label, fieldName, type = 'text') => (
    <div className="editable-field">
      <label>{label}</label>
      {!editMode[fieldName] ? (
        <div className="field-card">
          <span>{formData[fieldName]}</span>
          <button className="edit-icon" onClick={() => setEditMode(prev => ({ ...prev, [fieldName]: true }))}>✏️</button>
        </div>
      ) : (
        <input
          type={type}
          value={formData[fieldName]}
          onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          onBlur={() => setEditMode(prev => ({ ...prev, [fieldName]: false }))}
          autoFocus
        />
      )}
    </div>
  );
  

  return (
    <div className="profile-settings-container">
      <h2>👤 Profile Settings</h2>

      <div className="profile-section">
        <h3>Admin Information</h3>
        {renderField('Name', 'full_name')}
        {renderField('Username', 'username')}
        {renderField('Date of Birth', 'dob', 'date')}
        {renderField('Department', 'department')}
        {renderField('Email', 'email', 'email')}
        {renderField('Phone', 'phone', 'text')}

        {isAnyFieldInEdit && (
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
        )}
        {message && <p className="message">{message}</p>}
      </div>

      {loginHistory.length > 0 && (
        <div className="profile-section">
          <h3>Login Activity</h3>
          <table className="login-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((log, index) => (
                <tr key={index}>
                  <td>{log.date}</td>
                  <td>{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
