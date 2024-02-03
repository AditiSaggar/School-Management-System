const schoolModel = require('./schoolModel'); 
const studentModel = require('./studentModel');
const classModel = require('./classModel')
const sectionModel = require('./sectionModel')
const subjectModel = require('./subjectModel')
const teacherModel = require('./teacherModel')
const teachSubModel = require('./teachSubModel')
const clsTeachSublink = require('./clsTechSubModel')
const libraryModel = require('./libraryModel')
const categoryModel = require('./categoryModel')
const bookModel = require('./bookModel')
const bookIssueReturnModel = require('./bookIssueReturnModel')


module.exports= {
    schoolModel,
    studentModel,
    classModel,
    sectionModel,
    subjectModel,
    teacherModel,
    teachSubModel,
    clsTeachSublink, 
    libraryModel,
    categoryModel,
    bookModel,
    bookIssueReturnModel

}