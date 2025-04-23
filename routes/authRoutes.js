const express = require('express');
const router = express.Router();
const {signup, signin, changePassword} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/changePassword', authMiddleware,changePassword);

module.exports = router;