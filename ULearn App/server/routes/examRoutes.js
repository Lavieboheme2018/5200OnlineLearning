const express = require('express');
const {
    createExam,
    getExams,
    getExam,
    updateExam,
    deleteExam
} = require('../controllers/examController.js');

const router = express.Router();

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
