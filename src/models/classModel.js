const { string } = require('joi');
const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const classSchema =  new mongoose.Schema({
    _id:{
        type:string,
        default: ()=> nanoid(),
    },
    Grade: {
        type: string,
        required: true
    },
    schoolId: {
        type: string,
        ref: 'schoolModel',
        required: true,
    }      
});

const classSch = mongoose.model("classlModel", classSchema);
module.exports = classSch;

