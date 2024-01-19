const mongoose = require('mongoose');
const { nanoid } =require ('nanoid');

const schoolSchema =  new mongoose.Schema({
    _id:{
        type:string,
        default: ()=> nanoid(),
    },
    name: {
        type: string,
        required: true
    },
    address: {
        type: string,
        required: true,
        unique:false
    },

    email: {
        type: string,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique:true
    },
    image: {
        type: string,
    },
    banner:{
        type: string
    }
     
});

const school = mongoose.model("schoolModel", schoolSchema);
module.exports = school;

