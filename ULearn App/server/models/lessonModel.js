import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    ref: "Course",
    required: true,
  },
  order_number: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
