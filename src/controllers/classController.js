const classModel = require('../models/classModel')
const valclass = require('../validations/schoolValidation')


const createClass = async (req, res) => {
    // const { error } = valclass.validate(req.body);
    // // console.log("error", error)
    // if (error) {
    //     // console.log("error", error.message)
    //     return res.status(400).json({
    //         error: error.details.map((err) => {
    //             return err.message.replace(/"/g,'');
    //         })
    //     });
    // }

    const { grade, schoolId } = req.body;
    
    try {
       
        let newClass = await classModel.findOne( { grade, schoolId })
        
        if (!newClass) {
            const newClass = await classModel.create({
                grade,
                schoolId
            })

            res.status(200).json({
                data: newClass,
                message: "Class created successfully",
                status: true
            });
        } else {
            res.status(400).json({ 
                status: false,
                error:"className should be unique"
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




module.exports={
    createClass
}