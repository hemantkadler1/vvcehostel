import React, { useState } from "react";
import axios from "axios";
import "./Complaints.css";

const Complaints = () => {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    category: "",
    description: "",
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, roomNo, category, description } = formData;

    if (!name || !roomNo || !category || !description) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/complaints", formData);
      console.log("Complaint submitted:", res.data);
      showToast("Complaint submitted successfully!", "success");
      setFormData({ name: "", roomNo: "", category: "", description: "" });
    } catch (err) {
      console.error("Error submitting complaint:", err);
      showToast("Failed to submit complaint. Try again.", "error");
    }
  };

  return (
    <div className="complaints-container">
      <h2 className="complaints-heading">📝 Submit Your Complaint</h2>

      {toast.message && (
        <div className={`toast-message ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <form className="complaints-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="roomNo"
          placeholder="Room Number"
          value={formData.roomNo}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Complaint Category</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Food">Food</option>
          <option value="WiFi/Internet">WiFi/Internet</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe your complaint..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Complaints;
