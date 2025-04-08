import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
