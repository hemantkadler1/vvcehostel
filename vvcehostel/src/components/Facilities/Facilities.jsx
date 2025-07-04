import React from "react";
import "./Facilities.css";

const Facilities = () => {
  return (
    <div className="facilities-container">
      <h1 className="facilities-heading">🏢 Hostel Facilities</h1>
      <p className="facilities-description">
        VVCE Hostel offers a wide range of modern amenities to ensure a comfortable and secure stay for all students.
      </p>
      <ul className="facilities-list">
        <li>🛏️ Spacious & Furnished Rooms</li>
        <li>📚 Study Tables and Common Study Area</li>
        <li>🌐 High-Speed Wi-Fi Connectivity</li>
        <li>🍽️ Hygienic Dining Hall with Nutritious Food</li>
        <li>🧺 Laundry Services</li>
        <li>🏥 24/7 Medical Assistance</li>
        <li>🎯 Indoor & Outdoor Recreational Facilities</li>
        <li>🛡️ CCTV Surveillance and 24/7 Security</li>
        <li>💡 Uninterrupted Power Supply</li>
        <li>🚰 RO Drinking Water</li>
        <li>🚌 Easy Access to College Campus</li>
      </ul>
    </div>
  );
};

export default Facilities;
