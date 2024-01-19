const schoolModel = require('../models/schoolModel')
const { valSchool } = require('../validations/schoolValidation')
const {valLoginSchool} = require('../validations/schoolValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
//const schoolService = require('../services/index')

// Create School
const createSchool = async(req,res) =>{
    
    try {
        const {error} = valSchool.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details.map((err) => err.message.replace(/"/g, ''))
        });
    }

    // Check if school with the given email already exists
        const checkSchool = await schoolModel.findOne({ email: req.body.email });
        if (checkSchool) {
            return res.status(400).json({
                status: false,
                error: "Email should be unique"
            });
        }

        // const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
    // Create new School
        const newSchool = new schoolModel({          
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password:hashedPassword,
            contact: req.body.contact,
            image: req.body.image,
            banner:req.body.image,
            isActive:req.body.isActive
        });
    // const{name,address,email,password,contact,image,banner,isActive}=req.body;
    //     const newSchool =  new schoolModel({  
    //             ...req.body
    //     });

        const savedSchool = await newSchool.save();
        if(savedSchool){
            res.status(201).json({
                status: true,
                data: savedSchool,
                message: "School created successfully"
                
            });
        }else 
        return res.status(400).json({
            status: false,
            error: "Failed to save school"
        });
       

    } catch (error) {
        console.error("Error in creating School:", error);
        res.status(500).json({
            status: false,
            //error: "Internal server error"
            message:error.message
        });
    }
}


//Login School
const loginSchool= async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const { error } = valLoginSchool.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((err) => err.message.replace(/"/g, ''))
        });
    }
    
        const school = await schoolModel.findOne({ email: email });
        console.log(school)
        if (school) {
            let isPasswordValid = await bcrypt.compare(password, school.password);

            if (isPasswordValid) {      
                
                const token = jwt.sign({school_Id : school._id,email }, process.env.Token_Key, { expiresIn: '30min' });

                return res.json({
                    data: { school, token },
                    status: true
                });
            } else {
                return res.status(403).json({     
                    status: false,
                    error: "password/email not correct"
                });
            }
        }else {
                return res.status(404).json({
                    status: false,
                    error: "School not found"
                });

        } 
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};



module.exports= {
    createSchool,
    loginSchool
}