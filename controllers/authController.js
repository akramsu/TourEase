const express = require('express');
const bcrypt = require('bcryptjs');
const user = require('../models/userModel')

const signup = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        //first we check if the user already exist or not
        const checkNewUser = await user.findOne({$or : [{username}, {email}]});

        if(checkNewUser){
            res.status(400).json({
                success: false,
                message: 'user already exist!'
            })
        }

        //password hashing using the bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //now create the new user to db from signup form
        const newUser = await user.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            success: true,
            message: 'user is signed up successfully',
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to signup'
        });
    }
}


const signin = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to signin'
        });
    }
}