const sectionModel = require('../models/sectionModel')
const classModel = require('../models/classModel')
const studentModel=require('../models/studentModel')
const models = require('../models/index')
//const { valSection} = require ('../validations/schoolValidation')
const slugify = require('slugify');

//Create Section
const createSection = async (req, res) => {

    try {
        const { name, classId } = req.body;

        const isClass = await classModel.findOne({ '_id': classId });
          

        //Create slug
        const slug = slugify(name, {
            replacement:'-',
            lower: true
        });

    const isSlug = await sectionModel.findOne({'slug': slug});
    if (isSlug){
      return res.status(400).json({
        status:false,
        message: 'slug is already created'
    })
    }

    if (!isClass ) {
      return res.json({
        status:false,
        message: "Class does not exists"
      });
    }

        let newSection = await sectionModel.findOne( { name, classId })
        
        if (!newSection) {
            const newSection = await sectionModel.create({
                name,
                classId,
                slug
            })

            res.status(200).json({
                data: newSection,
                message: "Section created successfully",
                status: true
            });
        } else {
            res.status(400).json({ 
                status: false,
                error:"Section should be unique"
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

//update section
const updateSection= async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedSection = await sectionModel.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedSection) {
        return res.status(404).json({
          status:false, 
          message: 'Section not found' 
        });
      }else{
          return res.status(200).json({
            status:true, 
            message: 'Section updated successfully', 
              updatedSection
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
  
//Get All Sections
const getAllSections = async (req, res) =>{
  try {
      const section = await sectionModel.find();
      if(!section){
          return res.status(404).json({
              success:false,
              error:'Section with the provided ID does not exist'
              
              
          })
      } else{
          return res.status(200).json({
              sucess:true,
              message:'Section retrieved successfully',
              section
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
 

//get Students per section
const getStudentBySectionId = async (req, res) => {
    try {
      const sectionId = req.params.id;
  
      // Find section by ID
      const  section = await sectionModel.findById(sectionId );
  
      if(section) {
        const allStudents = await studentModel.aggregate([
          {
            '$count': 'count'
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
        message: 'section not found', 
        error: 'section with the provided ID does not exist' });
      } 
  
    } catch (error) {
      console.error('Error getting section by ID:', error);
      res.status(500).json({
         success: false, 
         message: 'Internal Server Error', 
         error: error.message 
        });
    }
  };

//Update section ddetail
const  updateSectionDetail  = async (req, res) => {
  try {
      const sectionId = req.params.id;
      const {name,classId,slug} = req.body;

    const section = await models.sectionModel.findOne({_id:sectionId});
    if(!section){
      return res.status(404).json({
          success: false, 
          message: 'Section with provided Id does not found' 
    });
  }
    if(slug){
      const checkSection = await models.sectionModel.findOne({'slug': slug, '_id':{$ne:sectionId}});
      if(checkSection){
      return res.status(404).json({
          success:false,
          message:'Slug already is in use.Cant Update', 
          checkSection
        });
    }
  }
    //Update the Details of Class
    const updatedSection =  await models.sectionModel.findByIdAndUpdate( sectionId,req.body,{ new: true })
    return res.status(200).json({
        success:true,
        messae:"Section updated successfully",
        updatedSection
    });

  } catch (error) {
    return res.status(500).json({ 
        status:false,
        message: 'Internal Server Error', 
        error: error.message 
    });
  }
}; 


module.exports = {
    createSection,
    updateSection,
    getAllSections,
    getStudentBySectionId,
    updateSectionDetail 
}