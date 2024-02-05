const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const classSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type: String,
        required: true
    },
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    slug:{
        type:String,
        slug:'name'
    },
    isActive:{
        type:Boolean,
        default:true, 
    },
    isDelete:{
        type:Boolean,
        default:false, 
    },
    timeStamp       
});

const classSch = mongoose.model("classModel", classSchema);
module.exports = classSch;

