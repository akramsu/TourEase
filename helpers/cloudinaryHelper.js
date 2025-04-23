const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinaryConfig');

const uploadToCloudinary = async(filePath) => {
    try {
        
        // Upload an image
         const uploadResult = await cloudinary.uploader.upload(filePath);
           
        console.log(uploadResult);

        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        }
        
        // // Optimize delivery by resizing and applying auto-format and auto-quality
        // const optimizeUrl = cloudinary.url('shoes', {
        //     fetch_format: 'auto',
        //     quality: 'auto'
        // });
        
        // console.log(optimizeUrl);
        
        // // Transform the image: auto-crop to square aspect_ratio
        // const autoCropUrl = cloudinary.url('shoes', {
        //     crop: 'auto',
        //     gravity: 'auto',
        //     width: 500,
        //     height: 500,
        // });
        
        // console.log(autoCropUrl);   

    } catch (error) {
        console.log('there is an error uploading to cloudinary!', error);
        throw new Error('there is an error uploading to cloudinary!');
    }
};

module.exports = uploadToCloudinary;