import { Card } from "../models/Card";
import RedisClient from "../utils/redisClient";
import jwt from "../utils/jwtUtils";

export class CardService {
  async getCardData(token: string): Promise<Card | null> {
    const test = jwt.verifyToken(token);
    console.log(test);
    const cardData = await RedisClient.get(token);
    return cardData ? JSON.parse(cardData) : null;
  }
}
