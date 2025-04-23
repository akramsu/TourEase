const mongoose = require('mongoose');
const uploadToCloudinary = require('../helpers/cloudinaryHelper');
const img = require('../models/imgModel');
const fs = require('fs');

const uploadImg = async (req, res) => {
    try {
        //first we check file is missing in req object
        if(!req.file){
            return res.status(400).json({
                success:false,
                message: 'file is missing'
            });
        }
        
        //upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path);

        //now store the image url in db
        const newImg = new img({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newImg.save();

        //delete the file from local storage:
        // fs.unlinkSync(req.file.path)

        res.status(201).json({
            success: true,
            message: 'image is uploaded successfully',
            img: newImg
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'failed to upload image'
        });
    }    
}

const getAllImages = async(req, res) =>{
    try {
        const images = await img.find({});

        if (!images) {
            res.status(404).json({
                success: false,
                message: 'no images were found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'get all images successfully',
            images
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to get all images!'
        })
    }
}

module.exports = {uploadImg, getAllImages};