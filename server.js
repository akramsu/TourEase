require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const dbConn = require('./db/dbConn');

dbConn();

const app = express();
app.use(express.json());

app.use('/tourease', userRouter);
app.use('/tourease', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {
        console.log(`server is now running successfully in ${PORT}`);
    } catch (error) {
       console.error('failed to connect to server', error);
    }
});