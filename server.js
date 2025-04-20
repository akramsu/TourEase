require('dotenv').config();
const express = require('express');
const router = require('./routes/routes');
const dbConn = require('./db/dbConn');

dbConn();

const app = express();
app.use(express.json());

app.use('/tourease', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {
        console.log(`server is now running successfully in ${PORT}`);
    } catch (error) {
       console.error('failed to connect to server', error);
    }
});