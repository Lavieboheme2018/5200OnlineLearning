import Lesson from '../models/Lesson.js';

// Create a new lesson
export const createLesson = async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        await lesson.save();
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all lessons
export const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('course_id');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single lesson by ID
export const getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('course_id');
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a lesson
export const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        res.json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a lesson
export const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
