import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;

if (!UPSTASH_REDIS_URL) {
    throw new Error('UPSTASH_REDIS_URL is not defined');
}

const globalRedis = globalThis;

const redis = globalRedis.redisClient || new Redis(UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    connectTimeout: 5000,
    lazyConnect: true
});

globalRedis.redisClient = redis;

export default redis;
