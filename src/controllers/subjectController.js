//const subjectModels = require('../models/subjectModel')
const models = require('../models/index')
const slugify = require('slugify')


//Create Subject
const createSubject = async (req,res)=>{
    try {
        const { name, subjectCode} = req.body;

        const slug = slugify(name, {
            replacement:'-',
            lower: true
        });

    const isSlug = await models.subjectModel.findOne({'slug': slug});
    if (isSlug){
      return res.status(400).json({
        success:false,
        message: 'slug is already created'
        })
    }

    //Create new Subject
        const newSubject = await models.subjectModel.findOne( { name, subjectCode })
        if(!newSubject){
            const newSubject = new subjectModels({
            name,
            subjectCode,
            slug
            
        });
        const savedSubject = await newSubject.save()
        
        res.status(200).json({
            success: true,
            data: savedSubject,
            message: "Subject created successfully",
        });
    } else {
        res.status(400).json({ 
            success:'false',
            error:"Subject Name should be unique"
        });
    }
    }catch (error) {
        return res.status(500).json({
            success:'false',
            message:error.message
        })
    }
}


//Update Subject
const updateSubject= async (req, res) => {
    try {
        const subjectId = req.params.id;
        const {name, subjectCode,slug} = req.body
      const subject = await models.subjectModel.findById({'_id':subjectId})
      if(!subject){
        return res.status(404).json({
            success: false, 
            message: 'Subject not updated' 
      })
    }
      if(slug){
        const checkSubject = await models.subjectModel.findOne({'slug': slug, '_id':{$ne:subjectId } });
        return res.status(404).json({
            success:false,
            message:'Slug already is in use', 
            checkSubject
          });
      }
      //Update the Details of Subject
      const updatedSubject =  await models.subjectModel.findByIdAndUpdate( subjectId,req.body,{ new: true })
      return res.status(200).json({
          success:true,
          messae:"Subject is updated successfully",
          updatedSubject
      });

    } catch (error) {
      return res.status(500).json({ 
          status:false,
          message: 'Internal Server Error', 
          error: error.message 
      });
    }
  };




module.exports={
    createSubject,
    updateSubject
}