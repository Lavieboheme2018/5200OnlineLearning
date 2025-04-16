import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './InstructorDashboard.css';

function InstructorDashboard({ user }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Replace with real API call
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch('/api/instructor/courses', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="instructor-dashboard">
      <h1>Welcome, {user?.name || 'Instructor'} 👋</h1>
      <div className="top-bar">
        <h2>Your Courses</h2>
      </div>

      <div className="course-list">
        {courses.length === 0 ? (
          <p>You haven't created any courses yet.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.students} students enrolled</p>
              <div className="actions">
                <Link to={`/courses/${course.id}`} className="btn-view">View</Link>
                <Link to={`/instructor/edit-course/${course.id}`} className="btn-edit">Edit</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
