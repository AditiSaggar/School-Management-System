const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const teachSubModel =  new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    teacherId:{
        type:String,
        ref: 'teacherModels',
        required: true, 
    },
    subjectId: { 
            type:String,
            ref: 'subjectModels',
            required: true,
            unique:true
        },
})



const techSub = mongoose.model("teachSubModel", teachSubModel);
module.exports = techSub;