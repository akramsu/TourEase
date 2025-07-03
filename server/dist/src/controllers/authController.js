var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.util.js';
const prisma = new PrismaClient();
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, roleId } = req.body;
    const hashed = yield bcrypt.hash(password, 10);
    try {
        const user = yield prisma.user.create({
            data: { email, password: hashed, username, roleId }
        });
        res.json({ id: user.id, email: user.email, username: user.username });
    }
    catch (e) {
        res.status(400).json({ error: "Email or username already exists" });
    }
});
export const completeRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, birthDate, postcode, gender, profilePicture } = req.body;
    const userId = parseInt(req.params.id);
    const findUser = yield prisma.user.findUnique({ where: { id: userId } });
    if (!findUser)
        return res.status(404).json({ message: "user not found!" });
    try {
        const updateUser = yield prisma.user.update({
            where: { id: userId },
            data: { phoneNumber, birthDate, postcode, gender, profilePicture }
        });
        res.status(201).json({ message: "complete profile registration has been saved successfully",
            data: { id: userId, phoneNumber: phoneNumber, gender: gender, postcode: postcode, birthDate: birthDate, profilePicture: profilePicture }
        });
    }
    catch (error) {
        res.status(400).json({ error: "failed to complete profile" });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { email },
        include: { role: true }
    });
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const valid = yield bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = generateToken({ id: user.id, email: user.email, role: user.role.roleName });
    res.status(200).json({ token, success: true });
});
