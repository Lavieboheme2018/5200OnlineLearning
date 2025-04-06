import Course from "../models/courseModel.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body); // Create a new course instance with the request body
    await course.save(); // Save the course to the database
    res.status(201).json(course); // Respond with the created course
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors and respond with a 400 status
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor_id"); // Retrieve all courses and populate instructor details
    res.json(courses); // Respond with the list of courses
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Get a single course by ID
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor_id"
    ); // Find a course by ID and populate instructor details
    if (!course) {
      return res.status(404).json({ message: "Course not found" }); // Respond with a 404 status if the course is not found
    }
    res.json(course); // Respond with the course details
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Update the course by ID with the request body
    if (!course) {
      return res.status(404).json({ message: "Course not found" }); // Respond with a 404 status if the course is not found
    }
    res.json(course); // Respond with the updated course
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors and respond with a 400 status
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id); // Delete the course by ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" }); // Respond with a 404 status if the course is not found
    }
    res.json({ message: "Course deleted successfully" }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with a 500 status
  }
};
