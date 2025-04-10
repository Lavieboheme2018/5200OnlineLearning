import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard({ user }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Simulate fetching from backend
  useEffect(() => {
    // !!! REPLACE this with actual API call
    const fetchEnrolledCourses = async () => {
      // Dummy data
      const data = [
        { id: '101', title: 'Intro to Python', instructor: 'John Doe' },
        { id: '102', title: 'React Basics', instructor: 'Jane Smith' },
      ];
      setEnrolledCourses(data);
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="student-dashboard">
      <h1>Welcome, {user?.name || 'Student'} 👋</h1>
      <p className="subtitle">Here are your enrolled courses:</p>

      <div className="dashboard-course-list">
        {enrolledCourses.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : (
          enrolledCourses.map(course => (
            <div key={course.id} className="dashboard-course-card">
              <h3>{course.title}</h3>
              <p>Instructor: {course.instructor}</p>
              <Link to={`/courses/${course.id}`} className="btn-view">
                Go to Course
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="browse-link">
        <Link to="/courses" className="btn-browse">Browse More Courses</Link>
      </div>
    </div>
  );
}

export default StudentDashboard;
