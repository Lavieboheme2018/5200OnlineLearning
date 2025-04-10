import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    users: 0,
    instructors: 0,
    students: 0,
    courses: 0,
  });

  useEffect(() => {
    // Replace with API call
    const fetchStats = async () => {
      setStats({
        users: 120,
        instructors: 15,
        students: 100,
        courses: 35,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <p>Welcome, {user?.name || 'Admin'} 👋</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Instructors</h3>
          <p>{stats.instructors}</p>
        </div>
        <div className="stat-card">
          <h3>Students</h3>
          <p>{stats.students}</p>
        </div>
        <div className="stat-card">
          <h3>Courses</h3>
          <p>{stats.courses}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
