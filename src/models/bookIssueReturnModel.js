const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');
const timeStamp = require('../utlis/moment')

const issueReturnSchema = new mongoose.Schema({
    _id:{
        type:String,
        default: () => nanoid(),
    },
    studentId:{
        type:String,
        ref:"studentModel",
        required:true
    },
    bookId:{
        type:String,
        ref:"bookModel",
        required:true,
        max:2
    },
    issueDate:{
        type:Date,
        default:Date.now(),
        // required:true
    },
    returnDate:{
        type:Date,
        default:Date.now(),
        // required:true
    },
    isReturn:{
        type:String,
        default:false
    },
    depositeFee:{
        type:Number,
        default:100
    },
    refundFee:{
        type:Number,
        
    },
    timeStamp
})

const issueReturn = mongoose.model("issueReturnModel", issueReturnSchema );
module.exports = issueReturn;
