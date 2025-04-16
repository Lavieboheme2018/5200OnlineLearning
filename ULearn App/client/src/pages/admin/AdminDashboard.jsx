import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    users: 0,
    instructors: 0,
    students: 0,
    courses: 0,
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchCourses();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const usersRes = await fetch('/api/users', { headers });
      const users = await usersRes.json();

      const instructors = users.filter(u => u.role === 'instructor').length;
      const students = users.filter(u => u.role === 'student').length;

      const coursesRes = await fetch('/api/courses', { headers });
      const coursesData = await coursesRes.json();

      setStats({
        users: users.length,
        instructors,
        students,
        courses: coursesData.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setMessage('❌ Failed to fetch stats.');
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data);
      setStats((prev) => ({ ...prev, courses: data.length }));
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleNavigateToCreate = () => {
    navigate('/create-course');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <p>Welcome, {user?.name || 'Admin'} 👋</p>

      <div className="stats-grid">
        <div className="stat-card"><h3>Total Users</h3><p>{stats.users}</p></div>
        <div className="stat-card"><h3>Instructors</h3><p>{stats.instructors}</p></div>
        <div className="stat-card"><h3>Students</h3><p>{stats.students}</p></div>
        <div className="stat-card"><h3>Courses</h3><p>{stats.courses}</p></div>
      </div>

      <div className="create-course-button-container">
        <button className="btn-create-course" onClick={handleNavigateToCreate}>
          ➕ Create New Course
        </button>
      </div>

      <div className="course-list">
        <h2>All Courses</h2>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course._id}>
                <strong>{course.title}</strong> – {course.category}
                <br />
                <small>{course.description}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
