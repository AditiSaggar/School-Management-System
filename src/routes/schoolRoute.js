const express = require('express')
const router = express.Router();
const controllers = require('../controllers/index')

//Create School
router.post('/signup', controllers.schoolController.createSchool)

//Login School
router.post('/login', controllers.schoolController.loginSchool)

//Create Class
router.post('/newclass',controllers.classController.createClass)

//Create Section
router.post('/newsection',controllers.sectionController.createSection)

//Create Student
router.post('/newstudent',controllers.studentController.createStudent)


module.exports = router;