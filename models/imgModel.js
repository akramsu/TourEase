const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    publicId : {type: String, required: true},
    url: {type: String, required: true},
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', //refers to which user is currently uploading the img
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model('img', imgSchema);