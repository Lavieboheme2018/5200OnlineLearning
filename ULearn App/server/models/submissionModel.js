import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  assignment_id: {
    type: String,
    ref: "Assignment",
    required: true,
  },
  student_id: {
    type: String,
    ref: "User",
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
  file_url: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    default: null,
  },
  feedback: {
    type: String,
    default: null,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
