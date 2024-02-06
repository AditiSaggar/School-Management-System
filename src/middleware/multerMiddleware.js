const multer = require('multer')
const path = require("path");

//configration setup
// const storageEngine = multer.diskStorage({
//     destination: "upload/",
//     filename:(req, file, cb)=> {     
//       cb(null, `${Date.now()}--${file.originalname}`);
//     },
// });

// const checkFileType = function (file, cb) {
// const fileTypes = /jpg|png/;
// //check extension names
// const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//        if (extName) {
//        return cb(null, true);
//    } else {
//    cb("Error: You can Only Upload Images!!");
//  }
// }
// const uploadImage = multer({
//     storage: storageEngine,
//     fileiltddr :function(req,file,cb){
//         checkFileType(file,cb)
//     }
// });

// module.exports = multer({
//     uploadImage
// })


const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('jpg and png file supported'));
    }
    cb(null, true);
  }
});

module.exports =  upload
    