import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const userRoutes = require('./routes/userRoutes.js');
const courseRoutes = require('./routes/courseRoutes.js');
const lessonRoutes = require('./routes/lessonRoutes.js');
const examRoutes = require('./routes/examRoutes.js');
const enrollmentRoutes = require('./routes/enrollmentRoutes.js');

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
