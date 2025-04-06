import mongoose from "mongoose";
import Lesson from "../models/lessonModel.js";

// Create a new lesson with ACID transaction
export const createLesson = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const lesson = new Lesson(req.body); // Create a new lesson instance
    await lesson.save({ session }); // Save the lesson within the transaction
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.status(201).json(lesson); // Respond with the created lesson
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Get all lessons
export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("course_id"); // Retrieve all lessons and populate related fields
    res.json(lessons); // Respond with the list of lessons
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Get a single lesson by ID
export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("course_id"); // Find a lesson by ID and populate related fields
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" }); // Respond with a 404 status if not found
    }
    res.json(lesson); // Respond with the lesson details
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Update a lesson with ACID transaction
export const updateLesson = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      session,
    }); // Update the lesson within the transaction
    if (!lesson) {
      throw new Error("Lesson not found"); // Throw an error if the lesson is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json(lesson); // Respond with the updated lesson
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};

// Delete a lesson with ACID transaction
export const deleteLesson = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id, { session }); // Delete the lesson within the transaction
    if (!lesson) {
      throw new Error("Lesson not found"); // Throw an error if the lesson is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json({ message: "Lesson deleted successfully" }); // Respond with a success message
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(500).json({ error: error.message }); // Respond with an error
  }
};
