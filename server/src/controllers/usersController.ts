import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const birthDate = req.body.birthDate;
        const phoneNumber = req.body.phoneNumber;
        const postcode = req.body.postcode;
        const gender = req.body.gender;
        const profilePicture = req.body.profilePicture;

        res.status(201).json({
            data:
            {username, 
            password, 
            birthDate, 
            phoneNumber, 
            postcode, 
            gender, 
            profilePicture}, 

            message: "new user has been created successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "failed to create new user"
        });
    }
}

const findUser = async(req: Request, res: Response) =>{
    try {
        const userId = parseInt(req.params.id);
        
        const findUser = await prisma.user.findUnique({where : {id : userId}});
        if(!findUser) return res.status(404).json({message: "user not found!"});

        res.status(200).json({
            data:{
                findUser
            },
            message: "user had been found successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "failed to find user"
        });
    }
}


const findAllUsers = async(req: Request, res: Response) =>{
    try {    
        const findAllUsers = await prisma.user.findMany();

        res.status(200).json({
            data:{
                findAllUsers
            },
            message: "all users had been found successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "failed to find users"
        });
    }
}

const deleteUesr = async(req: Request, res: Response) =>{
    try {
        const userId = parseInt(req.params.id);
        const findUser = await prisma.user.findUnique({where : {id : userId}});
        if(!findUser) return res.status(404).json({message: "user not found!"});

        const newlyDeletedUser = await prisma.user.delete({where: {id: userId}});
        res.status(200).json({message: "user has been deleted successfully"});
        
    } catch (error) {
        res.status(400).json({
            message: "failed to delete user"
        });
    }
}

const updateUser = async(req: Request, res: Response) =>{
    try {
        const userId = parseInt(req.params.id);
        const findUser = await prisma.user.findUnique({where : {id : userId}});
        if(!findUser) return res.status(404).json({message: "user not found!"});

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
        })
    } catch (error) {
            res.status(400).json({
            message: "failed to update user"
        });
    }
}

export {createUser, findUser, findAllUsers, deleteUesr, updateUser};