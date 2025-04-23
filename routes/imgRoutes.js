const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const {uploadImg, getAllImages} = require('../controllers/imgController');


router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImg);
router.get('/getImages', authMiddleware, getAllImages);

module.exports = router;