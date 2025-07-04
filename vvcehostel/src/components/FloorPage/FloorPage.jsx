import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FloorPage.css';

const FloorPage = () => {
  const { floorNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const roomsPerFloor = 30;
  const apiURL = 'http://localhost:5000/api/students';

  // Extract hostelType from pathname or default to 'boys'
  const hostelType = location.pathname.includes('girlshostel') ? 'girls' : 'boys';

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(apiURL);
        const data = Array.isArray(res.data) ? res.data : res.data.students || [];
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const floor = parseInt(floorNumber, 10);
  const roomStart = floor * 100 + 1;
  const roomNumbers = Array.from({ length: roomsPerFloor }, (_, i) => roomStart + i);

  const getStudentsForRoom = (roomNo) =>
    students.filter(
      (student) =>
        parseInt(student.room_no) === roomNo &&
        student.hostel?.toLowerCase() === hostelType
    );

  return (
    <div className="floor-page">
      <h2>🏢 {hostelType === 'boys' ? 'Boys' : 'Girls'} Hostel - Floor {floor}</h2>

      {loading ? (
        <p>Loading student data...</p>
      ) : (
        <div className="room-grid">
          {roomNumbers.map((room) => {
            const assignedStudents = getStudentsForRoom(room);
            const isFilled = assignedStudents.length === 3;

            return (
              <div
                key={room}
                className={`room-card ${isFilled ? 'room-filled' : 'room-not-filled'}`}
                onClick={() => navigate(`/room/${room}?hostel=${hostelType}`)}
              >
                <h4>Room {room}</h4>
                {assignedStudents.length > 0 ? (
                  assignedStudents.map((student, idx) => (
                    <p key={idx}>
                      {student.name} ({student.usn})
                    </p>
                  ))
                ) : (
                  <p>No students</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FloorPage;
