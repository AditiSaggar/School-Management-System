const Joi = require('joi');

//Library
const valLibrary = Joi.object({
    email: Joi.string().email().lowercase().required().description("email should be unique"),
    contact:Joi.number().integer().min(100000000).max(9999999999).required(),
    schoolId:Joi.string().required(),
  })
  
module.exports = {
    valLibrary
}