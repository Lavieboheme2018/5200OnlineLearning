import express from "express";
import { getInstructorCourses } from "../controllers/instructorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/instructor/courses
router.get("/courses", authMiddleware, getInstructorCourses);

export default router;
