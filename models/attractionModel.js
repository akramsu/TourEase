const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        unique: true,
        trim: true        
    },
    description: {
        type: "String",
        required: true,
    },
    address: {
        type: 'String',
        required: true,
    },
    category: {
        type: 'String',
        enum: ['Museum', 'Park', 'Historical Site']
    },
    createdAt: {
        type: 'Date',
        default: Date.now
    }
}, 
{timestamps: true} //This adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('attraction', attractionSchema);