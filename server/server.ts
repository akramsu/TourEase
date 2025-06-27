import express from 'express';
import {config} from 'dotenv';
config();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const server = express();

// Add JSON middleware
server.use(express.json());

// Test endpoint to verify Prisma Client is working
server.get('/test-db', async (req, res) => {
    try {
        // Test database connection
        await prisma.$connect();
        
        // Count users to test a simple query
        const userCount = await prisma.user.count();
        
        res.json({
            success: true,
            message: 'Prisma Client is working correctly!',
            userCount: userCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

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