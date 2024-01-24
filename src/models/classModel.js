const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

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
    }      
});

const classSch = mongoose.model("classModel", classSchema);
module.exports = classSch;

