const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const studentSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true,
        unique:false
    },
    contact:{
        type:Number,
        required:true
    },
    gender:{
        type:Boolean,        
    },
    address:{
        type:String,
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
    // subId:{
    //     type:String,
    //     ref: 'subjectModel',
    //     required: true,
    // },

});

const student = mongoose.model("studentModel", studentSchema);
module.exports = student;
