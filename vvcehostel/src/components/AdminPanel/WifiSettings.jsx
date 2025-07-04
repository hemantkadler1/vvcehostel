import React, { useState, useEffect } from 'react';
import './WifiSettings.css';
import { FaTrash, FaPlus, FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';

const WifiSettings = () => {
  const [currentInput, setCurrentInput] = useState({
    chromeUrl: '',
    chromeUsername: '',
    chromePassword: '',
    wifiName: '',
    wifiPassword: '',
    floorNumber: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    chromePassword: false,
    wifiPassword: false,
  });

  const [savedCredentials, setSavedCredentials] = useState([]);
  const [editId, setEditId] = useState(null); // if editing, this holds id

  useEffect(() => {
    const stored = localStorage.getItem('wifiCredentials');
    if (stored) {
      setSavedCredentials(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wifiCredentials', JSON.stringify(savedCredentials));
  }, [savedCredentials]);

  const handleChange = (field, value) => {
    setCurrentInput(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdate = () => {
    const { chromeUrl, chromeUsername, chromePassword, wifiName, wifiPassword, floorNumber } = currentInput;

    if (!chromeUrl || !chromeUsername || !chromePassword || !wifiName || !wifiPassword || !floorNumber) {
      alert('Please fill in all fields.');
      return;
    }

    if (editId !== null) {
      // Update existing
      const updated = savedCredentials.map(item =>
        item.id === editId ? { ...item, ...currentInput } : item
      );
      setSavedCredentials(updated);
      setEditId(null);
    } else {
      // Add new
      setSavedCredentials(prev => [
        ...prev,
        { id: Date.now(), ...currentInput }
      ]);
    }

    setCurrentInput({
      chromeUrl: '',
      chromeUsername: '',
      chromePassword: '',
      wifiName: '',
      wifiPassword: '',
      floorNumber: '',
    });
  };

  const handleDelete = (id) => {
    setSavedCredentials(prev => prev.filter(item => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setCurrentInput({
        chromeUrl: '',
        chromeUsername: '',
        chromePassword: '',
        wifiName: '',
        wifiPassword: '',
        floorNumber: '',
      });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setCurrentInput({
      chromeUrl: item.chromeUrl,
      chromeUsername: item.chromeUsername,
      chromePassword: item.chromePassword,
      wifiName: item.wifiName,
      wifiPassword: item.wifiPassword,
      floorNumber: item.floorNumber,
    });
  };

  const toggleVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="wifi-settings">
      <h2 className="wifi-heading">📶 WiFi Credentials</h2>

      <div className="wifi-card">
        <div className="input-row">
          <input
            type="text"
            placeholder="Chrome URL"
            value={currentInput.chromeUrl}
            onChange={(e) => handleChange('chromeUrl', e.target.value)}
          />
          <input
            type="text"
            placeholder="Chrome Username"
            value={currentInput.chromeUsername}
            onChange={(e) => handleChange('chromeUsername', e.target.value)}
          />
          <div className="password-input">
            <input
              type={showPasswords.chromePassword ? 'text' : 'password'}
              placeholder="Chrome Password"
              value={currentInput.chromePassword}
              onChange={(e) => handleChange('chromePassword', e.target.value)}
            />
            <span onClick={() => toggleVisibility('chromePassword')}>
              {showPasswords.chromePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="WiFi Name"
            value={currentInput.wifiName}
            onChange={(e) => handleChange('wifiName', e.target.value)}
          />
          <div className="password-input">
            <input
              type={showPasswords.wifiPassword ? 'text' : 'password'}
              placeholder="WiFi Password"
              value={currentInput.wifiPassword}
              onChange={(e) => handleChange('wifiPassword', e.target.value)}
            />
            <span onClick={() => toggleVisibility('wifiPassword')}>
              {showPasswords.wifiPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            type="number"
            placeholder="Floor Number"
            value={currentInput.floorNumber}
            onChange={(e) => handleChange('floorNumber', e.target.value)}
          />
          <button className="add-btn" onClick={handleAddOrUpdate}>
            {editId !== null ? 'Update' : <><FaPlus /> Add Credential</>}
          </button>
        </div>
      </div>

      {savedCredentials.length > 0 && (
        <div className="wifi-table">
          <h3>Saved WiFi Credentials</h3>
          <table>
            <thead>
              <tr>
                <th>Chrome URL</th>
                <th>Chrome Username</th>
                <th>Chrome Password</th>
                <th>WiFi Name</th>
                <th>WiFi Password</th>
                <th>Floor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedCredentials.map(item => (
                <tr key={item.id}>
                  <td>{item.chromeUrl}</td>
                  <td>{item.chromeUsername}</td>
                  <td>{item.chromePassword}</td>
                  <td>{item.wifiName}</td>
                  <td>{item.wifiPassword}</td>
                  <td>{item.floorNumber}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(item)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WifiSettings;
