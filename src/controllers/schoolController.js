const schoolModel = require('../models/schoolModel')
const classModel = require('../models/classModel')
const sectionModel= require('../models/sectionModel')
const studentModel = require('../models/studentModel')
const { valSchool } = require('../validations/schoolValidation')
const {valLoginSchool} = require('../validations/schoolValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const models = require('../models/index')
const multer = require('multer')

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
        const checkSchool = await models.schoolModel.findOne({ $and: [{'email': req.body.email },{'isDeleted':false}] });
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
            isActive:req.body.isActive,
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
    const updatedSchool = await models.schoolModel.findByIdAndUpdate(id, req.body, { new: true });

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


//Update School with email check will update the detail other than email 
const updatedSchool= async (req, res) => {
    try {
        const schoolId = req.params.id;
        const {name,address,email,password,contact,image,banner} = req.body;

      const existingSchool = await models.schoolModel.findById({'_id':schoolId});  

      if (!existingSchool){
        return res.status(404).json({
            success:false,   
            message: 'School not found'
      });
    }
        if(email){
            const schoolEmail = await models.schoolModel.findOne({'email': email, '_id':{$ne:schoolId}});
            if(schoolEmail){
                return res.status(404).json({
                    success:false,   
                    message: 'Another School is existed with same email'
                });
            }
        }
        
        const updateSchool =  await models.schoolModel.findByIdAndUpdate(schoolId,req.body,{ new: true })
        return res.status(200).json({
            success:true,
            messae:"School is updated successfully",
            updateSchool
        });
    } catch (error) {
      return res.status(500).json({ 
          status:false,
          message: 'Internal Server Error', 
          error: error.message 
      });
    }
};

  
//get All data of school using lookup
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

//Soft Delete School
const deleteSchool = async(req,res)=>{
    try {
        const schoolId = req.params.id;
        const existingSchool = await schoolModel.findById({'_id':schoolId})
        if(existingSchool){
            req.body.isActive = false;
            req.body.isDelete = true;
            existingSchool.set(req.body);

            const deletedSchool = await existingSchool.save()
            // const schoolStatus = await models.schoolModel.find({'_id':schoolId}, req.body, { new: true });
            return res.status(200).json({
                success:true,
                message:'School is soft deleted successfully',
                deletedSchool
            })
        }else{
            return res.status(404).json({
                success:false,
                error:'School with provided id doesnot exist'           
            })
        }
 
    } catch (error) {
        console.error("Error deleting School:", error);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

//Soft delete all the record
//Hierarchy soft delete
const deleteSchoolRecord = async (req, res) => {
    try {
      const schoolId = req.params.id;
  
      // Find the school is existed
      const existingSchool = await models.schoolModel.findById(schoolId);
  
      if (!existingSchool) {
        return res.status(404).json({
          success: false,
          error: 'School with provided id does not exist',
        });
      }
  
      // Soft delete the school
            req.body.isActive = false;
            req.body.isDelete = true;
            existingSchool.set(req.body);
            await existingSchool.save();
  
      // Soft delete related classes
      const classes = await models.classModel.updateMany({ schoolId }, {
        
        $set: {isActive: false,isDelete: true,},
        
      });
      
  
      // Soft delete  sections
      const sections = await models.sectionModel.updateMany({ schoolId }, {
        $set: {
          isActive: false,
          isDelete: true,
        },
      });
  
      //Soft delete  students
      const students = await models.studentModel.updateMany({ schoolId }, {
        $set: {
          isActive: false,
          isDelete: true,
        },
        
      });
  
      return res.status(200).json({
        success: true,
        message: 'Hierarchy soft deleted successfully',
        deletedSchool: existingSchool,
        deletedClasses: classes,
        deletedSections: sections,
        deletedStudents: students,
      });
    } catch (error) {
      console.error("Error deleting hierarchy Data:", error);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
  



//Upload Images
const uploadImage = async(req,res)=>{
    var payload  = req.body;
   
        if(req.file) var imgUrl = `storage/images/${req.file.filename}`;
    try {
       const schoolImage = await new image(payload).save();
       return res.status().json({
        success: true,
        message: 'successful',
        data:schoolImage
      });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}



module.exports= {
    createSchool,
    loginSchool,
    updateSchool,
    getAllData,
    getAllSchool,
    updatedSchool,
    deleteSchool,
    deleteSchoolRecord
}