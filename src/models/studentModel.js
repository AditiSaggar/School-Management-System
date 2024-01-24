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
    classId: {
        type:String,
        ref: 'classModel',
        required: true,
    },
    secId:{
        type:String,
        ref: 'sectionModel',
        required: true,
    }, 
    timeStamp

});

const student = mongoose.model("studentModel", studentSchema);
module.exports = student;

