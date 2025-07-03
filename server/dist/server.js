var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/usersRoutes.js';
config();
const server = express();
server.use(cors());
// Add JSON middleware
server.use(express.json());
server.use('/api/users', userRoutes);
server.get('/', (req, res) => {
    res.send('home page');
});
const PORT = process.env.PORT;
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`server is now running on http://localhost:${PORT}`);
    }
    catch (error) {
        console.error('failed to run server');
    }
}));
