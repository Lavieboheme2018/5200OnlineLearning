import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    enrolled_at: {
      type: Date,
      default: Date.now
    }
  });
  
  const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
  export default Enrollment;