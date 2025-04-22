const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/superadmin', authMiddleware, (req, res) =>{
    res.send({
        message: 'welcome to the super admin page',
        
    })
});

module.exports = router;