import express from 'express';
import {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
} from '../controllers/lessonController.js';

router.post('/', createLesson);
router.get('/', getLessons);
router.get('/:id', getLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
