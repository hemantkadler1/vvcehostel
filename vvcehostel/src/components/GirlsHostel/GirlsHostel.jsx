import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GirlsHostel.css";

const GirlsHostel = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const floors = [1, 2, 3, 4];

  useEffect(() => {
    fetchStudents(); // Fetch on initial mount
  }, []);

  // Function to fetch student data
  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => {
        const girlsData = response.data.filter((student) => student.hostel === "girls");
        setStudents(girlsData);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleFloorClick = (floorNumber) => {
    navigate(`/girlshostel/floor/${floorNumber}`);
  };

  const getStudentsByFloor = (floor) => {
    const minRoom = floor * 100 + 1;
    const maxRoom = floor * 100 + 30;
    return students.filter(
      (student) =>
        parseInt(student.room_no) >= minRoom && parseInt(student.room_no) <= maxRoom
    );
  };

  return (
    <div className="girls-hostel-page">
      <h1 className="floor-heading">🏢 Girls Hostel Floors</h1>
      <div className="floor-cards">
        {floors.map((floor) => (
          <div key={floor} className="floor-card" onClick={() => handleFloorClick(floor)}>
            <h2>Floor {floor}</h2>
            <div className="student-count">
              👩‍🎓 Students: {getStudentsByFloor(floor).length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GirlsHostel;
