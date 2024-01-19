const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const sectionSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    section: {
        type: string,
        required: true
    },
    address: {
        type: string,
        required: true,
        unique:false
    },
    classId: {
        type: string,
        ref: 'classModel',
        required: true,
    }   
});

const section = mongoose.model("sectionModel", sectionSchema);
module.exports = section;

