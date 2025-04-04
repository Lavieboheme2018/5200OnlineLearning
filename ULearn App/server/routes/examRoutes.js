import express from 'express';
import {
    createExam,
    getExams,
    getExam,
    updateExam,
    deleteExam
} from '../controllers/examController.js';

const router = express.Router();

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
