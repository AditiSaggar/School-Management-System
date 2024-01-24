const Joi = require('joi');


const valSchool = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({ 'any.required': 'Name is a required', }),
  address: Joi.string().max(30).required(),
  email: Joi.string().email().lowercase().required().description("email should be unique"),
  password: Joi.string().min(6).required(),
  contact:Joi.number().integer().min(100000000).max(9999999999).required(),
  image: Joi.string().min(10).max(10).required(),
  banner:Joi.string().min(10).max(10).required(),

});

//Login School
const valLoginSchool = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(), 
  });

//Class 
const valclass = Joi.object({
//    grade : Joi.string().required(),
   
});

//Section
const valSection = Joi.object({
    // section : Joi.string().required(),
    
 });

//Student
const valStudent = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({ 'any.required': 'Name is a required', }),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().lowercase().required().description("email should be unique"),
    password: Joi.string().min(6).required(),
    contact:Joi.number().integer().min(100000000).max(9999999999).required(),
    gender:Joi.string().required(),
    classId:Joi.string().required(),
    secId:Joi.string().required(),

})

module.exports = {
    valSchool,
    valLoginSchool,
    valclass,
    valSection,
    valStudent
}