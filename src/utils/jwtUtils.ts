import { Card } from "../models/Card";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../libs/errors";
import config from "../config/vars";
const secretKey = config.jwtSecret || "";
export const signToken = (card: Card): string => {
  return jwt.sign(card, secretKey, { expiresIn: "1m" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey) as Card;
  } catch (error) {
    throw new UnauthorizedError("401", "Expiration Token");
  }
};

export default { signToken, verifyToken };
