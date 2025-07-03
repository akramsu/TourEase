import express from 'express';
import { register, login, completeRegister } from '../controllers/authController.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put('/completeRegister', completeRegister);
export default router;
