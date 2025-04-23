const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

//set multer storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {  //cd = call back function
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {   //this will store the method of naming the files uploaded
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});


  const checkFileFilter = (req,file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }else{
        cb(new Error('not an image! please upload only images!'));
    }
    console.log('check file function is triggered'); 
  }

  
//multer middleware
module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB file size limits
    }
})