import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    branch: '',
    year: '',
    phone: '',
    room_no: '',
    place: '',
    college_email: '',
    personal_email: '',
    address: '',
    father_phone: '',
    fees_paid: false,
    hostel: ''
  });

  const [editId, setEditId] = useState(null);
  const apiURL = 'http://localhost:5000/api/students';

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(apiURL);
      setStudents(res.data);
    } catch (err) {
      setError('Error fetching students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = { ...formData };

    try {
      setLoading(true);
      let response;

      if (editId) {
        response = await axios.put(`${apiURL}/${editId}`, newStudent);
        setMessage('Student updated successfully ✅');
      } else {
        response = await axios.post(apiURL, newStudent);
        setMessage('Student added successfully ✅');
      }

      fetchStudents();
      setFormData({
        name: '',
        usn: '',
        branch: '',
        year: '',
        phone: '',
        room_no: '',
        place: '',
        college_email: '',
        personal_email: '',
        address: '',
        father_phone: '',
        fees_paid: false,
        hostel: ''
      });
      setEditId(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError('Failed to save student. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.usn);
  };

  const handleDelete = async (usn) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      try {
        await axios.delete(`${apiURL}/${usn}`);
        setMessage('Student deleted successfully ✅');
        fetchStudents();
      } catch (err) {
        setError('Error deleting student. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-details-container">
      <h2>👨‍🎓 Student Details Management</h2>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <input
        type="text"
        placeholder="Search by Name or USN"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <form onSubmit={handleSubmit} className="student-form">
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Name" required />
        <input type="text" name="usn" value={formData.usn} onChange={handleInputChange} placeholder="Enter USN" required />
        <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Enter Branch" required />
        <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="Enter Year" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter Phone Number" required />
        <input type="text" name="room_no" value={formData.room_no} onChange={handleInputChange} placeholder="Enter Room No" required />
        <input type="text" name="place" value={formData.place} onChange={handleInputChange} placeholder="Enter Place" required />
        <input type="email" name="college_email" value={formData.college_email} onChange={handleInputChange} placeholder="Enter College Email" required />
        <input type="email" name="personal_email" value={formData.personal_email} onChange={handleInputChange} placeholder="Enter Personal Email" required />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter Address" />
        <input type="text" name="father_phone" value={formData.father_phone} onChange={handleInputChange} placeholder="Enter Father's Phone Number" required />

        <label className="checkbox-field">
          <input type="checkbox" name="fees_paid" checked={formData.fees_paid} onChange={handleInputChange} />
          Fees Paid
        </label>

        <select name="hostel" value={formData.hostel} onChange={handleInputChange} required>
          <option value="">Select Hostel</option>
          <option value="boys">Boys Hostel</option>
          <option value="girls">Girls Hostel</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : editId ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {loading ? <p>Loading students...</p> : (
        <div className="students-list">
          <h2>All Students</h2>
          <div className="student-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>USN</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th>Room No</th>
                  <th>Place</th>
                  <th>College Email</th>
                  <th>Personal Email</th>
                  <th>Address</th>
                  <th>Father's Phone</th>
                  <th>Fees Paid</th>
                  <th>Hostel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.usn}</td>
                    <td>{student.branch}</td>
                    <td>{student.year}</td>
                    <td>{student.phone}</td>
                    <td>{student.room_no}</td>
                    <td>{student.place}</td>
                    <td>{student.college_email}</td>
                    <td>{student.personal_email}</td>
                    <td>{student.address}</td>
                    <td>{student.father_phone}</td>
                    <td>{student.fees_paid ? 'Yes' : 'No'}</td>
                    <td>{student.hostel}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(student.usn)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
