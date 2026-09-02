import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;

const redis = new Redis(UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: 2,

    retryStrategy(times) {
        return Math.min(times * 50, 2000);
    }
});

redis.on('connect', () => {
    console.log(`Connecting to Upstash Redis...`);
})

redis.on('ready', () => {
    console.log(`✔️ Connected to Upstash Redis`);
})

redis.on('error', (err) => {
    console.error(`❌ Redis connection error:\n ${err.message}`);
})

redis.on('close', () => {
    console.log(`Redis connection closed`);
})

export default redis;