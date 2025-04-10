import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoursePage.css';

function CoursePage({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRes = await axios.get(`/api/courses/${id}`);
        setCourse(courseRes.data);

        // Optional: check enrollment status (if student)
        if (user?.role === 'student') {
          const enrollRes = await axios.get(`/api/enrollments/check/${user._id}/${id}`);
          setEnrolled(enrollRes.data.enrolled);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    try {
      await axios.post('/api/enrollments', {
        student_id: user._id,
        course_id: id,
      });
      setEnrolled(true);
      alert('Enrollment successful!');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Enrollment failed.');
    }
  };

  if (loading) return <div className="course-page">Loading course...</div>;
  if (!course) return <div className="course-page">Course not found.</div>;

  return (
    <div className="course-page">
      <h1>{course.title}</h1>
      <p className="instructor">
        Instructor: {course.instructor_id?.name || 'Unknown'}
      </p>
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
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map((lesson, index) => (
              <li key={index}>{lesson.title || `Lesson ${index + 1}`}</li>
            ))
          ) : (
            <li>No lessons available yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
