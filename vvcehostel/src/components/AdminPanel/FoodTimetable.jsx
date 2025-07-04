import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const FoodTimetable = () => {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    day: "",
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });
  const [editingDay, setEditingDay] = useState(null);

  // Fetch food menu on mount
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foodmenu");
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching food menu:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingDay) {
        await axios.put("http://localhost:5000/api/foodmenu", formData);
        alert("Menu updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/foodmenu", formData);
        alert("Menu added successfully!");
      }
      setFormData({ day: "", breakfast: "", lunch: "", snacks: "", dinner: "" });
      setEditingDay(null);
      fetchMenu();
    } catch (err) {
      console.error("Error saving food menu:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingDay(item.day);
  };

  const handleDelete = async (day) => {
    try {
      await axios.delete(`http://localhost:5000/api/foodmenu?day=${encodeURIComponent(day)}`);
      alert("Menu deleted successfully!");
      fetchMenu();
    } catch (err) {
      console.error("Error deleting menu:", err);
    }
  };

  return (
    <div className="admin-section-container">
      <h2 className="admin-section-heading">🍽️ Manage Food Timetable</h2>

      <div className="admin-form">
        <input name="day" placeholder="Day" value={formData.day} onChange={handleChange} />
        <input name="breakfast" placeholder="Breakfast" value={formData.breakfast} onChange={handleChange} />
        <input name="lunch" placeholder="Lunch" value={formData.lunch} onChange={handleChange} />
        <input name="snacks" placeholder="Snacks" value={formData.snacks} onChange={handleChange} />
        <input name="dinner" placeholder="Dinner" value={formData.dinner} onChange={handleChange} />
        <button onClick={handleAddOrUpdate} className="admin-btn">
          {editingDay ? "Update" : "Add"}
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Snacks</th>
            <th>Dinner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.breakfast}</td>
              <td>{item.lunch}</td>
              <td>{item.snacks}</td>
              <td>{item.dinner}</td>
              <td>
                <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(item.day)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTimetable;
