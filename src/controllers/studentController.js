const studentModel = require('../models/studentModel')
const { valStudent} = require ('../validations/schoolValidation')


//Create Student
const createStudent = async (req, res) => {
    try {
        const { name, address, contact, gender, classId, secId } = req.body;
        const { error } = valSection.validate(req.body);
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
        name,address,contact,gender,classId,secId,
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
  



module.exports={
    createStudent
}
