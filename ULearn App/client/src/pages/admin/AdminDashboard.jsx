import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

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
    instructor_id: '', // Optional: can default to admin for now
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
    fetchCourses();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Fetch all users
      const usersRes = await fetch('/api/users', { headers });
      const users = await usersRes.json();
  
      // Count roles
      const instructors = users.filter(user => user.role === 'instructor').length;
      const students = users.filter(user => user.role === 'student').length;
      const admins = users.filter(user => user.role === 'admin').length;
  
      // Fetch all courses
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
        instructor_id: user._id, // Assumes admin or assign to another ID
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
      fetchCourses(); // Refresh course list
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

      <div className="add-course-form">
        <h2>Add New Course</h2>
        {message && <p className="form-message">{message}</p>}
        <form onSubmit={handleAddCourse}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Course Category"
            value={newCourse.category}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Course</button>
        </form>
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
