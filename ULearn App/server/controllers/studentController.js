// controllers/studentController.js
import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

// Get all courses a student is enrolled in
export const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.userId;

    // Find all enrollments for this student
    const enrollments = await Enrollment.find({ student_id: studentId });

    const courseIds = enrollments.map((e) => e.course_id);

    // Fetch all courses that match the enrolled course IDs
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Fetch instructor names
    const instructorIds = courses.map((course) => course.instructor_id);
    const instructors = await User.find({ _id: { $in: instructorIds } });

    const instructorMap = {};
    instructors.forEach((instructor) => {
      instructorMap[instructor._id] = instructor.name || instructor.email;
    });

    // Format courses to send back with instructor names
    const formattedCourses = courses.map((course) => ({
      id: course._id,
      title: course.title,
      instructor: instructorMap[course.instructor_id] || 'N/A',
    }));

    res.json(formattedCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
