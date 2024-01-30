const studentModel = require('../models/studentModel')
const classModel = require('../models/classModel')
const sectionModel=require('../models/sectionModel')
const schoolModel = require('../models/schoolModel')
const { valStudent} = require ('../validations/schoolValidation')


//Create Student
const createStudent = async (req, res) => {
    try {
        const { name, email,password,address, contact, gender, classId, secId } = req.body;
        const { error } = valStudent.validate(req.body);
        // console.log("error", error)
        if (error) {
             // console.log("error", error.message)
            return res.status(400).json({
                 error: error.details.map((err) => {
                return err.message.replace(/"/g,'');
            })
        });
    }
  
      // Validate if the specified classId and secId exist
      const classExists = await classModel.findById(classId);
      const sectionExists = await sectionModel.findById(secId);
  
      if (!classExists || !sectionExists) {
        return res.status(400).json({
          status: false,
          error: 'Invalid classId or secId',
        });
      }
      const newStudent = new studentModel({
        name,email,password,address,contact,gender,classId,secId,
      });
  
      const savedStudent = await newStudent.save();
  
      if (savedStudent) {
        res.status(201).json({
          status: true,
          message: 'Student created successfully',
          data: savedStudent,
        });
      } else {
        res.status(500).json({
          status: false,
          message: 'Failed to save student',
        });
      }
  
    } catch (error) {
      console.error('Error in creating student', error);
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
};
 
  

//Update Student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ 
        status:false,
        message: 'Student not found'
       });
    }

    return res.status(200).json(updatedStudent);
  } catch (error) {
    return res.status(500).json({ 
      status:false,
      message: 'Internal Server Error', 
      error: error.message });
  }
};

//get All Student
const getAllStudents = async (req, res) =>{
  try {
      const students = await classModel.find();
      if(!students){
          return res.status(404).json({
              success:false,
              error:'Student with the provided ID does not exist'
              
              
          })
      } else{
          return res.status(200).json({
              sucess:true,
              message:'All the Students retrieved successfully',
              students
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

//Get the total no of Student of a particular school
const getStudentBySchoolId = async (req, res) => {
  try {
    const schoolId = req.params.id;

    // Find post by ID
    const  school = await schoolModel.findById(schoolId);

    if (school) {
      const allStudents = await studentModel.aggregate([
        {
          '$count': 'string'
        }
      
    ])
    return res.status(200).json({ 
      success: true, 
      message: 'Student retrieved successfully',
      allStudents
      });
      
    }else{
    return res.status(404).json({ 
      success: false, 
      message: 'school not found', 
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



module.exports={
    createStudent,
    updateStudent,
    getAllStudents,
    getStudentBySchoolId
}
