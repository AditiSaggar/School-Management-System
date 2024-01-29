const subjectModels = require('../models/subjectModel')
const slugify = require('slugify')


//Create Subject
const createSubject = async (req,res)=>{
    try {
        const { name, subjectCode} = req.body;

        const slug = slugify(name, {
            replacement:'-',
            lower: true
        });

    const isSlug = await subjectModels.findOne({'slug': slug});
    if (isSlug){
      return res.status(400).json({
        success:false,
        message: 'slug is already created'
        })
    }

    //Create Subject
    
        const newSubject = await subjectModels.findOne( { name, subjectCode })
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


module.exports={
    createSubject
}