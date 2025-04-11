import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import CourseList from './src/pages/CourseList';

import StudentDashboard from './src/pages/student/StudentDashboard';
import InstructorDashboard from './src/pages/instructor/InstructorDashboard';
import AdminDashboard from './src/pages/admin/AdminDashboard';

import CoursePage from './src/pages/CoursePage';
import Navbar from './src/components/Navbar';


function App() {
  const [user, setUser] = useState(null);

  // Simulated authentication (you’d typically verify token and fetch user data)
  useEffect(() => {
    const storedUser = localStorage.getItem('ulearn_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);
  

  const PrivateRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboards */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute role="student">
              <StudentDashboard user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/dashboard"
          element={
            <PrivateRoute role="instructor">
              <InstructorDashboard user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/courses" element={<CourseList />} />
        {/* Shared course route */}
        <Route
          path="/courses/:id"
          element={
            <PrivateRoute>
              <CoursePage user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
