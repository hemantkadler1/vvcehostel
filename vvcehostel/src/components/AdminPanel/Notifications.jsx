import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleAddNotification = async () => {
    if (!title || !message) {
      setStatus('⚠️ Title and Message are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/notifications', {
        title,
        message,
        timestamp: new Date().toISOString(),
      });
      setStatus('✅ Notification added successfully!');
      setTitle('');
      setMessage('');
      fetchNotifications();
    } catch (err) {
      console.error('Error adding notification:', err);
      setStatus('❌ Failed to add notification');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div className="notifications-container">
      <h2>📢 Add Notification</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="textarea-field"
        rows={3}
      />
      <button onClick={handleAddNotification} className="add-btn">Add Notification</button>
      {status && <p className="status-msg">{status}</p>}

      <hr style={{ margin: '30px 0' }} />

      {/* ROLLING / MARQUEE NOTIFICATIONS FOR HOMEPAGE DISPLAY */}
      <div className="marquee-wrapper">
        <div className="marquee-title">📢 Announcements:</div>
        <div className="marquee-content">
          <div className="marquee-inner">
            {notifications.map((note, index) => (
              <span key={index} className="marquee-item">
                {note.title}: {note.message} &nbsp;&nbsp;|&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '30px' }}>📃 All Notifications</h3>

      {notifications.length === 0 ? (
        <p className="status-msg">No notifications found.</p>
      ) : (
        <table className="notifications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.message}</td>
                <td>{new Date(note.timestamp).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notifications;
