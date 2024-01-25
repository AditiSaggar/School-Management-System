const express = require('express')
const router = express.Router();
const controllers = require('../controllers/index')
const auth = require('../middleware/verify')

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

//Update School
router.put('/update/:id',auth,controllers.schoolController.updateSchool)

//Update Class
router.put('/updateCls/:id',controllers.classController.updateClass)

//Update Section
router.put('/updateSect/:id',controllers.sectionController.updateSection)

//Update Student
router.put('/updateStu/:id',controllers.studentController.updateStudent)

//Get All data using lookup
router.get('/getalldata/:id',controllers.schoolController.getAllData)

//Get All School
router.get('/getallschool',controllers.schoolController.getAllSchool)

//Get All Class
router.get('/getallclasses',controllers.classController.getAllClasses)

//Get All Section
router.get('/getallsections',controllers.sectionController.getAllSections)

//Get All Student
router.get('/getallstudents',controllers.studentController.getAllStudents)

module.exports = router;

