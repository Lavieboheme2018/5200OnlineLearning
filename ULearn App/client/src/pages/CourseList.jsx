import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await fetch("/api/courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Network response was not ok");
        if (res.ok) console.log("Response OK");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="courses-section">
      <h3>Browse Courses</h3>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <Link to={`/courses/${course._id}`} className="course-link">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseList;
