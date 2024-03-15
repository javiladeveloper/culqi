import { v4 as uuidv4 } from "uuid";
import { Card } from "../models/Card";
import RedisClient from "../utils/redisClient";
import jwt from "../utils/jwtUtils";

export class TokenService {
  async createToken(
    card_number: number,
    cvv: number,
    expiration_month: string,
    expiration_year: string,
    email: string
  ): Promise<string> {
    const cardData: Card = {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
    };
    const token = jwt.signToken(cardData);
    await RedisClient.setex(token, 60, JSON.stringify(cardData));
    return token;
  }

  async verifyToken(token: string): Promise<void> {
    const exists = await RedisClient.get(token);
    if (!exists) {
      throw new Error("Invalid token");
    }
  }
}
