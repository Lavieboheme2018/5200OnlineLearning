import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

import CoursePage from './pages/CoursePage';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  // Simulated authentication (you’d typically verify token and fetch user data)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('ulearn_user'));
    if (storedUser) setUser(storedUser);
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

        {/* Shared course route */}
        <Route
          path="/courses/:id"
          element={
            <PrivateRoute>
              <CoursePage user={user} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
