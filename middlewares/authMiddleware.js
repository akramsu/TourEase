const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    console.log(authHeader); //as notice here the output is Bearer (token) u can notice there is a space
                            //so we're gonna split and take the first part
    
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Access denied. no token found'
        });
    }

    //decode this token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY); 

        console.log(decodedToken);
        
        
        req.userInfo = decodedToken; //this decoded token will hold user info in token part ex username, id, etc
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Access denied. no token found'
        });
    }

    next();
};


module.exports = authMiddleware;