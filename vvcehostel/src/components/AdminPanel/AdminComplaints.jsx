import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, CheckCircle, Trash2, Search } from "lucide-react";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      const filtered = res.data.filter(comp => comp.name && comp.roomNo && comp.description);
      setComplaints(filtered);
      setFilteredComplaints(filtered);
      setError(null);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to fetch complaints. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkResolved = async (index) => {
    try {
      const updatedComplaints = [...complaints];
      updatedComplaints[index].resolved = !updatedComplaints[index].resolved;

      await axios.put("http://localhost:5000/api/complaints/update", updatedComplaints);
      setComplaints(updatedComplaints);
      filterComplaints(searchTerm, updatedComplaints);
    } catch (error) {
      console.error("Error marking complaint as resolved:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${index}`);
      const updatedComplaints = complaints.filter((_, i) => i !== index);
      setComplaints(updatedComplaints);
      filterComplaints(searchTerm, updatedComplaints);
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const filterComplaints = (term, list = complaints) => {
    const filtered = list.filter(
      (comp) =>
        comp.name.toLowerCase().includes(term.toLowerCase()) ||
        comp.roomNo.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredComplaints(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterComplaints(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
        📋 Admin Complaints Dashboard
      </h2>

      <div className="flex justify-end mb-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search by name or room..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <span className="ml-3 text-gray-600 font-medium">Loading...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-red-600 mt-4">
          <AlertCircle size={24} className="mr-2" />
          <span className="font-medium">{error}</span>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">
          No complaints found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <thead className="bg-indigo-700 text-white text-left">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Room No</th>
                <th className="p-4">Complaint</th>
                <th className="p-4 text-center">Resolved</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((comp, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition duration-200`}
                >
                  <td className="p-4">{comp.name}</td>
                  <td className="p-4">{comp.roomNo}</td>
                  <td className="p-4">{comp.description}</td>
                  <td className="p-4 text-center">
                    <button
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        comp.resolved ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                      }`}
                      onClick={() => handleMarkResolved(index)}
                    >
                      {comp.resolved ? "Resolved" : "Mark as Resolved"}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(index)}
                      title="Delete Complaint"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
