import mongoose from "mongoose";
import User from "../models/userModel.js";

// Create a new user with ACID transaction
export const createUser = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const user = new User(req.body); // Create a new user instance
    await user.save({ session }); // Save the user within the transaction
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.status(201).json(user); // Respond with the created user
  } catch (err) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: err.message }); // Respond with an error
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users); // Respond with the list of users
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors and respond with a 500 status
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find a user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Respond with a 404 status if not found
    }
    res.json(user); // Respond with the user details
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors and respond with a 500 status
  }
};

// Update a user with ACID transaction
export const updateUser = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      session,
    }); // Update the user within the transaction
    if (!user) {
      throw new Error("User not found"); // Throw an error if the user is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json(user); // Respond with the updated user
  } catch (err) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(400).json({ error: err.message }); // Respond with an error
  }
};

// Delete a user with ACID transaction
export const deleteUser = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const user = await User.findByIdAndDelete(req.params.id, { session }); // Delete the user within the transaction
    if (!user) {
      throw new Error("User not found"); // Throw an error if the user is not found
    }
    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session
    res.json({ message: "User deleted successfully" }); // Respond with a success message
  } catch (err) {
    await session.abortTransaction(); // Roll back the transaction in case of an error
    session.endSession(); // End the session
    res.status(500).json({ error: err.message }); // Respond with an error
  }
};
