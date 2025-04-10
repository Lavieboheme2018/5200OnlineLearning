import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses") 
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    <section className="courses-section">
      <h3>Featured Courses</h3>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`} className="course-link">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseList;
