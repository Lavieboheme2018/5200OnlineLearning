import express from "express";
import {
  createSubmission,
  getSubmissions,
  getSubmission,
  gradeSubmission,
  getStudentSubmissionCounts, // Import the new function
} from "../controllers/submissionController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Students can create submissions
router.post("/", authMiddleware, roleMiddleware(["student"]), createSubmission);

// Instructors and Admins can view all submissions
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  getSubmissions
);

// Instructors, Admins, or the student who submitted can view a specific submission
router.get("/:id", authMiddleware, getSubmission); // Access control handled in the controller

// Instructors and Admins can grade submissions
router.put(
  "/:id/grade",
  authMiddleware,
  roleMiddleware(["instructor", "admin"]),
  gradeSubmission
);

// Add a new route for getting student submission counts
router.get(
  "/student-submission-counts",
  authMiddleware,
  roleMiddleware(["admin", "instructor"]), // Only admins and instructors can access this
  getStudentSubmissionCounts
);

export default router;
