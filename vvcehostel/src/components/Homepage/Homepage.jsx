import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import backgroundImg from "../../assets/hostel.jpg";
import About from "../About/About";
import Facilities from "../Facilities/Facilities";
import Guidelines from "../Guidelines/Guidelines";
import FoodMenu from "../FoodMenu/FoodMenu";
import Gallery from "../Gallery/Gallery";
import Contact from "../contact/contact";
import Complaints from "../Complaints/Complaints";

const Homepage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications");
      const latest = res.data.reverse().slice(0, 10); // latest 10
      setNotifications(latest);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `linear-gradient(rgba(8, 0, 58, 0.7), rgba(8, 0, 58, 0.7)), url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingTop: "1rem",
      }}
    >
      {/* 🔔 Notifications Section */}
      <div className="notification-section mb-6">
        <h2 className="text-xl font-semibold text-white text-center mb-4">
          🔔 Latest Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-white text-center">No notifications available.</p>
        ) : (
          <div className="notification-list-vertical">
            {notifications.map((note, index) => (
              <div key={index} className="notification-card">
                <h3 className="notification-title">{note.title}</h3>
                <p className="notification-message">{note.message}</p>
                <p className="notification-time">
                  {new Date(note.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 👋 Welcome Message */}
      <div className="main-content text-center mt-8">
        <h1 className="welcome-heading text-4xl text-white font-bold mb-6">
          Welcome to VVCE Hostel
        </h1>
      </div>

      {/* 📌 Section Content for Scroll Targets */}
      <div id="about"><About /></div>
      <div id="facilities"><Facilities /></div>
      <div id="guidelines"><Guidelines /></div>
      <div id="food-menu"><FoodMenu /></div>
      <div id="gallery"><Gallery /></div>
      <div id="complaints"><Complaints /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
};

export default Homepage;
