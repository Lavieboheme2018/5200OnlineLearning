import express from 'express';
import {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
} from '../controllers/lessonController.js';

const router = express.Router();

router.post('/', createLesson);
router.get('/', getLessons);
router.get('/:id', getLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
