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
const prisma = new PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const birthDate = req.body.birthDate;
        const phoneNumber = req.body.phoneNumber;
        const postcode = req.body.postcode;
        const gender = req.body.gender;
        const profilePicture = req.body.profilePicture;
        res.status(201).json({
            data: { username,
                password,
                birthDate,
                phoneNumber,
                postcode,
                gender,
                profilePicture },
            message: "new user has been created successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "failed to create new user"
        });
    }
});
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const findUser = yield prisma.user.findUnique({ where: { id: userId } });
        if (!findUser)
            return res.status(404).json({ message: "user not found!" });
        res.status(200).json({
            data: {
                findUser
            },
            message: "user had been found successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "failed to find user"
        });
    }
});
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUsers = yield prisma.user.findMany();
        res.status(200).json({
            data: {
                findAllUsers
            },
            message: "all users had been found successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "failed to find users"
        });
    }
});
const deleteUesr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const findUser = yield prisma.user.findUnique({ where: { id: userId } });
        if (!findUser)
            return res.status(404).json({ message: "user not found!" });
        const newlyDeletedUser = yield prisma.user.delete({ where: { id: userId } });
        res.status(200).json({ message: "user has been deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: "failed to delete user"
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const findUser = yield prisma.user.findUnique({ where: { id: userId } });
        if (!findUser)
            return res.status(404).json({ message: "user not found!" });
        const username = req.body.username;
        const password = req.body.password;
        const birthDate = req.body.birthDate;
        const phoneNumber = req.body.phoneNumber;
        const postcode = req.body.postcode;
        const gender = req.body.gender;
        const profilePicture = req.body.profilePicture;
        res.status(201).json({
            data: {
                username: username,
                password: password,
                birthDate: birthDate,
                phoneNumber: phoneNumber,
                postcode: postcode,
                gender: gender,
                profilePicture: profilePicture
            },
            message: "user has been updated successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "failed to update user"
        });
    }
});
export { createUser, findUser, findAllUsers, deleteUesr, updateUser };
