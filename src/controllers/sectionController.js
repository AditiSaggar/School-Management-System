const sectionModel = require('../models/sectionModel')
const classModel = require('../models/classModel')
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
  

 
module.exports = {
    createSection,
    updateSection
}