import express from "express";
import {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getCourseAssignmentCounts, // Import the new function
} from "../controllers/assignmentController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only instructors and admins can create assignments
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  createAssignment
);

// All authenticated users can view assignments
router.get("/", authMiddleware, getAssignments);

// Only instructors and admins can update assignments
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  updateAssignment
);

// Only admins can delete assignments
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteAssignment
);

// Add a new route for getting assignment counts for courses
router.get(
  "/course-assignment-counts",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getCourseAssignmentCounts
);

export default router;
