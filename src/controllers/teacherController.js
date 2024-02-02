const teacherModel = require('../models/teacherModel')
const subjectModel = require('../models/subjectModel')
const classModel = require('../models/classModel')
const teachSubModel = require('../models/teachSubModel')
const clsTeachSublink = require('../models/clsTechSubModel')
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

//Linking of Teacher,Class and Subject
const linkingClsSubTeach = async(req,res)=>{
    try {
        const{teacherId, subjectId, classId} = req.body;
        const teacher = await teacherModel.findById(teacherId);
        const subject = await subjectModel.findById(subjectId);
        const classes = await classModel.findById(classId);

        if (!teacher || !subject || !classes) {
            return res.Status(404).json({
                success:'false',
                error:'Teacher or Subject or class are not found'
            }) 
        }
        //check is subject already linked to the teacher
        const exitLink = await clsTeachSublink.findOne({teacherId, subjectId, classId});
        if (exitLink) {
            return res.status(403).json({
              success: false,
              error: 'Subject is already linked to the Teacher',
            });
        }
        // create the new link  or teacher, subject and class
        const newlink = new clsTeachSublink({
            teacherId,
            subjectId,
            classId
        });
      //Saved the new link  
      const savedLink= await newlink.save();
      res.status(200).json({
        success: true,
        message: 'Subject,class and Teacher are linked successfully',
        data: savedLink, 
      });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}

//Get All the subject when teacherId is passed in the param
const getSubjectByTeacherId = async (req, res) => {
    try {
        const teacherId = req.params.id;
    
        // Find teacher by ID
        const teacher = await teacherModel.findById(teacherId);
    
        if(teacher) {
          const allSubjects = await teachSubModel.find({teacherId})
        
        return res.status(200).json({ 
          success: true, 
          message: 'Subjects retrieved successfully',
          allSubjects
        }); 
          
      }else{
        return res.status(404).json({ 
          success: false, 
          message: 'Teacher not found', 
          error: 'Teacher with the provided ID does not exist' });
        } 
    
    } catch (error) {
        console.error('Error getting Teacher by ID:', error);
        res.status(500).json({
           success: false, 
           message: 'Internal Server Error', 
           error: error.message 
          });
      }
};

//Get All Subject in the class teach by which teacherId :: NEED to edit
const getSubofClsByTeachId = async(req,res)=>{
    try {
        const teacherId = req.params.id;
    
        // Find subject by teacherId by ID
        const teacher = await teacherModel.findById(teacherId);

        if(teacher){
        const allClasses = await clsTeachSublink.find({teacherId})
        //const allSubject = await clsTeachSublink.find({teacherId})

        //const allClasses = await classModel.find({teacherId})
        return res.status(200).json({ 
            success: true, 
            message: 'Classes retrieved successfully',
            allClasses
            }); 
            
          }else{
          return res.status(404).json({ 
            success: false, 
            message: 'Teacher not found', 
            error: 'Teacher with the provided ID does not exist' });
          } 
        }catch (error) {
        console.error('Error getting post by ID:', error);
        res.status(500).json({
           success: false, 
           message: 'Internal Server Error', 
           error: error.message 
          });
      }
};

//LookUp to get all the subjects by teacherId
const getSubjectdata = async (req,res)=>{
  try{
      const teacherId = req.params.id
      console.log(teacherId )
   
      if(!teacherId){
          return res.status(404).json({
              success:false,
              message:"Teacher not found"
          })
    }   
      if(teacherId)  {   
      const data  =await teachSubModel.aggregate([      
          {
              '$match':{
             'teacherId' : teacherId
              },
           },
          {                                                 
          $lookup:{
              from:"subjectschemas",
                  localField:"subjectId",                       
                  foreignField:"_id",                          
                  as:"subjectDetails",
              },
          },  
          {
            $unwind:'$subjectDetails'
          },
          {
            $project:{
              teacherId:1,
              subjectName:'$subjectDetails.name',
            },
          },  
      ]);
      if(data.length > 0){
      return res.status(200).json({
          status:true,
          messsage:'Subject Details',
          data,
      });
    }else{
      return res.status(404).json({
      success:false,
      messsage:'No Subject Found',
      
      });
}
}
  
      }catch (error) {
          console.log("error:",error);     
          return res.status(500).json({ 
              status:false,
              message: 'Internal Server Error' 
          });
  }
};


//LookUp to get subject of Class by passing teacherId
const getSubjectAndClassdata = async (req,res)=>{
  try{
      const teacherId = req.params.id
      console.log(teacherId )
   
      if(!teacherId){
          return res.status(404).json({
              success:false,
              message:"Teacher not found"
          })
    }   
      if(teacherId)  {   
      const data  = await clsTeachSublink.aggregate([      
          {
              '$match':{
             'teacherId' : teacherId
              },
          },
        {                                                 
          $lookup:{
              from:"subjectschemas",
                  localField:"subjectId",        //subjectId is present in the linking schema as  here is behave as the Schema               
                  foreignField:"_id",                          
                  as:"subjectDetails",
              },
        },  
          {
            $unwind:'$subjectDetails'
          },
        {
          $lookup:{
            from:"classmodels",
                localField:"classId",                       
                foreignField:"_id",                          
                as:"classDetails",
            },
        },
        {
          $unwind:'$classDetails'
        },
          {
            $project:{
              teacherId:1,
              // className:'$classDetails.grade',
              className:'$classDetails.name',
              subjectName:'$subjectDetails.name',
            }
          } 
      ]);
      if(data.length > 0){
      return res.status(200).json({
          status:true,
          messsage:'Details',
          data,
      });
    }else{
      return res.status(404).json({
      success:false,
      messsage:'No Subject and class Found',
      
    });
  }
    }
  
      }catch (error) {
          console.log("error:",error);     
          return res.status(500).json({ 
              status:false,
              message: 'Internal Server Error' 
          });
    }
};





module.exports={
    createTeacher,
    techSubLinking,
    linkingClsSubTeach,
    getSubjectByTeacherId,
    getSubofClsByTeachId,
    getSubjectdata,
    getSubjectAndClassdata
}
