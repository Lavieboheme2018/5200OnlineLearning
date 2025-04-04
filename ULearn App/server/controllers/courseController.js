import Course from '../models/courseModel.js';

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor_id');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single course by ID
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor_id');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a course
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
