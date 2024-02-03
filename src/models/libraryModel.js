const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const librarySchema =  new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    email:{
        type:String,
        required:true,
        unique:true
       
    },
    contact:{
        type:Number,
        required:true,
        max:10
    },
    schoolId: {
        type: String,
        ref: 'schoolModel',
        required: true,
        unique:true
    },
    timeStamp
})

const library = mongoose.model("libraryModel",librarySchema)
module.exports = library;