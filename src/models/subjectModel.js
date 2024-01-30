const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const subjectSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type: String,
        required: true
    },
    subjectCode:{
        type: String,
        required: true
    },
    // schoolId: {
    //     type: String,
    //     ref: 'schoolModel',
    //     required: true,
    // },
    // classId: {
    //     type: String,
    //     ref: 'classModel',
    //     required: true,
    // },
    slug:{
        type:String,
        slug:'name'
    },        
});

const subject= mongoose.model("subjectSchema", subjectSchema);
module.exports = subject;
