const models = require('../models/index')


//Create Category
const createCategory = async(req,res) =>{
    try {
        
        const{categoryName,libraryId} = req.body;
        const checkLibrary = await models.libraryModel.findById({'_id':libraryId})
        if (!checkLibrary){
        return res.status(400).json({
            success:false,
            error:'Library not existed'
        })
    }
        const checkCategory = await models.categoryModel.findOne({$and:[{'categoryName':categoryName},{'libraryId':libraryId}]});
        if (checkCategory){
        return res.status(400).json({
            success:false,
            error:'CategoryName is already existed'
            })
        }

        
    //Crete Category
        const newCategory = new models.categoryModel({          
            ...req.body
            
        });
        //Save Category
        const savedCategory = await newCategory.save()

        res.status(200).json({
            sucess: true,
            message: "Category is created successfully",
            data: savedCategory,
        });
    } catch (error) {
            res.status(500).json({
                success: false,
                message:error.message
            });
    }
}


module.exports = {
    createCategory,
    
}