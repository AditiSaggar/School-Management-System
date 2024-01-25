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
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
    },
    slug:{
        type:String,
        slug:'name'
    },        
});

const subject= mongoose.model("subjectSchema", subjectSchema);
module.exports = subject;
