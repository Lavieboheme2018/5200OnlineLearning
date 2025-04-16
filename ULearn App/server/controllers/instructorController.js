import Course from "../models/courseModel.js";

// @desc    Get all courses taught by the logged-in instructor
// @route   GET /api/instructor/courses
// @access  Private (instructor only)
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id; // set by verifyToken middleware

    const courses = await Course.find({ instructor_id: instructorId }).populate({
      path: "instructor_id",
      select: "name email", // only return instructor's name/email
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
