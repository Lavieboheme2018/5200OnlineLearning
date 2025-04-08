import express from "express";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseStudentCounts,
  getCourseAverageGrades, // Import the new function
} from "../controllers/courseController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only instructors and admins can create courses
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  createCourse
);

// All authenticated users can view courses
router.get("/", authMiddleware, getCourses);

// Only instructors and admins can update courses
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  updateCourse
);

// Only admins can delete courses
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCourse);

// Add a new route for getting student counts
router.get(
  "/student-counts",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseStudentCounts
);

// Add a new route for getting average grades for courses
router.get(
  "/average-grades",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseAverageGrades
);

export default router;
