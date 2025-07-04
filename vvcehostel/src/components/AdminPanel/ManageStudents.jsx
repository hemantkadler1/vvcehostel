import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all students (Modify backend API as needed)
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.roll_no.includes(search) ||
    student.room_no.includes(search)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
      
      <input
        type="text"
        placeholder="Search by name, USN, or room"
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">USN</th>
            <th className="p-2 border">Room No</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.roll_no} className="border">
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.roll_no}</td>
              <td className="p-2 border">{student.room_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
