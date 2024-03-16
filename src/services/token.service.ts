import { Card } from "../models/Card";
import RedisClient from "../utils/redisClient";
import jwt from "../utils/jwtUtils";
import { Logger } from "../libs/Logger";
import config from "../config/vars";

export class TokenService {
  private log: Logger;

  constructor() {
    this.log = new Logger("services");
  }
  async createToken(
    cardNumber: number,
    cvv: number,
    expirationMonth: string,
    expirationYear: string,
    email: string
  ): Promise<string> {
    const cardData: Card = {
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      email,
    };
    const token = jwt.signToken(cardData);
    await RedisClient.setex(
      token,
      parseInt(config.secExpiration || ""),
      JSON.stringify(cardData)
    );
    this.log.info("[creditCard]", "Save Token on redis");
    return token;
  }
}
