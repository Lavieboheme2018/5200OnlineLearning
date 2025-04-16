import express from "express";
import { getInstructorCourses, getAllInstructors } from "../controllers/instructorController.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/instructor/courses
router.get("/courses", authMiddleware, getInstructorCourses);

// GET /api/instructor/all
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllInstructors);

export default router;
