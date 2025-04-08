import mongoose from "mongoose";
import Submission from "../models/submissionModel.js";

// Create a new submission with ACID transaction
export const createSubmission = async (req, res) => {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ message: "Only students can submit assignments" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const submission = new Submission({
      ...req.body,
      student_id: req.user.id, // Ensure the student ID matches the logged-in user
    });

    await submission.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(submission);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};

// Get all submissions
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("assignment_id")
      .populate("student_id");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single submission by ID
export const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("assignment_id")
      .populate("student_id");
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Grade a submission with ACID transaction
export const gradeSubmission = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { grade, feedback } = req.body;

    // Update the submission within the transaction
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { grade, feedback },
      { new: true, session }
    );

    if (!submission) {
      // Abort the transaction if the submission is not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Submission not found" });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json(submission);
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ error: error.message });
  }
};

// Get the number of submissions made by each student
export const getStudentSubmissionCounts = async (req, res) => {
  try {
    const result = await Submission.aggregate([
      {
        $group: {
          _id: "$student_id", // Group by student_id
          submissionCount: { $sum: 1 }, // Count the number of submissions
        },
      },
      {
        $lookup: {
          from: "users", // Join with the users collection
          localField: "_id",
          foreignField: "_id",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails", // Unwind the student details
      },
      {
        $project: {
          _id: 0,
          studentId: "$_id",
          studentName: "$studentDetails.name",
          submissionCount: 1,
        },
      },
      {
        $sort: { submissionCount: -1 }, // Sort by submission count in descending order
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
