const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const categorySchema = new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    categoryName:{
        type: String,
        required:true
    },
    libraryId:{
        type: String,
        ref:"libraryModel",
        required:true
    },
    timeStamp
})

const category = mongoose.model("categoryModel", categorySchema);
module.exports =category;