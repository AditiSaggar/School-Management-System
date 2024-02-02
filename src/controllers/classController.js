const classModel = require('../models/classModel')
const schoolModel = require('../models/schoolModel')
const studentModel = require('../models/studentModel')
// const valclass = require('../validations/schoolValidation')
const slugify = require('slugify');



//Create Class
const createClass = async (req, res) => {

    // const { error } = valclass.validate(req.body);
    // // console.log("error", error)
    // if (error) {
    //     // console.log("error", error.message)
    //     return res.status(400).json({
    //         error: error.details.map((err) => {
    //             return err.message.replace(/"/g,'');
    //         })
    //     });
    // }

    try {
        const { name, schoolId } = req.body;
        //Check that School is existed 
        const isSchool = await schoolModel.findOne({ '_id': schoolId });
        
        //Create slug
        const slug = slugify(name, {
            replacement:'-',
            lower: true
        });

    const isSlug = await classModel.findOne({'slug': slug});
    if (isSlug){
      return res.status(400).json({
        status:false,
        message: 'slug is already created'
        
    })
    }

    if (!isSchool) {
      return res.json({
        status:false,
        message: "School not exists"
      });
    }

        let newClass = await classModel.findOne( { name, schoolId })
        
        if (!newClass) {
            const newClass = await classModel.create({
                name,
                schoolId,
                slug
            })

            res.status(200).json({
                data: newClass,
                message: "Class created successfully",
                status: true
            });
        } else {
            res.status(400).json({ 
                status: false,
                error:"ClassName should be unique"
            });
        }
    } catch (error) {
        console.error("Error creating  new class:", error);
        res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
}

//Update Class
const updateClass= async (req, res) => {
    const { id } = req.params;
  
    try {
        // const{ name, schoolId} = req.body;
      const updatedClass = await classModel.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedClass) {
        return res.status(404).json({
          status:false, 
          message: 'Class not found' });
      }else{
          return res.status(200).json({
            status:true,
            message:'Class is Upated successfully',
              updatedClass
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

//Get All Classes
const getAllClasses = async (req, res) =>{
    try {
        const classes = await classModel.find();
        if(!classes){
            return res.status(404).json({
                success:false,
                error:'Class with the provided ID does not exist'
                
                
            })
        } else{
            return res.status(200).json({
                sucess:true,
                message:'Classes retrieved successfully',
                classes
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


//Get All Classes of School
const getClassesBySchoolId = async (req, res) => {
    try {
      const schoolId = req.params.id;
  
      // Find post by ID
      const  school = await schoolModel.findById(schoolId);
  
      if (school) {
        const allClasses = await classModel.aggregate([
          {
            '$count': 'string'
          }  
      ])
      return res.status(200).json({ 
        success: true, 
        message: 'Classes retrieved successfully',
        allClasses
        });
        
      }else{
      return res.status(404).json({ 
        success: false, 
        message: 'School not found', 
        error: 'School with the provided ID does not exist' });
      } 
  
    } catch (error) {
      console.error('Error getting post by ID:', error);
      res.status(500).json({
         success: false, 
         message: 'Internal Server Error', 
         error: error.message 
        });
    }
  };



//get Count of Students when classId is passed in the param
const getStudentByClassId = async (req, res) => {
    try {
      const classId = req.params.id;
  
      // Find class by ID
      const  classes = await classModel.findById(classId);
  
      if(classes) {
        const allStudents = await studentModel.aggregate([
          {
            '$count': 'string'
          }
      ])
      return res.status(200).json({ 
        success: true, 
        message: 'Stduents retrieved successfully',
        allStudents
        }); 
        
      }else{
      return res.status(404).json({ 
        success: false, 
        message: 'Class not found', 
        error: 'Class with the provided ID does not exist' });
      } 
  
    } catch (error) {
      console.error('Error getting post by ID:', error);
      res.status(500).json({
         success: false, 
         message: 'Internal Server Error', 
         error: error.message 
        });
    }
  };



module.exports={
    createClass,
    updateClass,
    getAllClasses,
    getClassesBySchoolId,
    getStudentByClassId
}



