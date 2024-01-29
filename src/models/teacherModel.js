const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const teacherSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    firstName: {
        type:String,
        // required: true
    },
    lastName: {
        type:String,
        // required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
        unique:true
    },
    gender:{
        type: Boolean
    },
    address:{
        type:String,
        required: true,
    },
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
    },
   
     
});

const teacher = mongoose.model("teacherSchema", teacherSchema);
module.exports = teacher;