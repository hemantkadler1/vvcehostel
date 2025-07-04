import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodMenu.css";

const FoodMenu = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchFoodMenu();
  }, []);

  const fetchFoodMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foodmenu");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching food menu:", error);
    }
  };

  return (
    <div className="food-menu-container">
      <h2 className="food-menu-title">🍽 Weekly Food Menu</h2>
      <div className="table-wrapper">
        <table className="food-menu-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Snacks</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {foodData.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.breakfast}</td>
                <td>{item.lunch}</td>
                <td>{item.snacks}</td>
                <td>{item.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodMenu;
