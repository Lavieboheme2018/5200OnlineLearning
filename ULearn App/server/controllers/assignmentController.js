import mongoose from "mongoose";
import Assignment from "../models/assignmentModel.js";

// Create a new assignment with ACID transaction
export const createAssignment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const assignment = new Assignment(req.body);

    // Save the assignment within the transaction
    await assignment.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(assignment);
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ error: error.message });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("course_id");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single assignment by ID
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "course_id"
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an assignment with ACID transaction
export const updateAssignment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, session }
    );

    if (!assignment) {
      // Abort the transaction if the assignment is not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json(assignment);
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ error: error.message });
  }
};

// Delete an assignment with ACID transaction
export const deleteAssignment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id, {
      session,
    });

    if (!assignment) {
      // Abort the transaction if the assignment is not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ error: error.message });
  }
};

// Get the number of assignments for each course
export const getCourseAssignmentCounts = async (req, res) => {
  try {
    const result = await Assignment.aggregate([
      {
        $group: {
          _id: "$course_id", // Group by course_id
          assignmentCount: { $sum: 1 }, // Count the number of assignments
        },
      },
      {
        $lookup: {
          from: "courses", // Join with the courses collection
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails", // Unwind the course details
      },
      {
        $project: {
          _id: 0,
          courseId: "$_id",
          courseTitle: "$courseDetails.title",
          assignmentCount: 1,
        },
      },
      {
        $sort: { assignmentCount: -1 }, // Sort by assignment count in descending order
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
