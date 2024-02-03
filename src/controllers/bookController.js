const models = require('../models/index')
const slugify = require('slugify')

//Create Book
const createBook = async (req,res)=>{
    try {

        const{title, author, description,libraryId,categoryId,bookFee} = req.body;
        const isLibrary = await models.libraryModel.findOne({ '_id': libraryId });
        const isCategory   = await models.categoryModel.findOne({'_id':categoryId})

        if (!isLibrary && !isCategory) {
            return res.json({
              status:false,
              message: "Library and Category not exists"
            });
          }

        //Create slug
        const slug = slugify(title, {
            replacement:'-',
            lower: true
        });

    const isSlug = await models.bookModel.findOne({'slug': slug});
    if (isSlug){
      return res.status(400).json({
        status:false,
        message: 'slug is already created'
        
        })
    }
     //Create New Book
        const newBook = await models.bookModel.findOne( { title })
        
        if (!newBook) {
            const newClass = await models.bookModel.create({
                ...req.body,
                slug
            })
            res.status(200).json({
                success: true,
                message: "Book created successfully",
                data: newClass,
                
            });
        } else {
            res.status(400).json({ 
                status: false,
                error:"Book should be unique"
            });
        }  
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}

//GET API
//Get books by categoryId
const getBookByCategoryId = async(req,res)=>{
    try {
        const categoryId  = req.params.id;
    
        // Find category by ID
        const category = await models.categoryModel.findById({_id:categoryId});
    
    if(category) {
        const books = await models.bookModel.find({categoryId })
        
        return res.status(200).json({ 
          success: true, 
          message: 'Books retrieved successfully',
          books
        }); 
          
      }else{
        return res.status(404).json({ 
          success: false, 
          message: 'Books not found', 
          error: 'category with the provided ID does not exist' });
        } 
    
    } catch (error) {
        console.error('Error getting category by ID:', error);
        res.status(500).json({
           success: false, 
           message: 'Internal Server Error', 
           error: error.message 
          });
      }
}

//get bookDetails by bookId
const getBookBybookId = async (req,res)=>{
    try {
        const bookId  = req.params.id;
    
        // Find book by bookID
        const bookDetail = await models.bookModel.find({_id:bookId})
        if(bookDetail){
        return res.status(200).json({ 
          success: true, 
          message: 'Books with provided Id retrieved successfully',
          bookDetail
        }); 
          
      }else{
        return res.status(404).json({ 
          success: false, 
          message: 'Books not found', 
          error: 'Book with the provided ID does not exist' });
        } 
    
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Internal Server Error', 
            error: error.message 
           });
       }
}

//Get books by libraryId
const getBookBylibraryId = async(req,res)=>{
    try {
        const libraryId  = req.params.id;
    
        // Find category by ID
        const library = await models.libraryModel.findById(libraryId);
    //Check Library exist
    if(library) {
        const books = await models.bookModel.find({libraryId})
        
        return res.status(200).json({ 
          success: true, 
          message: 'Books from the library retrieved successfully',
          books
        }); 
          
      }else{
        return res.status(404).json({ 
          success: false, 
          message: 'Books not found', 
          error: 'Book with the provided ID does not exist' });
        } 
    
    } catch (error) {
        console.error('Error getting library by ID:', error);
        res.status(500).json({
           success: false, 
           message: 'Internal Server Error', 
           error: error.message 
          });
      }
}


module.exports={
    createBook,
    getBookByCategoryId,
    getBookBybookId,
    getBookBylibraryId
}

