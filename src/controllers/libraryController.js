//const libraryModel = require("../models/libraryModel")
//const schoolModel = require("../models/schoolModel")
const models = require('../models/index')
// const { valLibrary } = require('../validations/index')

//Create Library
const createLibrary = async(req,res)=>{
    try {

        //validation
        // const { error } = valLibrary.validate(req.body);
        // console.log("error", error)
        // if (error) {
        //      // console.log("error", error.message)
        //     return res.status(400).json({
        //          error: error.details.map((err) => {
        //         return err.message.replace(/"/g,'');
        //     })
        // });
        // }


        //check School existed/not in the schoolModel
            const{email,contact,schoolId} = req.body;
            const checkSchool = await models.schoolModel.findOne({'_id':schoolId})
        if (!checkSchool){
        return res.status(400).json({
            success:false,
            error:'School not existed'
        })
    }

    const checkLibrary = await models.libraryModel.findOne({email:req.body.email})
    if (checkLibrary){
        return res.status(400).json({
            success:false,
            error:'Email should be unique'
        })
    }
    // Create new Teacher
    const newLibrary = new models.libraryModel({          
        
        // email:req.body.email,
        // contact:req.body.contact,
        // schoolId:req.body.schoolId 
        ...req.body
    });
    //Save the newLibrary
    const savedlibrary = await newLibrary .save()
    if(savedlibrary){
        return res.status(200).json({
            success:true,
            message:'Library is created successfully',
            data:savedlibrary
        })
    }else{
        return res.status(400).json({
            success:false,
            error:'Failed to save library'
        }) 
        
    } 
}catch (error) {
        res.status(500).json({
            success:false,
           message:error.message
           
        })
    }
}

//Get the library when schoolId passed in the param
const getLibraryBySchoolId = async(req,res)=>{
        try {
            const schoolId = req.params.id;
        
            // Find school by ID
            const school = await models.schoolModel.findById(schoolId );
        
        if(school) {
            const library = await models.libraryModel.find({schoolId })
            
            return res.status(200).json({ 
              success: true, 
              message: 'library retrieved successfully',
              library
            }); 
              
          }else{
            return res.status(404).json({ 
              success: false, 
              message: 'library not found', 
              error: 'School with the provided ID does not exist' });
            } 
        
        } catch (error) {
            console.error('Error getting School by ID:', error);
            res.status(500).json({
               success: false, 
               message: 'Internal Server Error', 
               error: error.message 
              });
          }
}

//Update Library
const updatedLibrary = async (req, res) => {
    try {
        const libraryId = req.params.id;
        const {email,contact,schoolId} = req.body;

      const existingLibrary = await models.libraryModel.findById({'_id':libraryId});  
        if(!existingLibrary){
            return res.status(404).json({
                success:false,   
                message: 'Library not found'
            });
        }
        if(email){
            const libraryEmail = await models.libraryModel.findOne({'email': email, '_id':{$ne:libraryId}});
                if(libraryEmail){
                    return res.status(404).json({
                    success:false,   
                    message: 'Another library is existed with same email'
                });
            }
        }
        //Update the Details of library
        const updatelibrary =  await models.libraryModel.findByIdAndUpdate(libraryId,req.body,{ new: true })
        return res.status(200).json({
            success:true,
            messae:"Library is updated successfully",
            updatelibrary
        });
    } catch (error) {
      return res.status(500).json({ 
          success:false,
          message: 'Internal Server Error', 
          error: error.message 
      });
    }
};


module.exports ={
    createLibrary,
    getLibraryBySchoolId,
    updatedLibrary

}