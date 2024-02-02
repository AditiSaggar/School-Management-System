const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const bookSchema = new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    libraryId:{
        type:String,
        ref:"libraryModel",
        required:true
    },
    categoryId:{
        type:String,
        ref:"categoryModel",
        required:true
    },
    bookFee:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        slug:"title"
    },
    timeStamp
})

const books = mongoose.model("bookModel",bookSchema );
module.exports = books;