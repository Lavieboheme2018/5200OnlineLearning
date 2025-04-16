import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import './InstructorDashboard.css';

function InstructorDashboard({ user }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const dummyCourses = [
        { id: '201', title: 'Advanced Java', students: 12 },
        { id: '202', title: 'Database Design', students: 8 },
      ];
      setCourses(dummyCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="instructor-dashboard">
      <h1>Welcome, {user?.name || 'Instructor'} 👋</h1>

      <div className="top-bar">
        <h2>Your Courses</h2>
        <Link to="/instructor/create-course" className="btn-create">
          + Create New Course
        </Link>
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


      {/* Chart Section */}
      {courses.length > 0 && (
        <div className="course-chart" style={{ marginTop: '2rem' }}>
          <h2>Student Enrollment Chart</h2>
          <BarChart width={500} height={300} data={courses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
} 



export default InstructorDashboard;
