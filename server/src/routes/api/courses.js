import express from 'express';
import Course from './../../controllers/courseCtrl';
//import authenticate from './../../middlewares/authenticate';

var router = express.Router();
// router.use(authenticate);

// GET xxx.com/api/courses
// get list of courses
router.get('/courses', Course.getAll);

// GET xxx.com/api/courses/:id
// get one course by id
router.get('/courses/:id', authenticate, Course.getOne);

// GET xxx.com/api/courses/:serverId
// get list of instructor courses
router.get('/courses/instructor/:serverId', authenticate, Course.getServerCourses);

// POST xxx.com/api/courses/:params
// create new course
router.post('/courses', authenticate, Course.create);

// PUT xxx.com/api/courses/:params
// update a course
router.put('/courses/:id', authenticate, Course.update);

// DELETE xxx.com/api/courses/:id
// 'delete' a course
router.delete('/courses/:id', Course.delete);

module.exports = router;
