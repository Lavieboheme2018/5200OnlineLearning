import Exam from '../models/Exam.js';

// Create a new exam
export const createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all exams
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate('course_id');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single exam by ID
export const getExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('course_id');
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        res.json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an exam
export const updateExam = async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        res.json(exam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an exam
export const deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        res.json({ message: "Exam deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
