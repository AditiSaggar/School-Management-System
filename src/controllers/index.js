const schoolController = require('./schoolController');
const classController = require('./classController');
const sectionController = require('./sectionController');
const studentController = require('./studentController');
const teacherController = require('./teacherController');
const subjectController = require('./subjectController');
const libraryController = require('./libraryController');
const categoryController = require('./categoryController');
const bookController = require('./bookController');
const bookIssueReturnController = require('./bookIssueReturnController')

module.exports = {
    schoolController,
    classController,
    sectionController,
    studentController,
    teacherController,
    subjectController, 
    libraryController,
    categoryController,
    bookController,
    bookIssueReturnController
};

