const schoolModel = require('../models/schoolModel')
const classModel = require('../models/classModel')
const sectionModel= require('../models/sectionModel')
const studentModel = require('../models/studentModel')
const { valSchool } = require('../validations/schoolValidation')
const {valLoginSchool} = require('../validations/schoolValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


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
const loginSchool = async (req, res) => {
    
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

//Update School

const updateSchool= async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSchool = await schoolModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSchool) {
      return res.status(404).json({
        status:false, 
        message: 'School not found' });
    }else{ 
        return res.status(200).json({
            updatedSchool
        });
    }
  
  } catch (error) {
    return res.status(500).json({ 
        status:false,
        message: 'Internal Server Error', 
        error: error.message 
    });
  }
};

//get All data od school using lookup
const getAllData = async (req, res) => {
    try {
        const schoolId = req.params.id
    console.log(schoolId)

    const isSchool = await schoolModel.findById(schoolId)
        if(!isSchool){
             return res.status(404).json({
                 status:false,
                 message:"School not found"
            })
        
        } 
        const data= await schoolModel.aggregate([ 
                {
                  '$match': {
                    '_id': schoolId
                  }
                },        
            {
                    $lookup:{
                        from:"classmodels",
                        localField:"_id",
                        foreignField:"schoolId",
                        as:"ClassDetails"
                    }
                },
                {
                    $unwind:{
                        path:'$ClassDetails',
                        preserveNullAndEmptyArrays:true
    
                    }
                },
                {
                    $lookup:{
                        from:"sectionmodels",
                        localField:"_id",
                        foreignField:"classId",
                        as:"ClassDetails.SectionDetails"
                    }
                },
                {
                    $unwind:{ 
                        path:'$ClassDetails.SectionDetails',
                        preserveNullAndEmptyArrays:true
                    }
                },
                {
                    $lookup:{
                        from:"studentmodels",
                        localField:"_id",
                        foreignField:"secId",
                        as:"ClassDetails.SectionDetails.StudentDetails"
                    }
                },
                // {
                //     $group:{
                //         _id:'$_id',
                //         school:{$first:'$$ROOT'},
                //         classes:{push:'$ClassDetails'},
                //         sections:{push:'$ClassDetails.SectionDetails'},
                //         students:{push:'$ClassDetails.SectionDetails.StudentDetails'}
                //     } 
                // },
                // {
                //     $project:{
                //         classmodels:{
                //             _id:'$schooId',
                //             classes:'$ClassDetails',
                //             sections:'$SectionDetails',
                //             students:'$StudentDetails'
                //         },
                //         sectionmodels:{
                //             _id:'$sectionId',
                //             classes:'$ClassDetails',
                //             sections:'$SectionDetails',
                //             students:'$StudentDetails'
                //         },
                //         studentmodels:{
                //             _id:'$studentId',
                //                 classes:'$ClassDetails',
                //                 sections:'$SectionDetails',
                //                 students:'$StudentDetails'
                //             },
                //     },
                // }
                //{
//     $project:{
//         _id:1,
//         school:1,
//         classes:1,
//         sections:1,
//         students:1
//     }
// }
        ]);
        return res.status(200).json({
            status:true,
            messsage:'School Details',
            data,
        });

    } catch (error) {
        return res.status(500).json({ 
            success:false,
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
}

//Reterive all school
const getAllSchool = async (req, res) =>{
    try {
        const schools = await schoolModel.find();
        if(!schools){
            return res.status(404).json({
                success:false,
                error:'School with the provided ID does not exist'
                
                
            })
        } else{
            return res.status(200).json({
                sucess:true,
                message:'School retrieved successfully',
                schools
            })
        }
        
    } catch (error) {
        return res.status(500).json({ 
            status:false,
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
}



module.exports= {
    createSchool,
    loginSchool,
    updateSchool,
    getAllData,
    getAllSchool
}