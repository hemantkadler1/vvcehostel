import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch room data from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/rooms")
      .then(response => setRooms(response.data))
      .catch(error => console.error("Error fetching rooms:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Rooms</h2>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((roomNo) => (
          <div key={roomNo} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">Room {roomNo}</h3>
            <a href={`/room/${roomNo}`} className="text-blue-500">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
