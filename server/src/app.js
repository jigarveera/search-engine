import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import defaultRouter from './routers/default.router.js';
import healthRouter from './routers/health.router.js';
import productRouter from './routers/product.router.js';

const MONGODB_ATLAS_CONNECTION_STRING = process.env.MONGODB_ATLAS_CONNECTION_STRING;

const app = express();

app.use(cors());
app.use(express.json());

await mongoose.connect(MONGODB_ATLAS_CONNECTION_STRING).then(() => {
    console.log(`✔️ db connected`)
}).catch((err) => {
    console.log(`❌ db connection error:\n ${err.message}`)
})

app.use('/', defaultRouter);
app.use('/api/v1', healthRouter);
app.use('/api/v1', productRouter);

export default app;