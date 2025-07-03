import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/usersRoutes.js'
config();


const server = express();
server.use(cors());

// Add JSON middleware
server.use(express.json());

server.use('/api/users', userRoutes);

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