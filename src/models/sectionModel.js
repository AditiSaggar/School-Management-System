const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const sectionSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type:String,
        required: true
    },
    classId: {
        type:String,
        ref: 'classModel',
        required: true,
    },  
    slug:{
        type:String,
        slug:'name'
    },
    timeStamp
});

const section = mongoose.model("sectionModel", sectionSchema);
module.exports = section;

