const teacherModel = require('../models/teacherModel')
const subjectModel = require('../models/subjectModel')
const teachSubModel = require('../models/teachSubModel')
const { valTeacher }  = require('../validations/schoolValidation')


//Create Teacher
const createTeacher = async(req,res)=>{
    try {
        
        const { error } = valTeacher.validate(req.body);
        // console.log("error", error)
        if (error) {
             // console.log("error", error.message)
            return res.status(400).json({
                 error: error.details.map((err) => {
                return err.message.replace(/"/g,'');
            })
        });
    }
    const checkTeacher = await teacherModel.findOne({email:req.body.email})
    if (checkTeacher){
        return res.status(400).json({
            success:false,
            error:'Email should be unique'
        })
    }

    // Create new Teacher
    const newTeacher = new teacherModel({          
        //...req.body
        firstName:req.body.firstName,
        lastName:req.body.lastName, 
        email:req.body.email,
        dateOfBirth:req.body.dateOfBirth,
        contact:req.body.contact,
        gender: req.body.gender,
        address:req.body.address,
        schoolId:req.body.schoolId 
    });
    //Save the newTeacher
    const savedTeacher = await newTeacher.save()
    // if(savedTeacher){
    //     return res.status(200).json({
    //         success:true,
    //         message:'Teacher is created successfully',
    //         data:savedTeacher
    //     })
    // }else{
    //     return res.status(400).json({
    //         success:false,
    //         error:'Faile to save Teacher'
    //     })
    // }
    res.status(200).json({
        sucess: true,
        message: "Teacher is created successfully",
        data: savedTeacher,
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}

//Linking of Teacher and Subject
const techSubLinking = async(req,res)=>{
    try {
        const{teacherId, subjectId} = req.body;
        const teacher = await teacherModel.findById(teacherId);
        const subject = await subjectModel.findById(subjectId);

        if (!teacher || !subject) {
            return res.Status(404).json({
                success:'false',
                error:'Teacher or Subject are not found'
            }) 
        }
        //check is subject already linked to the teacher
        const exitLink = await teachSubModel.findOne({teacherId, subjectId});
        if (exitLink) {
            return res.status(403).json({
              success: false,
              error: 'Subject is already linked to the Teacher',
            });
          }
    // create the new link 
      const newlink = new teachSubModel({
        teacherId,
        subjectId
      });
      await newlink.save();
      res.status(200).json({
        success: true,
        message: 'Subject linked to teacher successfully',
        data: newlink, 
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}




module.exports={
    createTeacher,
    techSubLinking
}
