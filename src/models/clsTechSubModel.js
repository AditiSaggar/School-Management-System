const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const clsTeachSubModel =  new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    teacherId:{
        type:String,
        ref: 'teacherModels',
        required: true, 
    },
    subjectId: { 
        type:String,
        ref: 'subjectModels',
        required: true,
        unique:true
    },
    classId:{
        type:String,
        ref:'classModels',
        required:true,
        unique:true,
    },
    timeStamp
})




const clsTeachSublink = mongoose.model("clsTeachSubModel", clsTeachSubModel);
module.exports = clsTeachSublink;