const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel')

const signup = async (req, res) => {
    try {
        const { username, email, password, role, phone, gender, postcode } = req.body;

        // Convert username and email to lowercase for case-insensitive comparison
        const usernameLower = username.toLowerCase();
        const emailLower = email.toLowerCase();

        // Check if the user already exists (by username or email)
        const checkNewUser = await user.findOne({ $or: [{ username: usernameLower }, { email: emailLower }] });

        if (checkNewUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!'
            });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new instance of the User model
        const newUser = new user({
            username: usernameLower,
            email: emailLower,
            password: hashedPassword,
            role: role || 'user',
            phone: phone,
            gender: gender,
            postcode: postcode
        });

        // Save the new user to the database
        await newUser.save();

        // Return the success response with the new user's data
        return res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            data: newUser
        });

    } catch (error) {
        console.error('Error during signup:', error);  // Log the full error for debugging

        // Check for specific errors, such as duplicate keys or validation issues
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate username or email'
            });
        }

        // General error handling
        return res.status(500).json({
            success: false,
            message: 'Failed to sign up',
            error: error.message  // Send the detailed error message back
        });
    }
}


const signin = async (req, res) => {
    try {
        const {username, password} = req.body;

        const checkUsername = await user.findOne({username});
        if (!checkUsername) {
            return res.status(400).json({
                success: false,
                message: "user not found!"
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUsername.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "wrong password!"
            });
        }

        const accessToken = jwt.sign({
            userId: checkUsername._id, // Corrected to use checkUsername._id
            username: checkUsername.username, // Corrected to use checkUsername.username
            role: checkUsername.role
        }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '15m'   // Set a time for the token
        });
        
        res.status(200).json({
            success: true,
            message: 'user signed in successfully',
            accessToken
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to signin'
        });
    }
};

module.exports = {signup, signin};