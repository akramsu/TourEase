import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {generateToken, verifyToken} from '../utils/jwt.util.js';
import { profile } from 'console';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, username, roleId } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, username, roleId }
    });
    res.json({ id: user.id, email: user.email, username: user.username });
  } catch (e) {
    res.status(400).json({ error: "Email or username already exists" });
  }
};

export const completeRegister = async(req: Request, res: Response) =>{
    const {phoneNumber, birthDate, postcode, gender, profilePicture} = req.body;
    const userId = parseInt(req.params.id);
    const findUser = await prisma.user.findUnique({where: {id : userId}});
    if(!findUser) return res.status(404).json({message: "user not found!"});

    try {
        const updateUser = await prisma.user.update({
            where: {id: userId},
            data: {phoneNumber, birthDate, postcode, gender, profilePicture}
        });

        res.status(201).json({message: "complete profile registration has been saved successfully", 
            data: {id: userId, phoneNumber: phoneNumber, gender: gender, postcode: postcode, birthDate: birthDate, profilePicture: profilePicture }
        })
    } catch (error) {
        res.status(400).json({ error: "failed to complete profile"})
    }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: { role: true }
  });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken({ id: user.id, email: user.email, role: user.role.roleName });
  res.status(200).json({ token , success: true});
};