import { PrismaClient } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';
import express from 'express';
const prisma = new PrismaClient();

const server = express();

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

server.listen(process.env.PORT, async()=>{
    try {
        console.log(`server is now running on http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.error('failed to run server');
    }
});