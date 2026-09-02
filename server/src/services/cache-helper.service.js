import redis from "../config/redis.config"

export const deleteKeysByPattern = async (pattern) => {
    const stream = redis.scanStream({
        match: pattern,
        count: 100
    })

    const pipeline = redis.pipeline();
    let keyCount = 0;

    for await (const keys of stream) {
        for (const key of keys) {
            pipeline.unlink(key);
            pipeline.unlink(key);
            keyCount++;
        }
    }

    if (keyCount > 0) {
        await pipeline.exec();
    }

    return keyCount;
}