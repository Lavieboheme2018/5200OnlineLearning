import mongoose from "mongoose";
import Enrollment from "../models/enrollmentModel.js";

// Create a new enrollment with ACID transaction
export const createEnrollment = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const enrollment = new Enrollment(req.body); // Create a new enrollment instance
    await enrollment.save({ session }); // Save the enrollment within the transaction
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.status(201).json(enrollment); // Respond with the created enrollment
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student_id")
      .populate("course_id"); // Retrieve all enrollments and populate related fields
    res.json(enrollments); // Respond with the list of enrollments
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Get a single enrollment by ID
export const getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student_id")
      .populate("course_id"); // Find an enrollment by ID and populate related fields
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" }); // Respond with a 404 status if not found
    }
    res.json(enrollment); // Respond with the enrollment details
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Update an enrollment with ACID transaction
export const updateEnrollment = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, session } // Update the enrollment within the transaction
    );
    if (!enrollment) {
      throw new Error("Enrollment not found"); // Throw an error if the enrollment is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json(enrollment); // Respond with the updated enrollment
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Delete an enrollment with ACID transaction
export const deleteEnrollment = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id, {
      session,
    }); // Delete the enrollment within the transaction
    if (!enrollment) {
      throw new Error("Enrollment not found"); // Throw an error if the enrollment is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json({ message: "Enrollment deleted successfully" }); // Respond with a success message
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(500).json({ error: error.message }); // Respond with an error
  }
};
