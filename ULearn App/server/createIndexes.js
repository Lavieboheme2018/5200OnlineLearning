import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Course from './models/courseModel.js';
import Lesson from './models/lessonModel.js';
import Exam from './models/examModel.js';
import Enrollment from './models/enrollmentModel.js';

dotenv.config(); // MONGO_URI

const connectAndCreateIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // users: email should be indexed (e.g., for login), and role-based filtering
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });

    // courses: instructor_id filtering, category filtering
    await Course.collection.createIndex({ instructor_id: 1 });
    await Course.collection.createIndex({ category: 1 });

    // lessons: course_id and order_number for lesson retrieval
    await Lesson.collection.createIndex({ course_id: 1 });
    await Lesson.collection.createIndex({ course_id: 1, order_number: 1 });

    // exams: course_id for exam queries per course
    await Exam.collection.createIndex({ course_id: 1 });

    // enrollments: used in aggregation to group by course_id and student_id
    await Enrollment.collection.createIndex({ course_id: 1 });
    await Enrollment.collection.createIndex({ student_id: 1 });

    console.log('All indexes created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to create indexes:', error);
    process.exit(1);
  }
};

connectAndCreateIndexes();
