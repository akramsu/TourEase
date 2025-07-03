import { Router } from 'express';
import { Multer } from 'multer';
import { login, register, completeRegister } from '../controllers/authController.js';
import {createUser, findUser, findAllUsers, deleteUesr, updateUser} from '../controllers/usersController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();
const upload = multer({dest: 'uploads/'});

router.post('/user/createUser', createUser);
router.post('/user/register', register);

export default router;