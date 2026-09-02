import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';

import defaultRouter from './routers/default.router.js';
import healthRouter from './routers/health.router.js';
import productRouter from './routers/product.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.use('/', defaultRouter);
app.use('/api/v1', healthRouter);
app.use('/api/v1', productRouter);

export default app;
