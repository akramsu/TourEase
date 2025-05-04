const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

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
            expiresIn: '60m'   // Set a time for the token
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


const changePassword = async (req, res) => {
    try {
        console.log(req.userInfo.userId);
        
        // First we get user id from the authmiddleware request userInfo that contains the decoded token info
        const userId = req.userInfo.userId;

        const { oldPassword, newPassword } = req.body;

        // Check current user is logged in
        const foundUser = await user.findById(userId);  
        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: 'User not found!'
            });
        }

        // Now we check whether the old password is the same as the new one
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as the old one. Please input a new one!'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        foundUser.password = newHashedPassword;
        await foundUser.save();

        res.status(200).json({
            success: true,
            message: 'Password has been changed successfully'
        });
    } catch (error) {
        console.error('Error changing password:', error);  // Log the full error for debugging
        res.status(500).json({
            success: false,
            message: 'Failed to change password'
        });
    }
};

module.exports = {signup, signin, changePassword};