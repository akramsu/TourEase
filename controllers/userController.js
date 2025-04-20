const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/userModel');

const add = async (req, res) => {
    try {
        //taking input from user request body
        const input = req.body; 
        const newUser = await user.create(input);

        if(newUser){
            res.status(201).json({
                success: true,
                message: 'new user is added successfully',
                data: newUser
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to add new user'
        });
    }
}


const getAll = async (req, res) => {
    try {
        const input = req.params;
        const users = await user.find({});

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'no found users'
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'get all users successfully',
                data: users
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to get all users'
        });
    }
}


const getById = async (req, res) => {
    try {
        const input = req.params.id;
        const users = await user.findById(input);

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'user with this id is not found'
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'get user by id successfully',
                data: users
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to get user by id'
        });
    }
}


const deleteById = async (req, res) => {
    try {
        const input = req.params.id;
        const users = await user.findByIdAndDelete(input);

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'user with this id is not found'
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'user is deleted successfully',
                data: users
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to delete user'
        });
    }
}


const updateById = async (req, res) => {
    try {
        const input = req.params.id;
        const updateForm = req.body;
        const users = await user.findByIdAndUpdate(input, updateForm, {
            new: true
        });

        if (!users) {
            res.status(404).json({
                success: false,
                message: 'user with this id is not found'
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'update user by id successfully',
                data: users
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to update user by id'
        });
    }
}


module.exports = {getAll, getById, add, deleteById, updateById};