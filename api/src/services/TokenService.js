import jwt from "jsonwebtoken";
import RedisGlobalClient from "./RedisClient.js";
import { SECONDS_IN_MONTH } from "../constants/numbers.js";

class TokenService {
  constructor(redisClientInstance) {
    this.redis = redisClientInstance;
  }

  async generateTokens(payload) {
    return Promise.all([
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" }),
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }),
    ]);
  }

  async saveRefreshToken(token, userId) {
    await this.redis.client.set(token, userId, { EX: SECONDS_IN_MONTH });
  }

  async revokeRefreshToken(refreshToken) {
    await this.redis.client.del(refreshToken);
  }

  async verifyAccessToken(token) {
    if (!token) {
      throw new Error("No JWT token provided");
    }

    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Session expired");
      } else {
        throw new Error("Invalid JWT token");
      }
    }
  }
}

export default new TokenService(RedisGlobalClient);
