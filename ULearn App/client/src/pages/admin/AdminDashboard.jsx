import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    users: 0,
    instructors: 0,
    students: 0,
    courses: 0,
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    instructor_id: '',
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchCourses();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const usersRes = await fetch('/api/users', { headers });
      const users = await usersRes.json();

      const instructors = users.filter(user => user.role === 'instructor').length;
      const students = users.filter(user => user.role === 'student').length;

      const coursesRes = await fetch('/api/courses', { headers });
      const coursesData = await coursesRes.json();

      setStats({
        users: users.length,
        instructors,
        students,
        courses: coursesData.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setMessage("❌ Failed to fetch stats.");
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCourses(data);
      setStats((prev) => ({ ...prev, courses: data.length }));
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const courseToAdd = {
        ...newCourse,
        _id: Date.now().toString(),
        instructor_id: user._id,
      };

      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseToAdd),
      });

      if (!res.ok) throw new Error('Failed to add course');
      setMessage('✅ Course added successfully!');
      setNewCourse({ title: '', description: '', category: '', instructor_id: '' });
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
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

      {/* ✅ New Pie Chart: User Role Distribution */}
      <div className="charts-section" style={{ marginTop: '2rem' }}>
        <h2>User Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={[
              { name: 'Instructors', value: stats.instructors },
              { name: 'Students', value: stats.students },
              { name: 'Admins', value: stats.users - stats.instructors - stats.students }
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            <Cell fill="#8884d8" />
            <Cell fill="#82ca9d" />
            <Cell fill="#ffc658" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <Link to="/create-course" className="btn btn-primary">
      ➕ Create New Course
      </Link>

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
