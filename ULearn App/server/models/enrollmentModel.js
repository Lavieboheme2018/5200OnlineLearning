import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    ref: "User",
    required: true,
  },
  course_id: {
    type: String,
    ref: "Course",
    required: true,
  },
  enrolled_at: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
