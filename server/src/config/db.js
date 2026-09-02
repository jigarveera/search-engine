import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =
    process.env.MONGODB_ATLAS_CONNECTION_STRING || process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_ATLAS_CONNECTION_STRING (or MONGODB_URI) is not defined');
}

const globalMongoose = globalThis;

const cached = globalMongoose.mongooseConnection ||
    (globalMongoose.mongooseConnection = {
        connection: null,
        promise: null
    });

export const connectDB = async () => {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000
        });
    }

    try {
        cached.connection = await cached.promise;
        return cached.connection;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
};
