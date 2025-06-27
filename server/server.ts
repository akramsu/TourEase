import express from 'express';
import {config} from 'dotenv';
config();

const server = express();

server.get('/', (req, res)=>{
    res.send('home page');
});

const PORT = process.env.PORT;

server.listen(PORT, async()=>{
    try {
        console.log(`server is now running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('failed to run server');
    }
});