const mongoose = require('mongoose');
const uploadToCloudinary = require('../helpers/cloudinaryHelper');
const img = require('../models/imgModel');
const user = require('../models/userModel');
const cloudinaryConfig = require('../config/cloudinaryConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const fs = require('fs');
const { userInfo } = require('os');

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page -1 ) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'acs' ? 1 : -1;

        totalImages = await img.countDocuments(); //a built in function in mongoose to count documents(data)
        totalPages = Math.ceil(totalImages/ limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await img.find().sort().limit(limit).skip(skip);

        if (!images) {
            res.status(404).json({
                success: false,
                message: 'no images were found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'get all images successfully',
            currentPage: page,
            totalImages: totalImages,
            totalPages: totalPages,
            date: images
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to get all images!'
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const foundImage = await img.findById(imageId);

        //check whether images is in the DB or not
        if (!foundImage) {
            res.status(404).json({
                success: false,
                message: 'image was not found!'
            })
        }
        
        const currentUserId = req.userInfo.userId;
        const checkUser = await user.findById(currentUserId);
    
        if(!checkUser){
            res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }
    
        //now we check that image can be deleted only by the admin who uploaded it only
        
        if (foundImage.uploadedBy.toString() !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'access denied cannot delete an image uploaded by other amdin'
            });
        }
        
        //first we delete image from cloudinary
        await cloudinaryConfig.uploader.destroy(foundImage.publicId);
    
        //now we delete it from DB
        await img.findByIdAndDelete(imageId);
    
        res.status(200).json({
            success: true,
            message: 'image has been deleted successfully'
        });
    
    } catch (error) {
        console.log('failed due to an error', error);
        res.status(500).json({
            success: false,
            message: 'failed to delete image'
        });
    }
};

module.exports = {uploadImg, getAllImages, deleteImage};