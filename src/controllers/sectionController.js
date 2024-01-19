const sectionModel = require('../models/sectionModel')
const { valSection} = require ('../validations/schoolValidation')


//Create Section
const createSection = async (req, res) => {

    try {
        const { section, classId } = req.body;

    // const { error } = valSection.validate(req.body);
    // // console.log("error", error)
    // if (error) {
    //     // console.log("error", error.message)
    //     return res.status(400).json({
    //         error: error.details.map((err) => {
    //             return err.message.replace(/"/g,'');
    //         })
    //     });
    // }
     // unique check on section
     const isUniqueSection = await sectionModel.findOne({ section:req.body.section })   
        if(isUniqueSection){
            res.status(400).json({ 
                status: false,
                error:"Section must be unique within the class",
            });
        }
        const newSection = await sectionModel.create({
            section,
            classId
        })
        //let newSection = await sectionModel.findOne( { section, classId  })
        
        
        const savedSection = await newSection.save();
        
        if(savedSection) {
            return  res.status(201).json({
                data: newSection,
                message: "Section created successfully",
                status: true
            });
        } else {
            res.status(400).json({ 
                status: false,
                error:"Failed to save section"
            });
        }
    } catch (error) {
        console.error("Error in creating  new class:", error);
        res.status(500).json({
            status: false,
            message:error.message,
        });
    }
}

module.exports = {
    createSection
}