import mongoose from "mongoose";
import Exam from "../models/examModel.js";

// Create a new exam with ACID transaction
export const createExam = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const exam = new Exam(req.body); // Create a new exam instance
    await exam.save({ session }); // Save the exam within the transaction
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.status(201).json(exam); // Respond with the created exam
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Get all exams
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("course_id"); // Retrieve all exams and populate related fields
    res.json(exams); // Respond with the list of exams
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Get a single exam by ID
export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("course_id"); // Find an exam by ID and populate related fields
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" }); // Respond with a 404 status if not found
    }
    res.json(exam); // Respond with the exam details
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Update an exam with ACID transaction
export const updateExam = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      session,
    }); // Update the exam within the transaction
    if (!exam) {
      throw new Error("Exam not found"); // Throw an error if the exam is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json(exam); // Respond with the updated exam
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Delete an exam with ACID transaction
export const deleteExam = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const exam = await Exam.findByIdAndDelete(req.params.id, { session }); // Delete the exam within the transaction
    if (!exam) {
      throw new Error("Exam not found"); // Throw an error if the exam is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json({ message: "Exam deleted successfully" }); // Respond with a success message
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(500).json({ error: error.message }); // Respond with an error
  }
};
