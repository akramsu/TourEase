const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://23523241:23523241password@cluster0.sjwapvt.mongodb.net/');
        console.log('connected to mongoDB successfully');
          
    } catch (error) {
        console.error('failed to connect to db', error);
    }
}

module.exports = dbConnection;