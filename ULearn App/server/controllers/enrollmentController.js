import Enrollment from '../models/Enrollment.js';

// Create a new enrollment
export const createEnrollment = async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('student_id')
            .populate('course_id');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single enrollment by ID
export const getEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('student_id')
            .populate('course_id');
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an enrollment
export const updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an enrollment
export const deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
