import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// @desc    Get all courses taught by the logged-in instructor
// @route   GET /api/instructor/courses
// @access  Private (instructor only)
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor_id: instructorId }).populate({
      path: "instructor_id",
      select: "name email",
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("❌ Error fetching instructor courses:", error);
    res.status(500).json({
      message: "Failed to fetch instructor's courses",
      error: error.message,
    });
  }
};

// @desc    Get all users with role 'instructor'
// @route   GET /api/instructor/all
// @access  Private (admin or instructor)
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).select("name email _id");
    res.status(200).json(instructors);
  } catch (error) {
    console.error("❌ Error fetching instructors:", error);
    res.status(500).json({
      message: "Failed to fetch instructors",
      error: error.message,
    });
  }
};
