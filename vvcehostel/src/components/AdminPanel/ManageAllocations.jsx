import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAllocations = () => {
  const [students, setStudents] = useState([]);
  const [updatedRoom, setUpdatedRoom] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch student data.');
    }
  };

  const handleRoomChange = (usn, value) => {
    setUpdatedRoom(prev => ({ ...prev, [usn]: value }));
  };

  const updateRoom = async (usn) => {
    try {
      const newRoom = updatedRoom[usn];
      if (!newRoom || newRoom.trim() === '') {
        alert('Please enter a valid room number.');
        return;
      }

      await axios.put(`http://localhost:5000/api/students/${usn}`, {
        room_no: newRoom
      });

      alert(`Room updated successfully for ${usn}`);
      fetchStudents(); // Refresh data
      setUpdatedRoom(prev => ({ ...prev, [usn]: '' }));
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Failed to update room. Please try again.');
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Manage Room Allocations</h2>

      <input
        type="text"
        placeholder="Search by Name or USN"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">USN</th>
              <th className="py-3 px-4 text-left">Current Room</th>
              <th className="py-3 px-4 text-left">New Room</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.usn}</td>
                <td className="py-3 px-4">{student.room_no || '-'}</td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={updatedRoom[student.usn] || ''}
                    onChange={(e) => handleRoomChange(student.usn, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter new room"
                  />
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => updateRoom(student.usn)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllocations;
