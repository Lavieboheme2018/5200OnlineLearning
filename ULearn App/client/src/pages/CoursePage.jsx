import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CoursePage.css';

function CoursePage({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    // Simulate fetching course info
    const fetchCourse = async () => {
      const dummyCourse = {
        id,
        title: 'Full Stack Web Development',
        description: 'Learn how to build web apps using MERN stack.',
        instructor: 'Jane Doe',
        lessons: ['Intro to Web', 'React Basics', 'Node & Express', 'MongoDB'],
      };

      setCourse(dummyCourse);

      // Simulate enrollment status (you'd normally check this via API)
      if (user?.role === 'student') {
        const alreadyEnrolled = ['101', '202'].includes(id); // dummy check
        setEnrolled(alreadyEnrolled);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = () => {
    // Simulate enrollment logic (send POST request in real app)
    setEnrolled(true);
    alert('Enrollment successful!');
  };

  if (!course) return <div className="course-page">Loading course...</div>;

  return (
    <div className="course-page">
      <h1>{course.title}</h1>
      <p className="instructor">Instructor: {course.instructor}</p>
      <p className="description">{course.description}</p>

      {user?.role === 'student' && (
        <div className="enroll-section">
          {enrolled ? (
            <p className="enrolled-text">✅ You are enrolled in this course.</p>
          ) : (
            <button className="btn-enroll" onClick={handleEnroll}>
              Enroll Now
            </button>
          )}
        </div>
      )}

      <div className="lessons-section">
        <h3>Lessons</h3>
        <ul>
          {course.lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
