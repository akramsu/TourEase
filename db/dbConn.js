const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongoDB successfully');
          
    } catch (error) {
        console.error('failed to connect to db', error);
        process.exit(1);
    }
}

module.exports = dbConnection;