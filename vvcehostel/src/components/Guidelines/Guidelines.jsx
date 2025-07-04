// components/Guidelines/Guidelines.jsx
import React from "react";
import "./Guidelines.css";

const Guidelines = () => {
  return (
    <div className="guidelines-container">
      <h1 className="guidelines-heading">Hostel Guidelines</h1>
      <p className="guidelines-subheading">Please read and follow these rules during your stay.</p>

      <ul className="guidelines-list">
        <li>🔒 Students must return to the hostel before 9:00 PM.</li>
        <li>📢 Maintain silence in the hostel premises to avoid disturbing others.</li>
        <li>📞 Inform the warden before leaving the hostel overnight.</li>
        <li>🛏️ Rooms should be kept neat and clean at all times.</li>
        <li>🚭 Smoking, drinking, or use of illegal substances is strictly prohibited.</li>
        <li>🎧 Loud music and parties are not allowed inside hostel rooms.</li>
        <li>📋 Any damage to property will be fined appropriately.</li>
        <li>📶 Internet usage must comply with college digital policies.</li>
        <li>🛠️ Report any maintenance issues immediately to the hostel office.</li>
        <li>🧍‍♂️ Visitors are allowed only with prior permission from the warden.</li>
      </ul>
    </div>
  );
};

export default Guidelines;
