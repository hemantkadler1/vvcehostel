import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate('/admin-login');
  };

  const sections = [
    {
      title: "Manage Allocations",
      description: "View and modify room allotments for each floor or student.",
      icon: "📝",
      path: "/admin/allocations",
    },
    {
      title: "Student Details",
      description: "Search, add, or update student records and assigned rooms.",
      icon: "👨‍🎓",
      path: "/admin/students",
    },
    {
      title: "Reports & Analytics",
      description: "View hostel occupancy statistics, floor-wise reports, etc.",
      icon: "📊",
      path: "/admin/reports",
    },
    {
      title: "Admin Settings",
      description: "Manage admin credentials, site settings, and roles.",
      icon: "⚙️",
      path: "/admin/settings",
    },
    {
      title: "Complaints",
      description: "Monitor and respond to student issues and complaints.",
      icon: "📩",
      path: "/admin/complaints",
    },
    {
      title: "Food Timetable",
      description: "View and manage daily food menu and mess schedule.",
      icon: "🍽️",
      path: "/admin/food-timetable",
    },
    {
      title: "Security Details",
      description: "Maintain security staff information and their shifts.",
      icon: "🛡️",
      path: "/admin/security-details",
    },
    {
      title: "Notifications",
      description: "Send announcements or notifications to hostel students.",
      icon: "🔔",
      path: "/admin/notifications",
    },
    {
      title: "Boys Hostel",
      description: "View boys hostel floors and room allocations.",
      icon: "🏢",
      path: "/boyshostel",
    },
    {
      title: "Girls Hostel",
      description: "View girls hostel floors and room allocations.",
      icon: "🏠",
      path: "/girlshostel",
    },
    {
      title: "WiFi Settings",
      description: "Update Chrome URL credentials and WiFi name & password.",
      icon: "📶",
      path: "/admin/wifi-settings",
    }
    
    
  ];
  
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-heading">🛠️ Admin Dashboard</h2>
        <div className="profile-icon-container">
          <img
            src="/user-icon.png"
            alt="Profile"
            className="profile-icon"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => handleOptionClick('/admin/profile-settings')}>👤 Profile Settings</button>
              <button onClick={() => handleOptionClick('/admin/change-password')}>🔑 Change Password</button>
              
              <button onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      </div>

      <p className="admin-dashboard-subheading">
        Welcome to the <strong>VVCE Hostel Admin Panel</strong>
      </p>

      <div className="admin-card-grid">
        {sections.map((section, index) => (
          <div
            key={index}
            className="admin-card"
            onClick={() => navigate(section.path)}
          >
            <div className="admin-card-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <button className="admin-button">Go to {section.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
