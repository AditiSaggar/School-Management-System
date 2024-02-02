const models = require('../models/index');


//Create Book Issue and return Function
const createBookIssueReturn = async(req,res)=>{
    try {
        //checking that school, library and student are existed or not
        
        const {studentId,bookId,issueDate,returnDate,isReturn,depositeFee,refundFee}= req.body;
        const student = await models.studentModel.findById(studentId);
        const book = await models.bookModel.findById(bookId)
        
        if (!student && !book) {
            return res.status(404).json({
                success:'false',
                error:'Student  and book are not found'
            }) 
        }

        //Create book issue and return policy
        const bookIssue = await models.bookIssueReturnModel.find({'studentId':studentId})
        if(bookIssue.length < 2) {
        
        const newissueBook = new models.bookIssueReturnModel(req.body);
        const savedCategory = await newissueBook.save()
        return res.status(200).json({
            success:true,
            message:"Book issue",
            data:savedCategory
        })      
        }else{
            return res.status(400).json({
                success:false,
                error:'This Student already have 2 books'
            })
        }         
    
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports= {
    createBookIssueReturn
}