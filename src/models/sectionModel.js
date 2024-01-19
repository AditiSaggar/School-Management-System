const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const sectionSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    section: {
        type:String,
        required: true
    },
    classId: {
        type:String,
        ref: 'classModel',
        required: true,
    }   
});

const section = mongoose.model("sectionModel", sectionSchema);
module.exports = section;

