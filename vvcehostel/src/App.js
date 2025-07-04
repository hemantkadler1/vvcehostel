// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import About from "./components/About/About";
import Facilities from "./components/Facilities/Facilities";
import Contact from "./components/contact/contact";
import BoysHostel from "./components/BoysHostel/BoysHostel";
import FloorPage from "./components/FloorPage/FloorPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import GirlsHostel from "./components/GirlsHostel/GirlsHostel";
import RoomDetails from "./components/RoomDetails/RoomDetails";
import ManageStudents from './components/AdminPanel/ManageStudents';
import ManageRooms from './components/AdminPanel/ManageRooms';
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import AdminLogin from './components/AdminPanel/AdminLogin';
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import AdminComplaints from "./components/AdminPanel/AdminComplaints";
import Complaints from "./components/Complaints/Complaints";
import AdminSettings from "./components/AdminPanel/AdminSettings";
import FoodTimetable from "./components/AdminPanel/FoodTimetable";
import ManageAllocations from "./components/AdminPanel/ManageAllocations";
import Notifications from "./components/AdminPanel/Notifications";
import ReportsAnalytics from "./components/AdminPanel/ReportsAnalytics";
import SecurityDetails from "./components/AdminPanel/SecurityDetails";
import StudentDetails from "./components/AdminPanel/StudentDetails";
import FoodMenu from "./components/FoodMenu/FoodMenu";
import AdminRegister from './components/AdminPanel/AdminRegister';
import ForgotPassword from './components/AdminPanel/ForgotPassword';
import ProfileSettings from './components/AdminPanel/ProfileSettings';
import ChangePassword from "./components/AdminPanel/ChangePassword";
import Gallery from "./components/Gallery/Gallery";
import Guidelines from "./components/Guidelines/Guidelines";
import WifiSettings from "./components/AdminPanel/WifiSettings";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/boyshostel" element={<BoysHostel />} />
            <Route path="/boyshostel/floor/:floorNumber" element={<FloorPage />} />
            <Route path="/girlshostel" element={<GirlsHostel />} />
            <Route path="/girlshostel/floor/:floorNumber" element={<FloorPage />} />
            <Route path="/boyshostel/floor/:floorNumber/room/:roomNumber" element={<RoomDetails />} />
            <Route path="/room/:roomNo" element={<RoomDetails />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/food-menu" element={<FoodMenu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/guidelines" element={<Guidelines/>}/>
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/complaints" element={<PrivateRoute><AdminComplaints /></PrivateRoute>} />
            <Route path="/admin/manage-students" element={<PrivateRoute><ManageStudents /></PrivateRoute>} />
            <Route path="/admin/manage-rooms" element={<PrivateRoute><ManageRooms /></PrivateRoute>} />
            <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
            <Route path="/admin/food-timetable" element={<PrivateRoute><FoodTimetable /></PrivateRoute>} />
            <Route path="/admin/allocations" element={<PrivateRoute><ManageAllocations /></PrivateRoute>} />
            <Route path="/admin/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/admin/reports" element={<PrivateRoute><ReportsAnalytics /></PrivateRoute>} />
            <Route path="/admin/security-details" element={<PrivateRoute><SecurityDetails /></PrivateRoute>} />
            <Route path="/admin/students" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/profile-settings" element={<ProfileSettings />} />
            <Route path="/admin/change-password" element={<ChangePassword />} />
            <Route path="/admin/wifi-settings" element={<WifiSettings/> }/>

            

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;  // Exporting the App component
