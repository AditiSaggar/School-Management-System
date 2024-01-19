const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const studentSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type: string,
        required: true
    },
    address: {
        type: string,
        required: true,
        unique:false
    },
    contact:{
        type:number,
        required:true
    },
    Gender:{
        type:boolean,        
    },
    address:{
        type:string
    },
    classId: {
        type: string,
        ref: 'classModel',
        required: true,
        
    },
     
    secId:{
        type: string,
        ref: 'sectionModel',
        required: true,
    }, 
    subId:{
        type: string,
        ref: 'subjectModel',
        required: true,
    },

});

const student = mongoose.model("studentModel", studentSchema);
module.exports = student;

