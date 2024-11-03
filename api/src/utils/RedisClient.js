import {createClient} from "redis";

export class RedisClient {
    constructor(url, params = {}) {
        this.client = createClient({
            url,
            ...params,
        })
            .on('ready', () => console.log("✅ Successfully connected to Redis"))
            .on('error', (err) => console.log([
                '🚫 Redis connection error.', err,
            ].join('\n')))
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.disconnect()
    }
}

export default new RedisClient(process.env.REDIS_URL);
