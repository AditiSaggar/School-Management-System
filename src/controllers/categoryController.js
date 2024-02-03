const models = require('../models/index')


//Create Category
// const createCategory = async(req,res) =>{
//     try {
        
//         const{categoryName,libraryId} = req.body;
//         const checkLibrary = await models.libraryModel.findById({'_id':libraryId})
//         if (!checkLibrary){
//         return res.status(400).json({
//             success:false,
//             error:'Library not existed'
//         })
//     }
//         const checkCategory = await models.categoryModel.findOne({$and:[{'categoryName':categoryName},{'libraryId':libraryId}]});
//         if (checkCategory){
//         return res.status(400).json({
//             success:false,
//             error:'CategoryName is already existed'
//             })
//         }

        
//     //Crete Category
//         const newCategory = new models.categoryModel({          
//             ...req.body
            
//         });
//         //Save Category
//         const savedCategory = await newCategory.save()

//         res.status(200).json({
//             sucess: true,
//             message: "Category is created successfully",
//             data: savedCategory,
//         });
//     } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message:error.message
//             });
//     }
// }

const createCategory = async (req, res) => {
    try {
      const { categoryName, libraryId } = req.body;

      if (!categoryName || !libraryId) {
        return res.status(400).json({
          success: false,
          message: 'Category name and library ID are required.',
        });
      }
  
      // Create a new category
      const newCategory = await models.categoryModel.create({
        categoryName,
        libraryId,
      });
  
      return res.status(201).json({
        success: true,
        message: 'Category created successfully.',
        newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };
  

//Update Category
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const{categoryName,libraryId} = req.body;
  
        if (!categoryName || !libraryId) {
            return res.status(400).json({
              success: false,
              message: 'Category name and library ID are not found.',
            });
          }
          const existingCategory = await models.categoryModel.findOne({'categoryName':categoryName, '_id':{$ne:categoryId}});

      if(existingCategory ){
        return res.status(404).json({
            success:false,
            message:'Category Name is already in use', 
            existingCategory 
          });
      }
      //Update the Details of Category
      const updatedCategory =  await models.categoryModel.findByIdAndUpdate(categoryId,{categoryName,libraryId},{ new: true })
      return res.status(200).json({
          success:true,
          messae:"Category is updated successfully",
          updatedCategory
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
    createCategory,
    updateCategory
}