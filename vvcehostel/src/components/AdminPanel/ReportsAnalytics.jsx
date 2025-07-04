import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsAnalytics = () => {
  const [students, setStudents] = useState([]);
  const [allocatedCount, setAllocatedCount] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);

      // Count students with allocated rooms
      const allocated = response.data.filter(student => student.room_no).length;
      setAllocatedCount(allocated);
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to load reports. Please try again.");
    }
  };

  const totalStudents = students.length;
  const unallocatedCount = totalStudents - allocatedCount;
  const allocationPercentage = totalStudents > 0 ? ((allocatedCount / totalStudents) * 100).toFixed(1) : 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">📊 Reports & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-blue-800">{totalStudents}</p>
        </div>

        {/* Allocated Students */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Allocated Students</h3>
          <p className="text-3xl font-bold text-green-600">{allocatedCount}</p>
        </div>

        {/* Unallocated Students */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Unallocated Students</h3>
          <p className="text-3xl font-bold text-red-600">{unallocatedCount}</p>
        </div>
      </div>

      {/* Allocation Progress Bar */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Room Allocation Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-600 h-6 rounded-full text-white text-center text-sm font-semibold"
            style={{ width: `${allocationPercentage}%` }}
          >
            {allocationPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
