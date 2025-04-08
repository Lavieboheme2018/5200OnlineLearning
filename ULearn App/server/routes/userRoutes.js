import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getInstructorCourseCounts, // Import the new function
} from "../controllers/userController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admins can view all users
router.get("/", authMiddleware, roleMiddleware(["admin"]), getUsers);

// Admins or the user themselves can view a specific user
router.get("/:id", authMiddleware, getUser);

// Admins or the user themselves can update user details
router.put("/:id", authMiddleware, getUser);

// Only admins can delete users
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

// Add a new route for getting instructor course counts
router.get(
  "/instructor-course-counts",
  authMiddleware,
  roleMiddleware(["admin"]), // Only admins can access this
  getInstructorCourseCounts
);

export default router;
