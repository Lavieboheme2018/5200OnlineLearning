import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  duration_minutes: {
    type: Number,
    required: true
  },
  questions: [
    {
      text: { type: String, required: true },
      options: [{ type: String, required: true }],
      correct_answer: { type: String, required: true }
    }
  ]
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;