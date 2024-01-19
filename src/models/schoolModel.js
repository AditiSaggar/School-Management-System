const mongoose = require('mongoose');
const { nanoid } = require ('nanoid');

const schoolSchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: ()=> nanoid(),
    },
    name: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true,
        
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique:true
    },
    image: {
        type:String,
        required:true
    },
    banner:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
     
});

const school = mongoose.model("schoolModel", schoolSchema);
module.exports = school;

