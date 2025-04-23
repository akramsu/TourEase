const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {uploadImg, getAllImages, deleteImage} = require('../controllers/imgController');


router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImg);
router.get('/getImages', authMiddleware, getAllImages);
router.delete('/deleteImage/:id', authMiddleware, adminMiddleware, deleteImage);

module.exports = router;