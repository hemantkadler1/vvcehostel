// components/AdminPanel/SecurityDetails.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';


const SecurityDetails = () => {
  const guards = [
    { name: "Rajesh Kumar", shift: "Morning (6AM - 2PM)", contact: "9876543210" },
    { name: "Suresh Naik", shift: "Afternoon (2PM - 10PM)", contact: "9876543211" },
    { name: "Mahesh B", shift: "Night (10PM - 6AM)", contact: "9876543212" },
  ];
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/students")
        .then(response => {
            console.log("API Response:", response.data);
        })
        .catch(error => console.error("API Error:", error));
}, []);

  return (
    <div className="admin-section-container">
      <h2 className="admin-section-heading">🛡️ Security Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Guard Name</th>
            <th>Shift Timing</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard, index) => (
            <tr key={index}>
              <td>{guard.name}</td>
              <td>{guard.shift}</td>
              <td>{guard.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityDetails;
