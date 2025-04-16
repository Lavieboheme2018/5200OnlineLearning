import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseList from './pages/CourseList';
import CoursePage from './pages/CoursePage';
import CreateCourse from './pages/CreateCourse';

// Dashboards
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ulearn_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  // PrivateRoute component to protect routes based on login and role
  const PrivateRoute = useCallback(({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    const isAuthorized = Array.isArray(role)
      ? role.includes(user.role)
      : user.role === role;
  
    if (role && !isAuthorized) return <Navigate to="/" replace />;
    return children;
  }, [user]);
  

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />

        {/* Protected course route */}
        <Route
          path="/courses/:id"
          element={
            <PrivateRoute>
              <CoursePage user={user} />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <PrivateRoute role="admin">
              <CreateCourse user={user} />
            </PrivateRoute>
          }
        />

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
      </Routes>
    </Router>
  );
}

export default App;

