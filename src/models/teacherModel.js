const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const teacherSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    contact: {
        type: Number,
        required: true,
        unique:true
    },
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
    },
   
     
});

const teacher = mongoose.model("teacherSchema", teacherSchema);
module.exports = teacher;