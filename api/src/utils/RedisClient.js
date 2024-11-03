import {createClient} from "redis";

export class RedisClient {
    constructor(url, params = {}) {
        this.connection = createClient()
            .on('ready', () => console.log("✅ Successfully connected to Redis"))
            .on('error', (err) => console.log([
                '🚫 Redis connection error.', err,
            ].join('\n')))
    }

    async connect() {
        await this.connection.connect();
    }

    async disconnect() {
        await this.connection.disconnect()
    }
}
