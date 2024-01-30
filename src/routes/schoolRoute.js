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

//Create Teacher
router.post('/newteacher',controllers.teacherController.createTeacher)

//Create Subject
router.post('/newsubject', controllers.subjectController.createSubject)

//Create linking b/w teacher an subject
router.post('/createlinking',controllers.teacherController.techSubLinking)

//Create linking b/w teacher, subject and Class
router.post('/createlinks', controllers.teacherController.linkingClsSubTeach)

//Get All the student when SchoolId is passed in the param
router.get('/getstudents/:id',auth,controllers.studentController.getStudentBySchoolId)

//Get All the classes when SchoolId is passed in the param
router.get('/getclasses/:id',auth,controllers.classController.getClassesBySchoolId)

//Get All the student when CLassId is passed in the param
router.get('/getstudentsbyclass/:id',auth,controllers.classController.getStudentByClassId)


//Get All the student when SectionId is passed in the param
router.get('/getstudentsbysection/:id',auth,controllers.sectionController.getStudentBySectionId)

//Get All the subject when teacherId has been passed in the param
router.get('/getsubjectsbyteacher/:id',auth,controllers.teacherController.getSubjectByTeacherId)

//Get All the Subject in which class no of subject are presnt it is also created with the lookup need to edit
router.get('/getSubClsByTeachId/:id',auth,controllers.teacherController.getSubofClsByTeachId)

//LOOKUP to get subject by teacherId
router.get('/getSubjectdata/:id', auth, controllers.teacherController.getSubjectdata)


//LOOKUP to get subject and class data as the teacherId passed in the param
router.get('/getsubclassdata/:id',auth,controllers.teacherController.getSubjectAndClassdata)





module.exports = router;

