const express = require('express');
const {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
} = require('../controllers/lessonController.js');

router.post('/', createLesson);
router.get('/', getLessons);
router.get('/:id', getLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
