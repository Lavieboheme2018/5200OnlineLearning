import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Import authRoutes

const app = express();
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Add authentication routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
