import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RoomDetails.css";

const RoomDetails = () => {
  const { roomNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const hostelType = searchParams.get("hostel") || "boys";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        const data = Array.isArray(res.data) ? res.data : res.data.students || [];

        const filtered = data.filter(
          (student) =>
            student.room_no?.toString() === roomNo &&
            student.hostel?.toLowerCase() === hostelType
        );

        setStudents(filtered);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [roomNo, hostelType]);

  return (
    <div className="room-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="room-heading">Room {roomNo} - Student Details</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : students.length > 0 ? (
        <div className="student-grid">
          {students.map((student, index) => (
            <div key={index} className="student-card">
              <div className="student-avatar">
                {student.name ? student.name.charAt(0).toUpperCase() : "?"}
              </div>
              <h3 className="student-name">{student.name || "N/A"}</h3>
              <p><strong>USN:</strong> {student.usn || "N/A"}</p>
              <p><strong>Branch:</strong> {student.branch || "N/A"}</p>
              <p><strong>Year:</strong> {student.year || "N/A"}</p>
              <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
              <p><strong>Email:</strong> {student.college_email || "N/A"}</p>
              <p className={`fees-status ${student.fees_paid ? "paid" : "pending"}`}>
                {student.fees_paid ? "Fees Paid ✅" : "Pending ❌"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-students">No students assigned to this room.</p>
      )}
    </div>
  );
};

export default RoomDetails;
