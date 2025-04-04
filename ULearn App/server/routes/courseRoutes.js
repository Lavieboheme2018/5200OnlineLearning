const express = require('express');
// Refactored from YC's code to use CommonJS syntax


const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController.js');

const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;