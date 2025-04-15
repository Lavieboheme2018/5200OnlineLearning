// routes/studentRoutes.js
import express from 'express';
import { getEnrolledCourses } from '../controllers/studentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Gets the enrolled courses for a student
router.get('/student', authMiddleware, async (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied: Students only' });
  }

  // Proceed to controller
  return getEnrolledCourses(req, res, next);
});

export default router;
