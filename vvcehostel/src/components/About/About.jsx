import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-heading">About VVCE Hostel</h1>
        <h2 className="about-subheading">🏫 Vidyavardhaka College of Engineering Hostel</h2>
        <p className="about-text">
          The Hostels at Vidyavardhaka College of Engineering (VVCE), Mysuru, are designed to provide a safe, comfortable, and conducive 
          living environment for students away from home. Separate hostels are provided for boys and girls with well-furnished rooms, 
          spacious study areas, high-speed Wi-Fi, hygienic dining facilities, and 24/7 security. The hostels aim to promote discipline, 
          community living, and academic focus among students while ensuring a homely atmosphere. With dedicated wardens and support staff, 
          VVCE hostels ensure a seamless residential experience, making students feel secure, cared for, and connected throughout their academic journey.
        </p>
      </div>
    </div>
  );
};

export default About;
