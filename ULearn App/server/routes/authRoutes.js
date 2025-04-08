import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

export default router;
