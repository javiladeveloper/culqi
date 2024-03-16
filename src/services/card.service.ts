import { Card } from "../models/Card";
import RedisClient from "../utils/redisClient";
import { Logger } from "../libs/Logger";

export class CardService {
  private log: Logger;

  constructor() {
    this.log = new Logger("services");
  }
  async getCardData(token: string): Promise<Card> {
    const cardData = await RedisClient.get(token);
    this.log.info("[creditCard]", "Info Credit Card Ok");
    return cardData ? JSON.parse(cardData) : null;
  }
}
