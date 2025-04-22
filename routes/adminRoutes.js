const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/admin', authMiddleware, adminMiddleware,(req, res) =>{
    res.json({
        message: 'welcome to the admin page',
    });
});

module.exports = router;