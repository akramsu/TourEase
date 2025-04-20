const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
        unique: true,
        trim: true        
    },
    password: {
        type: "String",
        required: true,
        minlength: [6, 'password has to be at least 6 characters']
    },
    email: {
        type: 'String',
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address']  // Email validation regex
    },
    phone: {
        type: 'Number',
        // required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number']  // Basic phone number validation (international)
    },
    role: {
        type: 'String',
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    createdAt: {
        type: 'Date',
        default: Date.now
    },
    profileImage: {
        type: 'String',
        default: '../assets/img/default-profile.jpg',  // Default profile image if not provided
    },
    gender:{
        type: 'String',
        enum: ['male', 'female']
    },
    postcode: {
        type: 'Number',
        maxLength: [6, 'maximum length is 6 digits']
    },
    birthdate:{
        type: 'Date', 
        default: Date.now
    }
}, 
{timestamps: true} //This adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('user', userSchema);