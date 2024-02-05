const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const studentSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true,
        unique:true
    },
    address: {
        type:String,
        required: true,
        unique:false
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:Boolean,        
    },
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
    },
    classId: {
        type:String,
        ref: 'classModel',
        required: true,
    },
    secId:{
        type:String,
        ref: 'sectionModel',
        required: true,
    }, isActive:{
        type:Boolean,
        default:true, 
    },
    isDelete:{
        type:Boolean,
        default:false, 
    },
    timeStamp

});

const student = mongoose.model("studentModel", studentSchema);
module.exports = student;

